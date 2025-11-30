#!/usr/bin/env node

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Configure client with read access
const client = createClient({
  projectId: '1pod6f3p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN
})

async function auditBlogPosts() {
  console.log('🔍 AUDITING ALL BLOG POSTS IN CMS...\n')

  try {
    // Fetch all blog posts with full details
    const allPosts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        author,
        postType,
        publishedAt,
        featuredImage,
        youtubeVideo,
        categories,
        tags,
        featured
      }
    `)

    console.log(`📊 TOTAL BLOG POSTS: ${allPosts.length}\n`)

    // Group posts by type
    const articles = allPosts.filter(post => post.postType === 'article')
    const videos = allPosts.filter(post => post.postType === 'video')
    const unknown = allPosts.filter(post => !post.postType)

    console.log(`📝 ARTICLES: ${articles.length}`)
    console.log(`🎥 VIDEOS: ${videos.length}`)
    console.log(`❓ UNKNOWN TYPE: ${unknown.length}\n`)

    // Check for duplicates by title
    const titleCounts = {}
    allPosts.forEach(post => {
      const title = post.title.toLowerCase().trim()
      titleCounts[title] = (titleCounts[title] || 0) + 1
    })

    const duplicates = Object.entries(titleCounts).filter(([title, count]) => count > 1)
    if (duplicates.length > 0) {
      console.log('🚨 DUPLICATE TITLES FOUND:')
      duplicates.forEach(([title, count]) => {
        console.log(`   "${title}" - ${count} copies`)
      })
      console.log('')
    }

    // Check publication dates
    console.log('📅 PUBLICATION DATE ISSUES:')
    const badDates = allPosts.filter(post => {
      const date = new Date(post.publishedAt)
      return date.getFullYear() > 2025 || date.getFullYear() < 2020
    })

    if (badDates.length > 0) {
      console.log('   Posts with incorrect dates:')
      badDates.forEach(post => {
        console.log(`   - "${post.title}" - ${post.publishedAt}`)
      })
    } else {
      console.log('   ✅ All dates look reasonable')
    }
    console.log('')

    // Check video posts
    console.log('🎥 VIDEO POST ANALYSIS:')
    const videoIssues = videos.filter(post => {
      return !post.youtubeVideo || !post.youtubeVideo.videoId || post.youtubeVideo.videoId.includes('PLACEHOLDER')
    })

    if (videoIssues.length > 0) {
      console.log('   Posts with video issues:')
      videoIssues.forEach(post => {
        console.log(`   - "${post.title}" - ${post.youtubeVideo?.videoId || 'NO VIDEO ID'}`)
      })
    } else {
      console.log('   ✅ All video posts have proper video IDs')
    }
    console.log('')

    // Check article posts for images
    console.log('🖼️ ARTICLE IMAGE ANALYSIS:')
    const articlesWithoutImages = articles.filter(post => !post.featuredImage)
    console.log(`   Articles without featured images: ${articlesWithoutImages.length}`)
    if (articlesWithoutImages.length > 0) {
      articlesWithoutImages.forEach(post => {
        console.log(`   - "${post.title}"`)
      })
    }
    console.log('')

    // Show all posts with their details
    console.log('📋 COMPLETE POST LISTING:')
    console.log('═'.repeat(80))

    allPosts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}"`)
      console.log(`   ID: ${post._id}`)
      console.log(`   Type: ${post.postType || 'UNKNOWN'}`)
      console.log(`   Author: ${post.author || 'No author'}`)
      console.log(`   Published: ${post.publishedAt}`)
      console.log(`   Featured Image: ${post.featuredImage ? 'Yes' : 'No'}`)
      console.log(`   Video ID: ${post.youtubeVideo?.videoId || 'N/A'}`)
      console.log(`   Categories: ${post.categories?.join(', ') || 'None'}`)
      console.log(`   Featured: ${post.featured ? 'Yes' : 'No'}`)
      console.log('')
    })

    console.log('═'.repeat(80))
    console.log('🎯 AUDIT COMPLETE')

  } catch (error) {
    console.error('❌ Error during audit:', error.message)
  }
}

// Run the audit
auditBlogPosts()