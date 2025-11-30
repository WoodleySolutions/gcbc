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

const bookUpdates = [
  {
    slug: 'the-power-and-the-glory',
    theme: 'Faithfulness in Persecution',
    description: 'Set in 1930s Mexico during a violent anti-Catholic purge, Graham Greene\'s masterpiece follows a nameless "whiskey priest" on the run from authorities. Flawed, alcoholic, and haunted by past sins, he nevertheless continues to celebrate Mass and administer sacraments in secret, risking execution to serve his flock. This Catholic novel asks the hardest question: What does faithfulness look like when the cost is martyrdom? Greene shows us that holiness doesn\'t require perfection—it requires showing up when everything is at stake.',
  },
  {
    slug: 'starship-troopers',
    theme: 'Authority and Duty',
    description: 'Robert Heinlein\'s controversial classic follows Johnny Rico through boot camp and into interstellar war against alien "Bugs." But this isn\'t just military sci-fi—it\'s a philosophical treatise on civic virtue, earned citizenship, and the moral weight of service. In Heinlein\'s society, only those who serve gain the franchise. Is citizenship a right or a responsibility? What do we owe to the society that protects us? Through Rico\'s journey from spoiled teenager to hardened soldier, we explore duty, sacrifice, and what it means to truly serve the common good.',
  },
  {
    slug: 'the-fellowship-of-the-ring',
    theme: 'The Burden of Providence',
    description: 'When a simple hobbit inherits an ancient evil that could destroy the world, Frodo Baggins faces an impossible choice: accept a quest that will likely destroy him, or watch everything he loves fall to darkness. Tolkien\'s epic begins with the most Catholic of themes—the small and weak chosen to bear impossible weights for the salvation of all. The Fellowship forms not from strength, but from friendship and fidelity. Each member carries their own burden, but none heavier than the Ringbearer himself. Providence has chosen; will the chosen accept?',
  },
  {
    slug: 'leviathan-wakes',
    theme: 'Justice vs. Survival',
    description: 'In the colonized solar system of James S.A. Corey\'s Expanse series, detective Miller hunts for a missing girl while ice-hauler captain Holden stumbles into a conspiracy that could ignite system-wide war. Both men face the same question: do you do what\'s right, or what keeps you alive? Miller, a burned-out cop on a doomed station, chooses justice even when it costs everything. Holden can\'t help but tell the truth even when lies would be safer. In a universe of corporate greed and political cynicism, these men dare to sacrifice for people they\'ll never meet.',
  },
  {
    slug: 'the-three-musketeers',
    theme: 'Brotherhood and Loyalty',
    description: 'D\'Artagnan arrives in Paris with nothing but ambition and a sword, but finds something more valuable than gold: brotherhood. Athos, Porthos, and Aramis become more than companions—they become brothers willing to die for each other. "All for one, one for all" isn\'t just a motto; it\'s the ultimate Catholic ethic of friendship. Through duels, conspiracies, and wars, Dumas shows us that true nobility isn\'t about birth or title—it\'s about laying down your life for your friends. Swashbuckling adventure meets the theology of friendship.',
  },
  {
    slug: 'the-mote-in-gods-eye',
    theme: 'Mercy and the Other',
    description: 'When humanity makes first contact with an alien species, every decision carries the weight of species survival. Niven and Pournelle\'s masterpiece isn\'t about laser battles—it\'s about the tension between justice and mercy when facing the truly alien. The Moties are fascinating, sympathetic, and potentially catastrophic. Do we show mercy to beings we don\'t fully understand? Do we risk human extinction for the sake of another species? Through military officers, a Catholic priest, and dedicated scientists, we explore prudence in war and what we owe to "the Other" in an uncertain universe.',
  },
  {
    slug: 'the-two-towers',
    theme: 'Perseverance in Darkness',
    description: 'The Fellowship has broken. Frodo and Sam trudge toward Mordor with their treacherous guide Gollum. Aragorn, Gimli, and Legolas chase across Rohan. Merry and Pippin find themselves prisoners of orcs. This is the long middle of the war—the darkest hour when hope seems lost and the enemy\'s victory feels inevitable. Yet each character perseveres. Sam carries Frodo when Frodo can\'t walk. Aragorn serves even when kingship seems impossible. The Ents march to war. Tolkien teaches us that heroism isn\'t victory—it\'s continuing when continuation itself seems impossible.',
  },
  {
    slug: 'master-and-commander',
    theme: 'Honor in Command',
    description: 'Patrick O\'Brian introduces Captain Jack Aubrey and ship\'s surgeon Stephen Maturin in the first of his legendary series. Set during the Napoleonic Wars, these aren\'t simple naval adventures—they\'re meditations on leadership, duty, and moral complexity. Aubrey embodies the warrior-gentleman: fierce in battle, honorable in victory, merciful in power. Maturin brings philosophical and moral depth, challenging easy answers. Together they show us what it means to command: serving rather than dominating, making impossible choices with honor, bearing the weight of other lives. The Catholic gentleman-warrior in fiction\'s finest form.',
  },
  {
    slug: 'the-screwtape-letters',
    theme: 'Spiritual Warfare',
    description: 'C.S. Lewis\'s diabolical masterpiece flips our perspective: we read the correspondence of a senior demon training his nephew in the art of temptation. Suddenly we see our own spiritual battles from the enemy\'s viewpoint. Every small compromise, every petty resentment, every comfortable sin becomes a strategic victory for hell. Lewis reminds us of the war we often forget—against principalities and powers, against spiritual forces of evil. Every temptation is a battlefield. Every choice has eternal weight. The demon Screwtape reveals how the most ordinary life is the front line of cosmic war.',
  },
  {
    slug: 'hyperion',
    theme: 'Suffering and Redemption',
    description: 'Dan Simmons crafts a Canterbury Tales for the far future: seven pilgrims travel to meet the deadly Shrike, each carrying a story of suffering and hope. A priest wrestling with faith after genocide. A soldier betrayed by his own side. A scholar watching his daughter age backward toward non-existence. A detective seeking justice beyond death. Through vivid, heartbreaking tales, Simmons explores the deepest Catholic themes: suffering\'s meaning, redemption\'s cost, and love\'s power to conquer death itself. The crucifix imagery is explicit—some must be nailed to the tree of pain so others might live.',
  },
  {
    slug: 'the-return-of-the-king',
    theme: 'Victory Through Sacrifice',
    description: 'Tolkien\'s epic climaxes not with military victory but with complete self-sacrifice. Aragorn, the rightful king, serves in the shadows until the moment of need. Frodo destroys himself carrying the Ring to Mount Doom, losing everything to save Middle Earth. Sam becomes the truest hero—faithful unto death, carrying his friend when no strength remains. The eucatastrophe arrives: grace breaking into despair, joy piercing sorrow, the happy ending we didn\'t earn but desperately needed. Tolkien shows us Catholic truth incarnate—that victory comes not through power but through complete self-gift.',
  },
];

async function updateBooks() {
  console.log('Updating 2026 books with themes and descriptions...\n');

  for (const update of bookUpdates) {
    try {
      // Find the book by slug
      const books = await client.fetch(
        `*[_type == "monthlyBook" && slug.current == $slug]`,
        { slug: update.slug }
      );

      if (books.length === 0) {
        console.log(`⚠️  Book not found: ${update.slug}`);
        continue;
      }

      const book = books[0];

      // Update the book
      await client
        .patch(book._id)
        .set({
          theme: update.theme,
          description: update.description,
        })
        .commit();

      console.log(`✅ Updated: ${book.title}`);
      console.log(`   Theme: ${update.theme}`);
      console.log('');
    } catch (error) {
      console.error(`❌ Failed to update ${update.slug}:`, error.message);
    }
  }

  console.log('✅ All books have been updated with themes and descriptions!');
}

updateBooks().catch(console.error);
