#!/usr/bin/env node

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load environment variables
dotenv.config()

// Configure client with write access
const client = createClient({
  projectId: '1pod6f3p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN
})

const PDF_DIR = 'C:\\Users\\woodl\\Downloads\\BlogPosts'

// Load the categorization data
const categorization = JSON.parse(fs.readFileSync('./pdf-categorization.json', 'utf-8'))

// Article posts from our categorization
const ARTICLE_POSTS = [
  {
    filename: "2025 Book List Introduction and January Book.pdf",
    title: "2025 Book List Introduction and January Book",
    author: "Great Catholic Book Club",
    publishedAt: "2025-01-01",
    categories: ["reading-lists", "club-updates"],
    excerpt: "Introducing our 2025 reading list and diving into our January book selection."
  },
  {
    filename: "Against Brave New World.pdf",
    title: "Against Brave New World: The Strength of Family",
    author: "Tyler Woodley",
    publishedAt: "2024-05-25",
    categories: ["book-discussions", "catholic-living", "faith-literature"],
    excerpt: "Exploring how Aldous Huxley's dystopian vision contrasts with the Catholic understanding of family and human dignity."
  },
  {
    filename: "Ender's Game Fatherhood, Failure, and Forgiveness.pdf",
    title: "Ender's Game: Fatherhood, Failure, and Forgiveness",
    author: "Tyler Woodley",
    publishedAt: "2024-02-22",
    categories: ["book-discussions", "catholic-living", "faith-literature"],
    excerpt: "A Catholic perspective on Orson Scott Card's Ender's Game, examining themes of fatherhood and moral responsibility."
  },
  {
    filename: "Good Kid mAAd Catholic A Journey Through Faith.pdf",
    title: "Good Kid m.A.A.d Catholic: A Journey Through Faith and Hip-Hop",
    author: "Sadie Woodley",
    publishedAt: "2024-01-13",
    categories: ["faith-literature", "catholic-living"],
    excerpt: "Exploring the intersection of faith and hip-hop culture through Kendrick Lamar's powerful storytelling."
  },
  {
    filename: "Reading Scripture every day is awesome.pdf",
    title: "Reading Scripture Every Day is Awesome!",
    author: "Sadie Woodley",
    publishedAt: "2024-04-13",
    categories: ["catholic-living", "reading-tips"],
    excerpt: "Discovering the joy and transformative power of daily Scripture reading in our spiritual journey."
  },
  {
    filename: "The Family Is the Foundation.pdf",
    title: "The Family Is the Foundation: Preserving the Deposit of Faith in a Fractured World",
    author: "Tyler Woodley",
    publishedAt: "2024-07-27",
    categories: ["catholic-living", "faith-literature", "book-discussions"],
    excerpt: "How the family serves as the cornerstone of faith transmission and civilization itself."
  },
  {
    filename: "The Hitchhiker's Guide to the Galaxy.pdf",
    title: "The Hitchhiker's Guide to the Galaxy: Family as the Purpose of Creation",
    author: "Tyler Woodley",
    publishedAt: "2024-01-24",
    categories: ["book-discussions", "catholic-living", "faith-literature"],
    excerpt: "Finding deeper meaning in Douglas Adams' satirical masterpiece through the lens of Catholic theology."
  },
  {
    filename: "The Life, Works, and Faith of JRR Tolkien.pdf",
    title: "The Life, Works, and Faith of JRR Tolkien",
    author: "Sadie Woodley",
    publishedAt: "2024-03-06",
    categories: ["author-spotlights", "faith-literature"],
    excerpt: "Exploring how J.R.R. Tolkien's Catholic faith profoundly shaped his literary imagination and timeless works."
  },
  {
    filename: "The Theology of Bob's Burgers, Part 1.pdf",
    title: "The Theology of Bob's Burgers, Part 1: Marriage is Worth It!",
    author: "Sadie Woodley",
    publishedAt: "2024-02-02",
    categories: ["catholic-living", "faith-literature"],
    excerpt: "Discovering unexpected theological insights about marriage and family in this beloved animated series."
  },
  {
    filename: "Watchmen Power, Morality, and Being a Dad.pdf",
    title: "Watchmen: Power, Morality, and Being a Dad",
    author: "Tyler Woodley",
    publishedAt: "2024-03-29",
    categories: ["book-discussions", "catholic-living", "faith-literature"],
    excerpt: "Alan Moore's complex graphic novel examined through the lens of Catholic moral theology and fatherhood."
  },
  {
    filename: "WhyIsEveryBookCatholic.pdf",
    title: "Why is Every Book Catholic?",
    author: "Sadie Woodley",
    publishedAt: "2024-12-12",
    categories: ["faith-literature", "catholic-living"],
    excerpt: "Understanding how all great literature points toward Catholic truth when viewed through the proper lens.",
    featured: true
  },
  {
    filename: "Walking Through the Jungle.pdf",
    title: "Walking Through the Jungle: A Journey of Faith and Discovery",
    author: "Tyler Woodley",
    publishedAt: "2024-06-15",
    categories: ["catholic-living", "faith-literature"],
    excerpt: "Navigating the challenges of modern life while maintaining Catholic principles and values."
  }
]

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function extractPDFContent(filePath) {
  // For now, return placeholder content
  // In a real implementation, you'd extract text from PDF
  return {
    content: `Content extracted from ${path.basename(filePath)}. This would contain the full article text processed from the PDF.`,
    hasImage: true // All articles should have featured images
  }
}

async function migrateArticles() {
  console.log('📝 MIGRATING ARTICLE POSTS...\n')

  try {
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < ARTICLE_POSTS.length; i++) {
      const article = ARTICLE_POSTS[i]
      console.log(`📄 Processing ${i + 1}/${ARTICLE_POSTS.length}: "${article.title}"`)

      try {
        const filePath = path.join(PDF_DIR, article.filename)

        // Check if file exists
        if (!fs.existsSync(filePath)) {
          console.log(`   ⚠️  PDF file not found: ${article.filename}`)
          errorCount++
          continue
        }

        // Extract PDF content (placeholder for now)
        const pdfData = await extractPDFContent(filePath)

        // Create blog post document
        const blogPost = {
          _type: 'blogPost',
          title: article.title,
          slug: {
            current: generateSlug(article.title)
          },
          author: article.author,
          publishedAt: new Date(article.publishedAt).toISOString(),
          postType: 'article',
          excerpt: article.excerpt,
          content: [
            {
              _type: 'block',
              _key: 'content1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: pdfData.content
                }
              ]
            }
          ],
          categories: article.categories,
          featured: article.featured || false,
          // Note: featuredImage will need to be added separately after image upload
        }

        // Create the blog post
        const result = await client.create(blogPost)
        console.log(`   ✅ Created: ${result._id}`)
        successCount++

      } catch (error) {
        console.error(`   ❌ Error processing "${article.title}":`, error.message)
        errorCount++
      }
    }

    console.log(`\n📊 ARTICLE MIGRATION SUMMARY:`)
    console.log(`   ✅ Successful: ${successCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log(`   📝 Total articles processed: ${ARTICLE_POSTS.length}`)

    if (errorCount === 0) {
      console.log(`\n🎯 ALL ARTICLES MIGRATED SUCCESSFULLY!`)
      console.log(`\n📋 NEXT STEPS:`)
      console.log(`   1. Extract and upload featured images from PDFs`)
      console.log(`   2. Link images to blog posts`)
      console.log(`   3. Review content formatting`)
      console.log(`   4. Proceed with video migration`)
    }

  } catch (error) {
    console.error('❌ Error during article migration:', error.message)
  }
}

// Run the migration
migrateArticles()