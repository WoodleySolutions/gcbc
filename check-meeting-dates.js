import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

async function checkDates() {
  const books = await client.fetch(
    `*[_type == "monthlyBook" && year == 2026] | order(meetingDate asc) {
      title,
      meetingDate,
      month
    }`
  );

  console.log('\n2026 Meeting Dates:\n');
  books.forEach(book => {
    const date = new Date(book.meetingDate);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    console.log(`${book.month}: ${book.title}`);
    console.log(`  Current: ${dateStr} (${dayOfWeek})`);
    console.log('');
  });
}

checkDates();
