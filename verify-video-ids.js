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

async function verifyFix() {
  const posts = await client.fetch('*[_type == "blogPost" && postType == "video"]{ title, youtubeVideoId } | order(title asc)');

  const withIds = posts.filter(p => p.youtubeVideoId);
  const withoutIds = posts.filter(p => !p.youtubeVideoId);

  console.log('✅ Videos with IDs: ' + withIds.length);
  console.log('❌ Videos without IDs: ' + withoutIds.length);

  if (withoutIds.length > 0) {
    console.log('\nVideos still missing IDs:');
    withoutIds.forEach(p => console.log('  - ' + p.title));
  } else {
    console.log('\n🎉 All video posts now have YouTube video IDs!');
  }
}

verifyFix().catch(console.error);
