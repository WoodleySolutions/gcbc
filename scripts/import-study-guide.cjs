const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Sanity client setup
const client = createClient({
  projectId: '1pod6f3p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // You'll need to set this
  useCdn: false,
});

// Book slugs mapping (in order from the study guide)
const bookSlugs = {
  "THE HITCHHIKER'S GUIDE TO THE GALAXY": 'the-hitchhikers-guide-to-the-galaxy',
  "ENDER'S GAME": 'enders-game',
  "WATCHMEN": 'watchmen',
  "PRIDE AND PREJUDICE": 'pride-and-prejudice',
  "BRAVE NEW WORLD": 'brave-new-world',
  "JURASSIC PARK": 'jurassic-park',
  "FOUNDATION": 'foundation',
  "THE BOURNE IDENTITY": 'the-bourne-identity',
  "DUNE": 'dune',
  "THE MARTIAN": 'the-martian',
  "THE GREAT DIVORCE": 'the-great-divorce'
};

// Read the text file
const filePath = 'C:\\Users\\woodl\\Downloads\\GCBC_2025ReadingGuide.txt';
const content = fs.readFileSync(filePath, 'utf-8');

// Split into lines
const lines = content.split('\n');

// Find where each book section starts and ends
function findBookSections() {
  const sections = [];
  const bookTitles = Object.keys(bookSlugs);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineUpper = line.toUpperCase();

    // Skip if line is too short or part of TOC (before line 70)
    if (i < 70 || line.length < 10) continue;

    // Check if this line matches any book title (with ", by " or ", By " author pattern)
    for (const title of bookTitles) {
      if (lineUpper.startsWith(title) && (line.includes(', by ') || line.includes(', By '))) {
        sections.push({
          title: title,
          slug: bookSlugs[title],
          startLine: i
        });
        break;
      }
    }
  }

  // Set end lines (each section ends where the next begins, or at EOF)
  for (let i = 0; i < sections.length; i++) {
    if (i < sections.length - 1) {
      sections[i].endLine = sections[i + 1].startLine - 1;
    } else {
      sections[i].endLine = lines.length - 1;
    }
  }

  return sections;
}

// Extract article content and discussion questions for a book
function extractBookContent(section) {
  const sectionLines = lines.slice(section.startLine, section.endLine + 1);

  // Find where "DISCUSSION QUESTIONS:" appears
  let discussionQuestionsIndex = -1;
  for (let i = 0; i < sectionLines.length; i++) {
    if (sectionLines[i].trim().toUpperCase().includes('DISCUSSION QUESTIONS:')) {
      discussionQuestionsIndex = i;
      break;
    }
  }

  // Extract article (from line 2 to discussion questions)
  let articleLines = [];
  let questionsLines = [];

  if (discussionQuestionsIndex > 0) {
    // Article is from title+subtitle to discussion questions
    articleLines = sectionLines.slice(2, discussionQuestionsIndex)
      .map(l => l.trim())
      .filter(l => l.length > 0);

    // Questions are after "DISCUSSION QUESTIONS:"
    questionsLines = sectionLines.slice(discussionQuestionsIndex + 1)
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.match(/^[A-Z\s,]+BY [A-Z\s]+$/)); // Filter out next book title
  } else {
    // No discussion questions found, all is article
    articleLines = sectionLines.slice(2)
      .map(l => l.trim())
      .filter(l => l.length > 0);
  }

  // Convert article to Portable Text blocks
  const articleContent = convertToPortableText(articleLines);

  // Parse questions
  const questions = parseQuestions(questionsLines);

  return {
    slug: section.slug,
    studyGuideContent: articleContent,
    discussionQuestions: questions
  };
}

// Convert plain text paragraphs to Sanity Portable Text format
function convertToPortableText(paragraphs) {
  const blocks = [];

  for (const para of paragraphs) {
    // Skip empty paragraphs
    if (!para || para.length < 2) continue;

    // Check if this is a quote (starts and ends with quotes)
    if ((para.startsWith('"') && para.endsWith('"')) ||
        (para.startsWith('\"') && para.endsWith('\"'))) {
      blocks.push({
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: para, marks: [] }],
        markDefs: []
      });
      continue;
    }

    // Check if this looks like a heading (short, capitalized, or followed by colon)
    if (para.length < 60 && (para === para.toUpperCase() || para.endsWith(':'))) {
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: para.replace(/:$/, ''), marks: [] }],
        markDefs: []
      });
      continue;
    }

    // Regular paragraph
    blocks.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: para, marks: [] }],
      markDefs: []
    });
  }

  return blocks;
}

// Parse discussion questions
function parseQuestions(questionLines) {
  const questions = [];
  let currentQuestion = '';

  for (const line of questionLines) {
    // Stop if we hit the next book title
    if (line.match(/^[A-Za-z\s']+,\s+by\s+[A-Za-z\s]+$/)) {
      break;
    }

    // Question lines typically start with numbers like "1.", "2.", etc.
    const match = line.match(/^\d+\.\s*(.+)$/);

    if (match) {
      // New question - save previous if exists
      if (currentQuestion) {
        questions.push(currentQuestion.trim());
      }
      currentQuestion = match[1];
    } else if (line.length > 0) {
      // Continuation of previous question
      if (currentQuestion) {
        currentQuestion += ' ' + line;
      }
    }
  }

  // Add the last question
  if (currentQuestion) {
    questions.push(currentQuestion.trim());
  }

  return questions;
}

// Main execution
async function importStudyGuide() {
  console.log('🔍 Parsing study guide document...');

  const sections = findBookSections();
  console.log(`📚 Found ${sections.length} books\n`);

  for (const section of sections) {
    console.log(`\n📖 Processing: ${section.title}`);

    const bookContent = extractBookContent(section);

    console.log(`  - Article: ${bookContent.studyGuideContent.length} blocks`);
    console.log(`  - Questions: ${bookContent.discussionQuestions.length} items`);

    // Fetch the book document from Sanity
    try {
      const book = await client.fetch(
        `*[_type == "monthlyBook" && slug.current == $slug][0]`,
        { slug: bookContent.slug }
      );

      if (!book) {
        console.log(`  ❌ Book not found in Sanity: ${bookContent.slug}`);
        continue;
      }

      // Update the book with study guide content and questions
      await client
        .patch(book._id)
        .set({
          studyGuideContent: bookContent.studyGuideContent,
          discussionQuestions: bookContent.discussionQuestions
        })
        .commit();

      console.log(`  ✅ Updated successfully!`);

    } catch (error) {
      console.error(`  ❌ Error updating ${section.title}:`, error.message);
    }
  }

  console.log('\n\n✨ Import complete!');
}

// Run the import
if (!process.env.SANITY_TOKEN) {
  console.error('❌ Error: SANITY_TOKEN environment variable not set');
  console.log('\nTo get a token:');
  console.log('1. Run: npx sanity manage');
  console.log('2. Go to API → Tokens');
  console.log('3. Create a token with "Editor" permissions');
  console.log('4. Set it: $env:SANITY_TOKEN="your-token-here" (PowerShell)');
  process.exit(1);
}

importStudyGuide().catch(console.error);
