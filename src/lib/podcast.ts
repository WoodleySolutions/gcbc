import Parser from 'rss-parser';

export interface PodcastEpisode {
  guid: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: string; // formatted, e.g. "1h 23m"
  pubDate: Date;
  episodeArt: string;
  episodeNumber?: number;
  season?: number;
  slug: string;
  keywords: string[]; // itunes:keywords — used to link episodes to book slugs
}

const FEED_URL = 'https://feed.podbean.com/greatcatholicbookclub/feed.xml';

function formatDuration(raw: string | undefined): string {
  if (!raw) return '';
  // Podbean provides duration as HH:MM:SS or MM:SS or plain seconds
  const parts = raw.split(':').map(Number);
  if (parts.length === 3) {
    const [h, m] = parts;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }
  if (parts.length === 2) {
    const [m] = parts;
    return `${m}m`;
  }
  // Plain seconds
  const totalSeconds = parseInt(raw, 10);
  if (!isNaN(totalSeconds)) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }
  return raw;
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Parse [books: slug-one, slug-two] tags from episode show notes.
// Returns the slugs found and the description with the tag stripped out.
function parseBookTags(raw: string): { slugs: string[]; cleaned: string } {
  const match = raw.match(/\[books:\s*([^\]]+)\]/i);
  if (!match) return { slugs: [], cleaned: raw };
  const slugs = match[1].split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const cleaned = raw.replace(match[0], '').replace(/\s{2,}/g, ' ').trim();
  return { slugs, cleaned };
}

export async function fetchEpisodes(): Promise<PodcastEpisode[]> {
  const parser = new Parser({
    customFields: {
      item: [
        ['itunes:duration', 'duration'],
        ['itunes:image', 'itunesImage'],
        ['itunes:episode', 'episodeNumber'],
        ['itunes:season', 'season'],
        ['itunes:keywords', 'itunesKeywords'],
      ],
    },
  });

  const feed = await parser.parseURL(FEED_URL);

  return (feed.items ?? []).map((item: any) => {
    const audioUrl =
      item.enclosure?.url ??
      item['media:content']?.$.url ??
      '';

    const episodeArt =
      item.itunesImage?.$.href ??
      item.itunesImage ??
      feed.image?.url ??
      '';

    // Parse [books: ...] tag from the raw description, strip it from display text
    const rawDescription = item.content ?? item.contentSnippet ?? item.summary ?? '';
    const { slugs: taggedSlugs, cleaned: cleanedDescription } = parseBookTags(rawDescription);

    // Merge with itunes:keywords if present (future-proofing)
    const itunesKeywords: string[] = item.itunesKeywords
      ? item.itunesKeywords.split(',').map((k: string) => k.trim().toLowerCase()).filter(Boolean)
      : [];
    const keywords = [...new Set([...taggedSlugs, ...itunesKeywords])];

    return {
      guid: item.guid ?? item.link ?? item.title ?? '',
      title: item.title ?? 'Untitled Episode',
      description: cleanedDescription,
      audioUrl,
      duration: formatDuration(item.duration),
      pubDate: new Date(item.pubDate ?? item.isoDate ?? Date.now()),
      episodeArt,
      episodeNumber: item.episodeNumber ? parseInt(item.episodeNumber, 10) : undefined,
      season: item.season ? parseInt(item.season, 10) : undefined,
      slug: toSlug(item.title ?? 'episode'),
      keywords,
    };
  });
}
