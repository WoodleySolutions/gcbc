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

// Helper to generate SEO title (max 60 chars for Google)
function generateSeoTitle(title) {
  const baseSuffix = ' | Great Catholic Book Club';

  if (title.length + baseSuffix.length <= 60) {
    return title + baseSuffix;
  }

  // If too long, use just the title
  if (title.length <= 60) {
    return title;
  }

  // If even title is too long, truncate
  return title.substring(0, 57) + '...';
}

// Helper to generate SEO description (max 160 chars)
function generateSeoDescription(post) {
  const { excerpt, title, postType, tags } = post;

  // Start with excerpt if available
  if (excerpt && excerpt.length <= 160) {
    return excerpt;
  }

  if (excerpt && excerpt.length > 160) {
    return excerpt.substring(0, 157) + '...';
  }

  // Fallback: create description from title and type
  const prefix = postType === 'video' ? 'Watch our video discussion on' : 'Read our Catholic perspective on';
  const description = `${prefix} ${title}. Catholic book club exploring faith and literature.`;

  if (description.length <= 160) {
    return description;
  }

  return description.substring(0, 157) + '...';
}

async function populateSeoFields() {
  console.log('🔍 Fetching all blog posts...\n');

  const posts = await client.fetch(`
    *[_type == "blogPost"] | order(title asc) {
      _id,
      title,
      excerpt,
      postType,
      seo,
      tags,
      categories
    }
  `);

  console.log(`📊 Found ${posts.length} blog posts\n`);

  const postsNeedingSeo = posts.filter(p => !p.seo || !p.seo.metaDescription);

  console.log(`📝 ${postsNeedingSeo.length} posts need SEO metadata\n`);
  console.log('='  .repeat(80) + '\n');

  let updated = 0;
  let skipped = 0;

  for (const post of posts) {
    // Skip if already has SEO
    if (post.seo && post.seo.metaDescription) {
      console.log(`⏭️  Skipping "${post.title}" - already has SEO`);
      skipped++;
      continue;
    }

    const seoTitle = generateSeoTitle(post.title);
    const seoDescription = generateSeoDescription(post);

    try {
      await client.patch(post._id)
        .set({
          seo: {
            metaTitle: seoTitle,
            metaDescription: seoDescription,
          }
        })
        .commit();

      console.log(`✅ Updated "${post.title}"`);
      console.log(`   Meta Title: ${seoTitle}`);
      console.log(`   Meta Desc: ${seoDescription}`);
      console.log('');
      updated++;

    } catch (error) {
      console.error(`❌ Failed to update "${post.title}":`, error.message);
    }
  }

  console.log('\n' + '='  .repeat(80));
  console.log('\n📊 SUMMARY:');
  console.log(`   ✅ Updated: ${updated}`);
  console.log(`   ⏭️  Skipped (already has SEO): ${skipped}`);
  console.log(`   📝 Total posts: ${posts.length}`);
  console.log('\n✅ SEO population complete!');
}

populateSeoFields().catch(console.error);
