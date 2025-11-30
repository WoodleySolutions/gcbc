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

async function restorePost() {
  console.log('Restoring "The Masculine Art of Listening" blog post...\n');

  try {
    const doc = await client.create({
      _type: 'blogPost',
      title: 'The Masculine Art of Listening: Lessons from Pride and Prejudice',
      slug: { current: 'masculine-art-of-listening-pride-prejudice' },
      postType: 'article',
      excerpt: 'Tyler Woodley explores what Jane Austen\'s masterpiece teaches us about attentive listening and authentic masculine virtue.',
      publishedAt: '2024-04-01T00:00:00Z', // You can update this
      category: 'faith-literature',
      tags: ['Pride and Prejudice', 'Jane Austen', 'masculinity', 'virtue', 'listening'],
    });

    console.log('✅ Post restored successfully!');
    console.log('   ID:', doc._id);
    console.log('\nPlease update the following in Sanity:');
    console.log('- Add the full article content/body');
    console.log('- Set correct publishedAt date');
    console.log('- Add featured image if available');
    console.log('- Verify author, category, and tags');

  } catch (error) {
    console.error('❌ Failed to restore post:', error.message);
  }
}

restorePost().catch(console.error);
