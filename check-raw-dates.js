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

async function checkRawDates() {
  const books = await client.fetch(
    `*[_type == "monthlyBook" && year == 2026] | order(meetingDate asc) {
      _id,
      title,
      month,
      meetingDate
    }`
  );

  console.log('\nRaw date values from CMS:\n');
  books.forEach(book => {
    console.log(`${book.month}: ${book.title}`);
    console.log(`  Stored value: "${book.meetingDate}"`);
    console.log(`  Type: ${typeof book.meetingDate}`);
    console.log('');
  });
}

checkRawDates();
