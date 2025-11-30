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

async function setCurrentBook() {
  console.log('Setting The Power and the Glory as current book...\n');

  try {
    // First, unset any currently marked books
    const currentBooks = await client.fetch(
      `*[_type == "monthlyBook" && isCurrentBook == true]`
    );

    for (const book of currentBooks) {
      await client
        .patch(book._id)
        .set({ isCurrentBook: false })
        .commit();
      console.log(`✅ Unmarked as current: ${book.title}`);
    }

    // Now set The Power and the Glory as current
    const books = await client.fetch(
      `*[_type == "monthlyBook" && slug.current == "the-power-and-the-glory"]`
    );

    if (books.length === 0) {
      console.log('❌ The Power and the Glory not found!');
      return;
    }

    const powerAndGlory = books[0];

    await client
      .patch(powerAndGlory._id)
      .set({ isCurrentBook: true })
      .commit();

    console.log(`\n✅ Set as current book: ${powerAndGlory.title}`);
    console.log(`   Meeting Date: January 26th, 2026`);
    console.log(`   Theme: ${powerAndGlory.theme}`);
    console.log('\nThe homepage will now display this as the current book!');
  } catch (error) {
    console.error('❌ Error setting current book:', error.message);
  }
}

setCurrentBook().catch(console.error);
