#!/usr/bin/env node

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

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

async function fixPublicationDates() {
  console.log('📅 FIXING PUBLICATION DATES...\n')
  console.log('⚠️  CURRENT ISSUE: All publication dates are incorrect (made up)')
  console.log('📋 SOLUTION NEEDED:')
  console.log('   1. Extract real dates from PDFs (look for "Author · Date · X min read" pattern)')
  console.log('   2. Extract real upload dates from YouTube videos')
  console.log('   3. Update each blog post with correct publishedAt date\n')

  try {
    // Get all blog posts to show current wrong dates
    const allPosts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        postType,
        publishedAt,
        youtubeVideo
      }
    `)

    console.log(`📊 Found ${allPosts.length} posts with incorrect dates:\n`)

    console.log('📝 ARTICLES NEEDING PDF DATE EXTRACTION:')
    const articles = allPosts.filter(post => post.postType === 'article')
    articles.forEach((post, index) => {
      console.log(`   ${index + 1}. "${post.title}"`)
      console.log(`      Current (wrong) date: ${post.publishedAt}`)
      console.log(`      Needs: Extract from corresponding PDF`)
      console.log('')
    })

    console.log('🎥 VIDEOS NEEDING YOUTUBE DATE EXTRACTION:')
    const videos = allPosts.filter(post => post.postType === 'video')
    videos.forEach((post, index) => {
      console.log(`   ${index + 1}. "${post.title}"`)
      console.log(`      Current (wrong) date: ${post.publishedAt}`)
      console.log(`      YouTube ID: ${post.youtubeVideo?.videoId || 'N/A'}`)
      console.log(`      Needs: Extract from YouTube upload date`)
      console.log('')
    })

    console.log('🔧 NEXT STEPS:')
    console.log('   1. Manually extract dates from each PDF by reading the author/date line')
    console.log('   2. Use YouTube CSV data to get real upload dates for videos')
    console.log('   3. Create update script with correct dates')
    console.log('   4. Update all blog posts with real publication dates')

  } catch (error) {
    console.error('❌ Error analyzing dates:', error.message)
  }
}

// Example of what the fix should look like:
function exampleCorrectDate() {
  console.log('\n📋 EXAMPLE - "Why is Every Book Catholic?"')
  console.log('   PDF shows: "Sadie Woodley · Dec 12, 2024 · 6 min read"')
  console.log('   Correct date: 2024-12-12')
  console.log('   Current (wrong) date: 2024-12-12 (this one was coincidentally close)')
}

// Run the analysis
fixPublicationDates()
exampleCorrectDate()