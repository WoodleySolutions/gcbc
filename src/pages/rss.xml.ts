import rss from '@astrojs/rss';
import { client, queries } from '../lib/sanity';
import type { BlogPost } from '../lib/sanity';

export async function GET(context: any) {
  try {
    // Fetch all published blog posts from Sanity
    const posts: BlogPost[] = await client.fetch(queries.allPosts);

    return rss({
      // RSS feed metadata
      title: 'Great Catholic Book Club Blog',
      description: 'Every Book is Catholic - Exploring great literature through the lens of Catholic faith. Monthly book discussions, reading guides, and reflections on faith and culture.',
      site: context.site,

      // Feed items from blog posts
      items: posts.map((post) => ({
        title: post.title,
        pubDate: new Date(post.publishedAt),
        description: post.excerpt,
        link: `/blog/${post.slug.current}/`,

        // Optional: Add categories/tags
        categories: post.categories || [],

        // Optional: Add author
        author: post.author || 'Tyler & Sadie Woodley',

        // Optional: Custom data for each item
        customData: post.postType === 'video'
          ? `<media:content type="video/youtube" url="${post.youtubeVideo?.url || ''}" />`
          : undefined,
      })),

      // Custom RSS feed configuration
      customData: `
        <language>en-us</language>
        <copyright>Copyright ${new Date().getFullYear()} Great Catholic Book Club. All rights reserved.</copyright>
        <managingEditor>woodleys@greatcatholicbookclub.com (Tyler and Sadie Woodley)</managingEditor>
        <webMaster>woodleys@greatcatholicbookclub.com (Tyler and Sadie Woodley)</webMaster>
        <category>Religion & Spirituality</category>
        <category>Books & Literature</category>
        <category>Catholicism</category>
        <ttl>60</ttl>
        <image>
          <url>https://greatcatholicbookclub.com/GCBC_Logo_ForDarkBG.png</url>
          <title>Great Catholic Book Club</title>
          <link>https://greatcatholicbookclub.com</link>
        </image>
      `,

      // Stylesheet for viewing RSS in browser (optional but nice)
      stylesheet: '/rss-styles.xsl',
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);

    // Return a basic error response
    return new Response('Error generating RSS feed', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
