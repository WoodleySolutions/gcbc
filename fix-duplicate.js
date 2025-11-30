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

async function fixDuplicate() {
  console.log('🔧 FIXING DUPLICATE POSTS...\n')

  try {
    // Find all posts with the duplicate title
    const duplicatePosts = await client.fetch(`
      *[_type == "blogPost" && title match "*Good Kid m.A.A.d Catholic*"] {
        _id,
        title,
        postType,
        publishedAt,
        author
      }
    `)

    console.log(`📊 Found ${duplicatePosts.length} posts with "Good Kid m.A.A.d Catholic" in title\n`)

    duplicatePosts.forEach((post, index) => {
      console.log(`${index + 1}. "${post.title}"`)
      console.log(`   ID: ${post._id}`)
      console.log(`   Type: ${post.postType}`)
      console.log(`   Author: ${post.author}`)
      console.log(`   Published: ${post.publishedAt}`)
      console.log('')
    })

    // Find the article version to delete (keep the video version)
    const articleToDelete = duplicatePosts.find(post => post.postType === 'article')
    const videoToKeep = duplicatePosts.find(post => post.postType === 'video')

    if (articleToDelete && videoToKeep) {
      console.log(`🗑️  Deleting article version: "${articleToDelete.title}" (${articleToDelete._id})`)
      console.log(`✅ Keeping video version: "${videoToKeep.title}" (${videoToKeep._id})`)

      // Delete the article version
      await client.delete(articleToDelete._id)
      console.log('\n✅ Duplicate removed successfully!')

    } else if (duplicatePosts.length === 1) {
      console.log('✅ No duplicates found - only one post exists')
    } else {
      console.log('⚠️  Unexpected post configuration - manual review needed')
    }

  } catch (error) {
    console.error('❌ Error fixing duplicate:', error.message)
  }
}

// Run the fix
fixDuplicate()