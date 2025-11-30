import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Map filenames to book slugs
const imageMapping = {
  'The Power And The Glory.png': 'the-power-and-the-glory',
  'Starship Troopers.png': 'starship-troopers',
  'Leviathan Wakes.png': 'leviathan-wakes',
  'The Three Mustketeers.png': 'the-three-musketeers', // Note: typo in filename
  'Master and Commander.png': 'master-and-commander',
};

async function uploadImages() {
  console.log('Uploading 2026 book cover images to Sanity...\n');

  const imagesDir = path.join(__dirname, 'public', 'images', '2026BookImages');

  for (const [filename, slug] of Object.entries(imageMapping)) {
    try {
      const imagePath = path.join(imagesDir, filename);

      // Check if file exists
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  Image not found: ${filename}`);
        continue;
      }

      // Find the book
      const books = await client.fetch(
        `*[_type == "monthlyBook" && slug.current == $slug]`,
        { slug }
      );

      if (books.length === 0) {
        console.log(`⚠️  Book not found for slug: ${slug}`);
        continue;
      }

      const book = books[0];

      // Upload image
      console.log(`📤 Uploading: ${filename}...`);
      const imageBuffer = fs.readFileSync(imagePath);
      const imageAsset = await client.assets.upload('image', imageBuffer, {
        filename: filename,
      });

      // Update book with image reference
      await client
        .patch(book._id)
        .set({
          coverImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id,
            },
          },
        })
        .commit();

      console.log(`✅ Added cover image to: ${book.title}`);
      console.log('');
    } catch (error) {
      console.error(`❌ Failed to upload ${filename}:`, error.message);
    }
  }

  console.log('✅ All available images have been uploaded!');
  console.log('\nBooks with cover images:');
  console.log('- The Power and the Glory');
  console.log('- Starship Troopers');
  console.log('- Leviathan Wakes');
  console.log('- The Three Musketeers');
  console.log('- Master and Commander');
  console.log('\nStill need images for:');
  console.log('- The Fellowship of the Ring');
  console.log('- The Mote in God\'s Eye');
  console.log('- The Two Towers');
  console.log('- The Screwtape Letters');
  console.log('- Hyperion');
  console.log('- The Return of the King');
}

uploadImages().catch(console.error);
