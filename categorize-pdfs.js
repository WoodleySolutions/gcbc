#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const PDF_DIR = 'C:\\Users\\woodl\\Downloads\\BlogPosts'

// Based on analysis, categorize PDFs by filename patterns
const VIDEO_INDICATORS = [
  'New Video',
  'Video',
  'Jane Austen, Pride and Prejudice vs The New York Times',
  'The Bourne Identity Genesis',
  'Jason Bourne',
  'My Catholic Conversion Story, Part 2',
  'Woman Plans to Divorce',
  'The Masculine Art of Listening',
  'The Miseducation of Lauryn Hill',
  'Pride and Prejudice A Catholic Take',
  'The Bright Side of Blasphemy',
  'My Conversion Story Speech',
  'Walking Through the Jungle',
  'Theology of The Office',
  'Flannery O\'Connor and the Catholic Imagination',
  'Watchmen A Catholic Take on Means'
]

const ARTICLE_INDICATORS = [
  'The Family Is the Foundation',
  'Reading Scripture every day',
  'Watchmen Power, Morality, and Being a Dad',
  'The Life, Works, and Faith of JRR Tolkien',
  'Introduction to Ender\'s Game',
  'Ender\'s Game Fatherhood',
  'The Theology of Bob\'s Burgers, Part 1',
  'The Hitchhiker\'s Guide to the Galaxy',
  'Good Kid mAAd Catholic A Journey',
  '2025 Book List Introduction',
  'WhyIsEveryBookCatholic',
  'Against Brave New World' // This is the article, not the video
]

function categorizePDFs() {
  console.log('🔍 CATEGORIZING ALL PDFs...\n')

  try {
    const files = fs.readdirSync(PDF_DIR).filter(file => file.endsWith('.pdf'))
    console.log(`📊 Found ${files.length} PDF files\n`)

    const articles = []
    const videos = []
    const unknown = []

    files.forEach(filename => {
      const nameWithoutExt = path.parse(filename).name

      // Check for video indicators
      const isVideo = VIDEO_INDICATORS.some(indicator =>
        nameWithoutExt.includes(indicator)
      )

      // Check for article indicators
      const isArticle = ARTICLE_INDICATORS.some(indicator =>
        nameWithoutExt.includes(indicator)
      )

      if (isVideo && !isArticle) {
        videos.push({
          filename,
          name: nameWithoutExt,
          type: 'video'
        })
      } else if (isArticle && !isVideo) {
        articles.push({
          filename,
          name: nameWithoutExt,
          type: 'article'
        })
      } else {
        unknown.push({
          filename,
          name: nameWithoutExt,
          type: 'unknown'
        })
      }
    })

    console.log(`📝 ARTICLES (${articles.length}):`)
    articles.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.name}`)
    })

    console.log(`\n🎥 VIDEOS (${videos.length}):`)
    videos.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.name}`)
    })

    if (unknown.length > 0) {
      console.log(`\n❓ UNKNOWN (${unknown.length}):`)
      unknown.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.name}`)
      })
    }

    console.log(`\n📋 SUMMARY:`)
    console.log(`   Articles: ${articles.length}`)
    console.log(`   Videos: ${videos.length}`)
    console.log(`   Unknown: ${unknown.length}`)
    console.log(`   Total: ${files.length}`)

    // Save categorization results
    const results = {
      articles,
      videos,
      unknown,
      summary: {
        articleCount: articles.length,
        videoCount: videos.length,
        unknownCount: unknown.length,
        totalCount: files.length
      }
    }

    fs.writeFileSync('pdf-categorization.json', JSON.stringify(results, null, 2))
    console.log(`\n✅ Results saved to pdf-categorization.json`)

  } catch (error) {
    console.error('❌ Error categorizing PDFs:', error.message)
  }
}

categorizePDFs()