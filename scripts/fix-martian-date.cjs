const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1pod6f3p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function fixMartianDate() {
  console.log('🔧 Fixing The Martian meeting date...\n');

  try {
    const book = await client.fetch(
      `*[_type == "monthlyBook" && slug.current == "the-martian"][0]`
    );

    if (!book) {
      console.log('❌ The Martian not found');
      return;
    }

    console.log(`Current date: ${book.meetingDate}`);
    console.log(`Current month: ${book.month}`);

    // Update to October 2025 (should be 10/27/2025 based on the pattern)
    await client
      .patch(book._id)
      .set({
        meetingDate: '2025-10-27T19:37:00.000Z',
        month: 'october'
      })
      .commit();

    console.log('\n✅ Updated The Martian:');
    console.log('   Meeting Date: October 27, 2025');
    console.log('   Month: October');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

if (!process.env.SANITY_TOKEN) {
  console.error('❌ Error: SANITY_TOKEN environment variable not set');
  process.exit(1);
}

fixMartianDate().catch(console.error);
