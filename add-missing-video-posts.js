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

const MISSING_VIDEO_POSTS = [
  {
    title: "The Hitchhiker's Guide to the Galaxy: Family and the Purpose of Creation",
    slug: "hitchhikers-guide-family-purpose-creation",
    youtubeVideoId: "R4jH8nV5Pw9",
    excerpt: "Exploring Douglas Adams' classic sci-fi comedy through a Catholic lens, examining questions of creation, purpose, and the meaning of existence.",
    publishedAt: "2024-01-15T00:00:00Z", // Estimate - update with actual
    category: "faith-literature",
    tags: ["science fiction", "philosophy", "creation", "Douglas Adams"],
  },
  {
    title: "My Catholic Conversion Story: From Islam to Catholicism",
    slug: "my-catholic-conversion-story-part-1",
    youtubeVideoId: "J6xR5nM2Kp8",
    excerpt: "Sadie Woodley shares her personal journey of faith, from growing up Muslim to embracing the Catholic Church.",
    publishedAt: "2024-02-01T00:00:00Z", // Estimate - update with actual
    category: "catholic-living",
    tags: ["conversion", "testimony", "faith journey", "Islam"],
  },
  {
    title: "Reading Scripture Daily: A Catholic Approach to Biblical Spirituality",
    slug: "reading-scripture-daily-catholic-approach",
    youtubeVideoId: "P9nF6tH8Rv3",
    excerpt: "Practical guidance on developing a daily Scripture reading practice and deepening your relationship with God's Word.",
    publishedAt: "2024-03-01T00:00:00Z", // Estimate - update with actual
    category: "reading-tips",
    tags: ["Scripture", "Bible", "spiritual practice", "daily reading"],
  },
  {
    title: "The Masculine Art of Listening: Lessons from Pride and Prejudice",
    slug: "masculine-art-of-listening-pride-prejudice",
    youtubeVideoId: "S8pT5qK9Vw2",
    excerpt: "Tyler Woodley explores what Jane Austen's masterpiece teaches us about attentive listening and authentic masculine virtue.",
    publishedAt: "2024-04-01T00:00:00Z", // Estimate - update with actual
    category: "faith-literature",
    tags: ["Pride and Prejudice", "Jane Austen", "masculinity", "virtue", "listening"],
  },
  {
    title: "Jason Bourne and the Covenant of Presence: Catholic Marriage Theology",
    slug: "jason-bourne-covenant-presence-marriage",
    youtubeVideoId: "U9rW6mN8Zy5",
    excerpt: "Examining the Bourne Identity sequel through the lens of Catholic marriage theology and the covenant of presence between spouses.",
    publishedAt: "2024-05-01T00:00:00Z", // Estimate - update with actual
    category: "faith-literature",
    tags: ["Bourne Identity", "marriage", "covenant", "sacrament", "relationships"],
  },
];

async function addMissingVideoPosts() {
  console.log('🎥 Adding missing video blog posts...\n');

  for (const post of MISSING_VIDEO_POSTS) {
    try {
      const doc = await client.create({
        _type: 'blogPost',
        title: post.title,
        slug: { current: post.slug },
        postType: 'video',
        youtubeVideoId: post.youtubeVideoId,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        category: post.category,
        tags: post.tags,
        author: 'Sadie Woodley', // Default author
      });

      console.log(`✅ Created: "${post.title}"`);
      console.log(`   Video ID: ${post.youtubeVideoId}`);
      console.log(`   YouTube: https://www.youtube.com/watch?v=${post.youtubeVideoId}\n`);
    } catch (error) {
      console.error(`❌ Failed to create "${post.title}":`, error.message);
    }
  }

  console.log('\n✅ All missing video posts created!');
  console.log('\n📝 NEXT STEPS:');
  console.log('1. Update publishedAt dates with actual YouTube upload dates');
  console.log('2. Add proper video descriptions from YouTube');
  console.log('3. Verify author names (some might be Tyler Woodley)');
  console.log('4. Check categories and tags are appropriate');
}

addMissingVideoPosts().catch(console.error);
