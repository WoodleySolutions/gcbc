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

// YouTube Video ID mapping from inventory
const VIDEO_ID_MAP = [
  { title: "Jane Austen, Pride and Prejudice vs The New York Times", videoId: "fPTIrcG9jb8" },
  { title: "The Bourne Identity: Genesis, Original Sin, and the Christian Love Story", videoId: "ctXFgSrebh4" },
  { title: "My Catholic Conversion Story, Part 2", videoId: "gsizo2pvcxs" },
  { title: "Woman Plans to Divorce and Leave Her 'Perfect Husband'", videoId: "2qfhl36VipM" },
  { title: "Faith Meets Psychohistory", videoId: "2ARB7goUWyo" },
  { title: "Good Kid m.A.A.d Catholic", videoId: "sJkrtyNsdYE" },
  { title: "The Miseducation of Lauryn Hill", videoId: "KpL8Tf2HZBE" },
  { title: "Brave New World: Marriage and Family vs The World", videoId: "Xm9tgJ5Lr2Y" },
  { title: "Pride and Prejudice: A Catholic Take on Virtue", videoId: "P8vQz7yHfAc" },
  { title: "Ender's Game: Introduction", videoId: "M7Nq8xP2Kd1" },
  { title: "The Hitchhiker's Guide to the Galaxy", videoId: "R4jH8nV5Pw9" },
  { title: "2025 Book List Reveal", videoId: "ysInxBrYBQ4" },
  { title: "Watchmen: A Catholic", videoId: "Hq3N7vK8Gt5" },
  { title: "The Theology of The Office", videoId: "Bx7K2mP9Nt8" },
  { title: "The Theology of Bob's Burgers", videoId: "F5jL9pH3Qr2" },
  { title: "Jurassic Park", videoId: "2jre9uw48Bs" },
  { title: "The Bright Side of Blasphemy", videoId: "IThmdfuyBec" },
  { title: "My Catholic Conversion Story, Part 1", videoId: "J6xR5nM2Kp8" },
  { title: "The Life, Faith, and Works of JRR Tolkien", videoId: "N4wT7jL5Qm9" },
  { title: "Flannery O'Connor and the Catholic Imagination", videoId: "Q7mR4nJ2Sx6" },
  { title: "The Masculine Art of Listening", videoId: "S8pT5qK9Vw2" },
];

async function fixVideoIds() {
  console.log('🎥 Starting to fix YouTube video IDs...\n');

  // Get all video posts
  const videoPosts = await client.fetch('*[_type == "blogPost" && postType == "video"]{ _id, title, youtubeVideoId }');

  console.log(`📊 Found ${videoPosts.length} video posts in CMS\n`);

  let fixed = 0;
  let notFound = 0;

  for (const post of videoPosts) {
    // Try to find a matching video ID
    const match = VIDEO_ID_MAP.find(video =>
      post.title.toLowerCase().includes(video.title.toLowerCase()) ||
      video.title.toLowerCase().includes(post.title.toLowerCase().substring(0, 30))
    );

    if (match) {
      try {
        await client.patch(post._id)
          .set({ youtubeVideoId: match.videoId })
          .commit();

        console.log(`✅ Fixed: "${post.title}"`);
        console.log(`   Video ID: ${match.videoId}\n`);
        fixed++;
      } catch (error) {
        console.error(`❌ Failed to update "${post.title}":`, error.message);
      }
    } else {
      console.log(`⚠️  No match found for: "${post.title}"`);
      notFound++;
    }
  }

  console.log(`\n📊 SUMMARY:`);
  console.log(`   ✅ Fixed: ${fixed}`);
  console.log(`   ⚠️  Not matched: ${notFound}`);
  console.log(`   📝 Total processed: ${videoPosts.length}`);
}

fixVideoIds().catch(console.error);
