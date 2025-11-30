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

const books2026 = [
  {
    title: 'The Power and the Glory',
    author: 'Graham Greene',
    slug: 'the-power-and-the-glory',
    month: 'january',
    year: 2026,
    meetingDate: '2026-01-26',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'Starship Troopers',
    author: 'Robert A. Heinlein',
    slug: 'starship-troopers',
    month: 'february',
    year: 2026,
    meetingDate: '2026-02-23',
    theme: 'Authority and Duty',
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    slug: 'the-fellowship-of-the-ring',
    month: 'march',
    year: 2026,
    meetingDate: '2026-03-30',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'Leviathan Wakes',
    author: 'James S.A. Corey',
    slug: 'leviathan-wakes',
    month: 'april',
    year: 2026,
    meetingDate: '2026-04-27',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'The Three Musketeers',
    author: 'Alexandre Dumas',
    slug: 'the-three-musketeers',
    month: 'may',
    year: 2026,
    meetingDate: '2026-05-25',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'The Mote in God\'s Eye',
    author: 'Larry Niven and Jerry Pournelle',
    slug: 'the-mote-in-gods-eye',
    month: 'june',
    year: 2026,
    meetingDate: '2026-06-29',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'The Two Towers',
    author: 'J.R.R. Tolkien',
    slug: 'the-two-towers',
    month: 'july',
    year: 2026,
    meetingDate: '2026-07-27',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'Master and Commander',
    author: 'Patrick O\'Brian',
    slug: 'master-and-commander',
    month: 'august',
    year: 2026,
    meetingDate: '2026-08-31',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'The Screwtape Letters',
    author: 'C.S. Lewis',
    slug: 'the-screwtape-letters',
    month: 'september',
    year: 2026,
    meetingDate: '2026-09-28',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'Hyperion',
    author: 'Dan Simmons',
    slug: 'hyperion',
    month: 'october',
    year: 2026,
    meetingDate: '2026-10-26',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
  {
    title: 'The Return of the King',
    author: 'J.R.R. Tolkien',
    slug: 'the-return-of-the-king',
    month: 'november',
    year: 2026,
    meetingDate: '2026-11-23',
    theme: '', // TBD
    description: '',
    isCurrentBook: false,
  },
];

async function addBooks() {
  console.log('Starting to add 2026 books to Sanity CMS...\n');

  for (const book of books2026) {
    try {
      const doc = await client.create({
        _type: 'monthlyBook',
        ...book,
        publishedAt: new Date().toISOString(),
      });

      console.log(`✅ Added: ${book.title} (${book.month} 2026)`);
    } catch (error) {
      console.error(`❌ Failed to add ${book.title}:`, error.message);
    }
  }

  console.log('\n✅ All 2026 books have been added to the CMS!');
  console.log('You can now:');
  console.log('1. Add cover images in Sanity Studio (http://localhost:3333)');
  console.log('2. Fill in missing themes');
  console.log('3. Add descriptions and Amazon links');
  console.log('4. Add discussion questions');
}

addBooks().catch(console.error);
