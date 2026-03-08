/**
 * Populate Collection Teasers
 * ===========================
 * Sets the `collectionTeaser` field on the 2025 monthly books in Sanity,
 * replacing the full free study guides with the short teasers that direct
 * readers to purchase The Protoevangelium Collection.
 *
 * Usage:
 *   node scripts/populate-collection-teasers.mjs
 *
 * Requires SANITY_TOKEN in your environment (needs write access).
 * Add it to your .env file:
 *   SANITY_TOKEN=your_token_here
 *
 * Get a token from: https://www.sanity.io/manage → your project → API → Tokens
 * Use a token with "Editor" or "Contributor" permissions.
 *
 * DRY RUN: Run with --dry-run to preview matches without writing to Sanity.
 *   node scripts/populate-collection-teasers.mjs --dry-run
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';

config();

const DRY_RUN = process.argv.includes('--dry-run');

const client = createClient({
  projectId: '1pod6f3p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
  useCdn: false, // Must be false for writes
});

// Map of book title fragments → teaser text
// The script matches books by searching for these title fragments (case-insensitive).
const TEASERS = [
  {
    titleMatch: "hitchhiker",
    teaser: `What is the point of life, the universe, and everything?

Douglas Adams played it for laughs. But underneath the absurdity, it's the most serious question a person can ask. And it's exactly the right place to start.

In our study guide for The Hitchhiker's Guide to the Galaxy, we explore what happens when human beings try to answer the ultimate question without divine revelation, why Adams can't help but make a universe where humans are the most important figures, and what St. Thomas Aquinas and Oolon Colluphid have in common. (Less than you'd think. More than you'd expect.)`
  },
  {
    titleMatch: "ender",
    teaser: `What kind of people would put the weight of the world on the shoulders of a child?

It's a question that Card explores with brutal honesty. It's also a question the Bible answers — and the answer might surprise you.

Our study guide for Ender's Game draws a striking parallel between Ender Wiggin and the young King David, explores the Wars of Religion and why every totalitarian government in history has tried to control the Church, and asks the hardest question in the book: how is what God did to David different from what the adults did to Ender?`
  },
  {
    titleMatch: "watchmen",
    teaser: `Dr. Manhattan is not God. The very idea is absurd. But it is the kind of mix-up that the real God has been working to clear up from the beginning.

Our study guide for Watchmen explores the difference between a being that controls creation and the One who created it out of nothing. We dig into why human beings keep worshipping false gods that can be used as weapons, what the Old Testament has to say about bringing your deity onto the battlefield, and why a relationship with the real God is about love, not leverage.`
  },
  {
    titleMatch: "pride and prejudice",
    teaser: `Three bad marriages. One masterclass in what the sacrament is actually for.

Pride and Prejudice might be the most stirring treatise on Catholic marriage you'll ever read — and it was written by an Anglican. Our study guide analyzes Lydia and Wickham, Charlotte and Mr. Collins, and the painfully relatable Mr. and Mrs. Bennet, and shows how all of it shapes the extraordinary love story of Elizabeth and Darcy. It turns out that the most important thing in premarital prep is learning how to have a good fight.`
  },
  {
    titleMatch: "brave new world",
    teaser: `What if the greatest threat to human freedom isn't the tyrant who takes your rights, but the state that makes you forget you ever had them?

Our study guide for Brave New World connects Huxley's dystopia to the real history of Bismarck's Kulturkampf, the invention of the modern welfare state, and the Church's ongoing battle for the conscience of the laity. We explore how the de-formation of conscience works, why the state always targets sexuality and family first, and why even in the darkest dystopia, Christ has already won.`
  },
  {
    titleMatch: "bourne",
    teaser: `Who are you when you strip away everything you've pretended to be?

Jason Bourne doesn't know. Neither did Saul of Tarsus.

Our study guide for The Bourne Identity finds genuine Pauline theology inside a pulpy spy novel. We explore the false self, the terror of honest self-examination, and the beautiful Christian truth that the real person underneath the wreckage is neither the monster you feared nor the hero you hoped for, but simply a human being — wounded, redeemable, and offered a new life.`
  },
  {
    titleMatch: "foundation",
    teaser: `How does an avowed atheist end up writing one of the most profound defenses of faith in science fiction?

Isaac Asimov had no patience for religious dogma. And yet in Foundation, he created characters who guard a deposit of sacred knowledge with their lives, submit their intellect and will to the plan of a prophet, and believe wholeheartedly that salvation comes from information they could never have discovered on their own. Sound familiar?

Our study guide traces the remarkable parallels between Asimov's Foundation and the medieval Catholic Church, and explores why even atheists can't escape the human need for faith.`
  },
  {
    titleMatch: "dune",
    teaser: `The most evocative Catholic tropes in science fiction, used to build a false messiah.

Our study guide for Dune dives deep into Herbert's expert use of typology — the same interpretive method the Church uses to read the Bible — to construct the Kwisatz Haderach as a counterfeit Christ. We trace the parallels between the Holy Family and the Atreides family, explore how Mary's fiat becomes Jessica's anti-fiat, and ask the question at the heart of the novel: what happens to a human being who surrenders his free will to a manufactured destiny?`
  },
  {
    titleMatch: "jurassic",
    teaser: `Jurassic Park is a book about a theologian disguising himself as a mathematician. Also there are dinosaurs.

Our study guide explores how Ian Malcolm is basically doing Catholic apologetics without knowing it, what the parable of the talents has to do with genetic engineering, and why the breakdown of the sacramental worldview during the Reformation and Enlightenment leads, with terrifying logic, to a theme park full of dinosaurs eating people. We also get into the Industrial Revolution, the natural law, and why "whether they could" is never the same question as "whether they should."`
  },
  {
    titleMatch: "martian",
    teaser: `What if being stranded on Mars is actually a pretty good metaphor for being Adam?

Our study guide for The Martian draws a surprising parallel between Mark Watney and the first man, both waking up alone in an alien world with skills they've never tested, figuring out who they are by learning what they can do. We explore the proper use of free will and intellect, why surrender to God is the opposite of passivity, and why Mark Watney's sense of humor might be the most theologically significant thing about him.`
  },
  {
    titleMatch: "great divorce",
    teaser: `The only explicitly Christian book in the collection, and the perfect place to end the journey.

C.S. Lewis imagines the afterlife as a series of choices, and it turns out the hardest one is simply being honest about yourself. Our study guide explores how The Great Divorce makes a powerful case for Catholic teachings on purgatory, particular judgment, and the process of becoming holy. We look at why the ghosts can't walk on the grass, why Napoleon will never get on the bus, and why the painful work of facing ourselves is something we could be doing right now, today, in this life.

Salvation is not a "one and done" deal. It's a "one and begun" journey. And the joy at the end is that it was heaven all along.`
  },
];

async function run() {
  console.log(DRY_RUN ? '=== DRY RUN — no changes will be written ===\n' : '=== LIVE RUN — writing to Sanity ===\n');

  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_TOKEN && !DRY_RUN) {
    console.error('ERROR: SANITY_WRITE_TOKEN is not set in .env. Run with --dry-run to preview.');
    process.exit(1);
  }

  // Fetch all books from Sanity
  const books = await client.fetch(`*[_type == "monthlyBook"]{ _id, title, year, collectionTeaser }`);
  console.log(`Found ${books.length} books in Sanity.\n`);

  let matched = 0;
  let skipped = 0;
  let errors = 0;

  for (const teaser of TEASERS) {
    const book = books.find(b =>
      b.title.toLowerCase().includes(teaser.titleMatch.toLowerCase())
    );

    if (!book) {
      console.warn(`  ⚠️  No match found for: "${teaser.titleMatch}"`);
      errors++;
      continue;
    }

    if (book.collectionTeaser) {
      console.log(`  ↷  "${book.title}" — already has a teaser, skipping.`);
      skipped++;
      continue;
    }

    console.log(`  ✓  Matched: "${book.title}" (${book.year})`);
    console.log(`     Preview: ${teaser.teaser.slice(0, 80)}...`);

    if (!DRY_RUN) {
      try {
        await client.patch(book._id).set({ collectionTeaser: teaser.teaser }).commit();
        console.log(`     → Written to Sanity.`);
      } catch (err) {
        console.error(`     ✗  Error writing to Sanity: ${err.message}`);
        errors++;
        continue;
      }
    }

    matched++;
  }

  console.log(`\n---`);
  console.log(`Matched & ${DRY_RUN ? 'would update' : 'updated'}: ${matched}`);
  console.log(`Skipped (already set): ${skipped}`);
  console.log(`Errors / no match: ${errors}`);

  if (DRY_RUN) {
    console.log('\nDry run complete. Run without --dry-run to apply changes.');
  } else {
    console.log('\nDone. Deploy the Sanity Studio schema changes and rebuild the site to see the teasers live.');
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
