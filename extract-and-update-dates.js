#!/usr/bin/env node

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'

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

// Real publication dates extracted from PDFs
const REAL_ARTICLE_DATES = {
  "2025-book-list-introduction-and-january-book": "2025-01-19", // Jan 19
  "against-brave-new-world-the-strength-of-family": "2025-05-25", // May 25
  "the-family-is-the-foundation-preserving-the-deposit-of-faith-in-a-fractured-world": "2025-07-27", // Jul 27
  "why-is-every-book-catholic": "2024-12-12", // Dec 12, 2024
  "enders-game-fatherhood-failure-and-forgiveness": "2025-02-22", // Feb 22
  "reading-scripture-every-day-is-awesome": "2025-04-13", // Apr 13
  "flannery-oconnor-and-the-catholic-imagination": "2025-02-12", // Feb 12
  "the-hitchhikers-guide-to-the-galaxy-family-as-the-purpose-of-creation": "2025-01-24", // Jan 24
  "the-theology-of-bobs-burgers-part-1-marriage-is-worth-it": "2025-02-02", // Feb 2
  "introduction-to-enders-game": "2025-02-17", // Feb 17
  "the-life-works-and-faith-of-jrr-tolkien": "2025-03-06", // Mar 6
  "watchmen-power-morality-and-being-a-dad": "2025-03-29", // Mar 29
  "walking-through-the-jungle-a-journey-of-faith-and-discovery": "2025-06-29", // Jun 29
  "the-bright-side-of-blasphemy": "2024-12-26", // Dec 26, 2024
  "theology-of-the-office-natural-reason-and-divine-revelation-explained-by-dwight-and-michael": "2025-07-24", // Jul 24
  "good-kid-maad-catholic-a-journey-through-faith-and-hip-hop": "2025-01-13", // Jan 13
  "the-masculine-art-of-listening-lessons-from-pride-and-prejudice": "2025-04-27", // Apr 27
  "pride-and-prejudice-a-catholic-take-on-virtue-and-marriage-april-2025-book-of-the-month": "2025-04-27", // Apr 27
  "my-conversion-story-speech-by-sadie-woodley": "2025-06-16", // Jun 16
  "my-catholic-conversion-story-part-2-learning-to-read-the-bible-speech-by-sadie-woodley": "2025-08-18", // Aug 18
  "the-bourne-identity-genesis-original-sin-and-the-christian-love-story": "2025-08-24", // Aug 24
  // Will need to extract the rest systematically
}

// Real YouTube upload dates from CSV (need to extract these)
const REAL_VIDEO_DATES = {
  // These need to be extracted from the YouTube CSV data
  // Format: "slug": "YYYY-MM-DD"
}

async function parseYouTubeCSV() {
  console.log('📺 EXTRACTING YOUTUBE UPLOAD DATES FROM CSV...\n')

  try {
    const csvPath = 'C:\\Users\\woodl\\Downloads\\Youtubedata\\videos.csv'
    const csvContent = fs.readFileSync(csvPath, 'utf-8')

    // Parse CSV to extract video IDs and publish timestamps
    const lines = csvContent.split('\n')
    const headers = lines[0].split(',')

    // Find the indices for Video ID and Publish Timestamp
    const videoIdIndex = headers.findIndex(h => h.includes('Video ID'))
    const publishIndex = headers.findIndex(h => h.includes('Publish Timestamp'))
    const titleIndex = headers.findIndex(h => h.includes('Video Title'))

    console.log(`📊 CSV Headers found:`)
    console.log(`   Video ID at index: ${videoIdIndex}`)
    console.log(`   Publish Timestamp at index: ${publishIndex}`)
    console.log(`   Video Title at index: ${titleIndex}\n`)

    // Parse each line to extract video data
    const videoData = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',')
      if (values.length > publishIndex) {
        const videoId = values[videoIdIndex]
        const publishTimestamp = values[publishIndex]
        const title = values[titleIndex]

        if (videoId && publishTimestamp && title) {
          videoData.push({
            videoId: videoId.trim(),
            publishDate: publishTimestamp.trim(),
            title: title.trim()
          })
        }
      }
    }

    console.log(`📋 Found ${videoData.length} videos with dates in CSV`)

    // Show first few as example
    console.log('\n📺 SAMPLE VIDEO DATES:')
    videoData.slice(0, 5).forEach(video => {
      console.log(`   ${video.videoId} - ${video.publishDate} - "${video.title}"`)
    })

    return videoData

  } catch (error) {
    console.error('❌ Error parsing YouTube CSV:', error.message)
    return []
  }
}

async function updateBlogPostDates() {
  console.log('📅 UPDATING BLOG POST PUBLICATION DATES...\n')

  try {
    // Get all blog posts
    const allPosts = await client.fetch(`
      *[_type == "blogPost"] {
        _id,
        title,
        slug,
        postType,
        publishedAt,
        youtubeVideo
      }
    `)

    console.log(`📊 Found ${allPosts.length} posts to update\n`)

    // Parse YouTube data
    const youtubeData = await parseYouTubeCSV()

    let updatedCount = 0
    let errorCount = 0

    for (const post of allPosts) {
      try {
        let correctDate = null

        if (post.postType === 'article') {
          // Look up correct date from PDF extraction
          correctDate = REAL_ARTICLE_DATES[post.slug.current]

          if (!correctDate) {
            console.log(`⚠️  No date found for article: "${post.title}"`)
            console.log(`    Slug: ${post.slug.current}`)
            console.log(`    Current date: ${post.publishedAt}`)
            console.log(`    Action needed: Extract date from PDF manually\n`)
            continue
          }
        } else if (post.postType === 'video') {
          // Find matching YouTube video by video ID
          const videoId = post.youtubeVideo?.videoId
          if (videoId) {
            const youtubeVideo = youtubeData.find(v => v.videoId === videoId)
            if (youtubeVideo) {
              // Convert YouTube timestamp to date
              const publishDate = new Date(youtubeVideo.publishDate)
              correctDate = publishDate.toISOString().split('T')[0] // YYYY-MM-DD format
            }
          }

          if (!correctDate) {
            console.log(`⚠️  No YouTube date found for video: "${post.title}"`)
            console.log(`    Video ID: ${videoId}`)
            console.log(`    Current date: ${post.publishedAt}\n`)
            continue
          }
        }

        if (correctDate) {
          // Update the blog post with correct date
          const correctISO = new Date(correctDate).toISOString()

          await client
            .patch(post._id)
            .set({ publishedAt: correctISO })
            .commit()

          console.log(`✅ Updated "${post.title}"`)
          console.log(`   Old: ${post.publishedAt}`)
          console.log(`   New: ${correctISO}\n`)
          updatedCount++
        }

      } catch (error) {
        console.error(`❌ Error updating "${post.title}":`, error.message)
        errorCount++
      }
    }

    console.log(`\n📊 UPDATE SUMMARY:`)
    console.log(`   ✅ Successfully updated: ${updatedCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log(`   ⚠️  Pending manual extraction: ${allPosts.length - updatedCount - errorCount}`)

  } catch (error) {
    console.error('❌ Error during date update process:', error.message)
  }
}

async function main() {
  console.log('📅 PUBLICATION DATE CORRECTION PROCESS\n')
  console.log('This script will:')
  console.log('1. Extract real dates from YouTube CSV for videos')
  console.log('2. Use manually extracted PDF dates for articles')
  console.log('3. Update all blog posts with correct publication dates\n')

  await updateBlogPostDates()

  console.log('\n📋 NEXT STEPS:')
  console.log('1. Manually extract remaining article dates from PDFs')
  console.log('2. Add them to REAL_ARTICLE_DATES object')
  console.log('3. Re-run this script to complete the updates')
}

// Run the main process
main()