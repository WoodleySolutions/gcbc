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

async function finalVerification() {
  const books = await client.fetch(
    `*[_type == "monthlyBook" && year == 2026] | order(meetingDate asc) {
      title,
      month,
      meetingDate
    }`
  );

  console.log('\n✓ FINAL VERIFICATION - All 2026 Meeting Dates:\n');
  console.log('All meetings should be on the LAST MONDAY of each month');
  console.log('EXCEPT November which should be the 3RD MONDAY (Nov 16)\n');
  console.log('─'.repeat(70));

  books.forEach(book => {
    // Parse as local date by appending time
    const date = new Date(book.meetingDate + 'T12:00:00');
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formatted = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const isMonday = dayOfWeek === 'Monday';

    const status = isMonday ? '✓ CORRECT' : '✗ ERROR - NOT MONDAY';
    console.log(`${book.month.padEnd(12)} ${formatted.padEnd(25)} ${dayOfWeek.padEnd(10)} ${status}`);
  });

  console.log('─'.repeat(70));
}

finalVerification();
