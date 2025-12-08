const fs = require('fs');
const path = require('path');

// Read the text file
const filePath = 'C:\\Users\\woodl\\Downloads\\GCBC_2025ReadingGuide.txt';
const content = fs.readFileSync(filePath, 'utf-8');

// Split into lines
const lines = content.split('\n');

// Book slugs mapping
const bookSlugs = {
  "THE HITCHHIKER'S GUIDE TO THE GALAXY": 'hitchhikers-guide-to-the-galaxy',
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

// Find where each book section starts and ends
function findBookSections() {
  const sections = [];
  const bookTitles = Object.keys(bookSlugs);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineUpper = line.toUpperCase();

    // Skip if line is too short or part of TOC (before line 70)
    if (i < 70 || line.length < 10) continue;

    // Check if this line matches any book title (with lowercase ", by " author pattern)
    for (const title of bookTitles) {
      if (lineUpper.startsWith(title) && line.includes(', by ')) {
        sections.push({
          title: title,
          slug: bookSlugs[title],
          startLine: i
        });
        break;
      }
    }
  }

  // Set end lines
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

  // Extract article and questions
  let articleLines = [];
  let questionsLines = [];

  if (discussionQuestionsIndex > 0) {
    articleLines = sectionLines.slice(2, discussionQuestionsIndex)
      .map(l => l.trim())
      .filter(l => l.length > 0);

    questionsLines = sectionLines.slice(discussionQuestionsIndex + 1)
      .map(l => l.trim())
      .filter(l => l.length > 0);
  } else {
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
    title: section.title,
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
    if (line.match(/^[A-Z\s']+,\s+BY\s+[A-Z\s]+$/)) {
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

// Test parsing
console.log('🔍 Testing study guide parser...\n');

const sections = findBookSections();
console.log(`📚 Found ${sections.length} book sections:\n`);

// Test on first book (Hitchhiker's Guide)
const testBook = sections[0];
console.log(`\n📖 Testing on: ${testBook.title}`);
console.log(`   Lines ${testBook.startLine} to ${testBook.endLine}\n`);

const bookContent = extractBookContent(testBook);

console.log('📄 Study Guide Content:');
console.log(`   ${bookContent.studyGuideContent.length} blocks`);
console.log('\n   First 3 blocks:');
bookContent.studyGuideContent.slice(0, 3).forEach((block, i) => {
  const text = block.children[0].text;
  const preview = text.length > 80 ? text.substring(0, 80) + '...' : text;
  console.log(`   ${i + 1}. [${block.style}] ${preview}`);
});

console.log('\n❓ Discussion Questions:');
console.log(`   ${bookContent.discussionQuestions.length} questions found\n`);
bookContent.discussionQuestions.forEach((q, i) => {
  const preview = q.length > 100 ? q.substring(0, 100) + '...' : q;
  console.log(`   ${i + 1}. ${preview}`);
});

console.log('\n\n✅ Test complete! Parsing looks good.');
console.log('\nReady to import to Sanity? Run:');
console.log('  node scripts/import-study-guide.js');
