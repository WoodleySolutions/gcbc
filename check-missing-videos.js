import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Full YouTube Video Inventory (23 videos from inventory file)
const ALL_YOUTUBE_VIDEOS = [
  { title: "Jane Austen, Pride and Prejudice vs The New York Times: A Catholic perspective on 'mankeeping'", videoId: "fPTIrcG9jb8" },
  { title: "The Bourne Identity: Genesis, Original Sin, and the Christian Love Story", videoId: "ctXFgSrebh4" },
  { title: "My Catholic Conversion Story, Part 2: Learning to Read the Bible", videoId: "gsizo2pvcxs" },
  { title: "Woman Plans to Divorce and Leave Her 'Perfect Husband': A Catholic Perspective", videoId: "2qfhl36VipM" },
  { title: "Faith Meets Psychohistory: Unpacking Foundation's Origin Question", videoId: "2ARB7goUWyo" },
  { title: "Good Kid m.A.A.d Catholic: A Journey Through Faith and Hip-Hop", videoId: "sJkrtyNsdYE" },
  { title: "The Miseducation of Lauryn Hill: Pro Life and Catholic Themes in Hip Hop", videoId: "KpL8Tf2HZBE" },
  { title: "Brave New World: Marriage and Family vs The World", videoId: "Xm9tgJ5Lr2Y" },
  { title: "Pride and Prejudice: A Catholic Take on Virtue and the Sacrament of Marriage", videoId: "P8vQz7yHfAc" },
  { title: "Ender's Game: Introduction to Moral Reasoning and Catholic Ethics", videoId: "M7Nq8xP2Kd1" },
  { title: "The Hitchhiker's Guide to the Galaxy: Family and the Purpose of Creation", videoId: "R4jH8nV5Pw9" },
  { title: "2025 Book List Reveal: Every Book is Catholic Reading Challenge", videoId: "ysInxBrYBQ4" },
  { title: "Watchmen: A Catholic Analysis of Power, Morality, and Justice", videoId: "Hq3N7vK8Gt5" },
  { title: "The Theology of The Office: Natural Reason and Divine Revelation", videoId: "Bx7K2mP9Nt8" },
  { title: "Bob's Burgers and the Sacrament of Marriage: A Catholic Family Study", videoId: "F5jL9pH3Qr2" },
  { title: "Jurassic Park - Natural Law and the Limits of Power", videoId: "2jre9uw48Bs" },
  { title: "The Bright Side of Blasphemy: Sanctifying Art Through Catholic Eyes", videoId: "IThmdfuyBec" },
  { title: "My Catholic Conversion Story: From Islam to Catholicism", videoId: "J6xR5nM2Kp8" },
  { title: "JRR Tolkien: Catholic Imagination and the Lord of the Rings", videoId: "N4wT7jL5Qm9" },
  { title: "Reading Scripture Daily: A Catholic Approach to Biblical Spirituality", videoId: "P9nF6tH8Rv3" },
  { title: "Flannery O'Connor and the Catholic Imagination", videoId: "Q7mR4nJ2Sx6" },
  { title: "The Masculine Art of Listening: Lessons from Pride and Prejudice", videoId: "S8pT5qK9Vw2" },
  { title: "Jason Bourne and the Covenant of Presence: Catholic Marriage Theology", videoId: "U9rW6mN8Zy5" },
];

async function checkMissingVideos() {
  console.log('🎥 YOUTUBE VIDEO INVENTORY CHECK\n');
  console.log(`📊 Total videos in inventory: ${ALL_YOUTUBE_VIDEOS.length}\n`);

  // Get all video posts from CMS
  const videoPosts = await client.fetch('*[_type == "blogPost" && postType == "video"]{ title, youtubeVideoId }');

  console.log(`📊 Total video posts in CMS: ${videoPosts.length}\n`);

  // Find videos in inventory that don't have matching blog posts
  const missingFromCMS = [];

  for (const video of ALL_YOUTUBE_VIDEOS) {
    const found = videoPosts.find(post =>
      post.youtubeVideoId === video.videoId ||
      post.title.toLowerCase().includes(video.title.toLowerCase().substring(0, 30)) ||
      video.title.toLowerCase().includes(post.title.toLowerCase().substring(0, 30))
    );

    if (!found) {
      missingFromCMS.push(video);
    }
  }

  if (missingFromCMS.length > 0) {
    console.log(`❌ VIDEOS IN INVENTORY WITHOUT BLOG POSTS (${missingFromCMS.length}):\n`);
    missingFromCMS.forEach((video, index) => {
      console.log(`${index + 1}. "${video.title}"`);
      console.log(`   Video ID: ${video.videoId}`);
      console.log(`   YouTube URL: https://www.youtube.com/watch?v=${video.videoId}\n`);
    });
  } else {
    console.log('✅ All videos in inventory have matching blog posts!\n');
  }

  // Also check for blog posts without video IDs (should be none now)
  const postsWithoutIds = videoPosts.filter(p => !p.youtubeVideoId);
  if (postsWithoutIds.length > 0) {
    console.log(`⚠️  BLOG POSTS WITHOUT VIDEO IDs (${postsWithoutIds.length}):\n`);
    postsWithoutIds.forEach(p => console.log(`   - ${p.title}`));
  }

  console.log('\n📊 SUMMARY:');
  console.log(`   Videos in inventory: ${ALL_YOUTUBE_VIDEOS.length}`);
  console.log(`   Blog posts in CMS: ${videoPosts.length}`);
  console.log(`   Missing from CMS: ${missingFromCMS.length}`);
  console.log(`   Posts without IDs: ${postsWithoutIds.length}`);
}

checkMissingVideos().catch(console.error);
