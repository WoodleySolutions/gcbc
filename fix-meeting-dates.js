import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
});

// Correct meeting dates - last Monday of each month (except November is 3rd Monday)
const correctDates = {
  'january': '2026-01-26',      // Last Monday of January
  'february': '2026-02-23',     // Last Monday of February (was 22nd Sunday)
  'march': '2026-03-30',        // Last Monday of March (was 29th Sunday)
  'april': '2026-04-27',        // Last Monday of April (was 26th Sunday)
  'may': '2026-05-25',          // Last Monday of May (was 24th Sunday)
  'june': '2026-06-29',         // Last Monday of June (was 28th Sunday)
  'july': '2026-07-27',         // Last Monday of July (was 26th Sunday)
  'august': '2026-08-31',       // Last Monday of August (was 30th Sunday)
  'september': '2026-09-28',    // Last Monday of September (was 27th Sunday)
  'october': '2026-10-26',      // Last Monday of October (was 25th Sunday)
  'november': '2026-11-16',     // 3rd Monday of November to avoid Thanksgiving (was 22nd Sunday)
};

async function fixDates() {
  console.log('Fetching books...\n');

  const books = await client.fetch(
    `*[_type == "monthlyBook" && year == 2026] {
      _id,
      title,
      month,
      meetingDate
    }`
  );

  console.log(`Found ${books.length} books to update\n`);

  for (const book of books) {
    const monthKey = book.month.toLowerCase();
    const correctDate = correctDates[monthKey];

    if (!correctDate) {
      console.log(`⚠️  No date mapping found for ${book.month}`);
      continue;
    }

    const oldDate = new Date(book.meetingDate);
    const newDate = new Date(correctDate);

    console.log(`Updating: ${book.title}`);
    console.log(`  Old: ${oldDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`);
    console.log(`  New: ${newDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`);

    await client
      .patch(book._id)
      .set({ meetingDate: correctDate })
      .commit();

    console.log(`  ✓ Updated\n`);
  }

  console.log('All dates updated successfully!');
}

fixDates();
