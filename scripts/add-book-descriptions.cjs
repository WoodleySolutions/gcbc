const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1pod6f3p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Generate brief descriptions from study guide content
const descriptions = {
  'the-hitchhikers-guide-to-the-galaxy': 'Imagine a world where divine revelation never happened. Douglas Adams presents a hilarious, absurd, and endearing exploration of what life, the universe, and everything would mean without God\'s communication.',

  'enders-game': 'Orson Scott Card\'s military sci-fi classic explores moral reasoning and Catholic ethics through the story of a brilliant child trained for interstellar war. A profound examination of just war theory and the dignity of the human person.',

  'watchmen': 'Alan Moore\'s graphic novel examines the use of power and the morality of means and ends. A dark exploration of fallen heroes and the question: who watches the watchmen?',

  'pride-and-prejudice': 'Jane Austen\'s timeless romance explores virtue, the sacrament of marriage, and the formation of character. A beautiful reflection on how pride and prejudice can blind us to truth and love.',

  'brave-new-world': 'Aldous Huxley\'s dystopian vision presents a world where marriage, family, and human dignity have been sacrificed for stability and pleasure. A prophetic warning about the dangers of divorcing sexuality from its divine purpose.',

  'jurassic-park': 'Michael Crichton\'s thriller explores humanity\'s relationship with creation and the dangers of playing God. A cautionary tale about hubris, the limits of human knowledge, and our role as stewards of creation.',

  'foundation': 'Isaac Asimov\'s galactic epic, inspired by the fall of Rome and the medieval Church, offers a profound defense of faith and the role of humankind in protecting divine revelation through dark ages.',

  'the-bourne-identity': 'Robert Ludlum\'s spy thriller explores identity, memory, and moral conscience. The story of a man trying to discover who he is resonates with our own search for identity in Christ.',

  'dune': 'Frank Herbert\'s epic saga examines prophetic leadership, religious manipulation, and the burden of foreknowledge. A complex meditation on free will, destiny, and the dangers of messianic power.',

  'the-martian': 'Andy Weir\'s survival story celebrates human ingenuity, hope, and the refusal to give up. A joyful reminder of humanity\'s call to steward creation and use our God-given reason to overcome seemingly impossible challenges.',

  'the-great-divorce': 'C.S. Lewis\'s theological fantasy explores the nature of heaven, hell, and human freedom. A profound meditation on the choices that lead us toward or away from God, and the reality that the gates of hell are locked from the inside.'
};

async function addDescriptions() {
  console.log('📝 Adding descriptions to 2025 books...\n');

  for (const [slug, description] of Object.entries(descriptions)) {
    try {
      const book = await client.fetch(
        `*[_type == "monthlyBook" && slug.current == $slug][0]`,
        { slug }
      );

      if (!book) {
        console.log(`  ❌ Book not found: ${slug}`);
        continue;
      }

      await client
        .patch(book._id)
        .set({ description })
        .commit();

      console.log(`  ✅ ${book.title}`);

    } catch (error) {
      console.error(`  ❌ Error updating ${slug}:`, error.message);
    }
  }

  console.log('\n✨ Descriptions added!');
}

if (!process.env.SANITY_TOKEN) {
  console.error('❌ Error: SANITY_TOKEN environment variable not set');
  process.exit(1);
}

addDescriptions().catch(console.error);
