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

async function deleteAllBlogPosts() {
  console.log('🗑️  DELETING ALL BLOG POSTS FROM CMS...\n')

  try {
    // First, get all blog post IDs
    const allPosts = await client.fetch(`
      *[_type == "blogPost"]{ _id, title }
    `)

    console.log(`📊 Found ${allPosts.length} blog posts to delete\n`)

    if (allPosts.length === 0) {
      console.log('✅ No blog posts found - CMS is already clean!')
      return
    }

    // Delete each post
    const deletePromises = allPosts.map(async (post, index) => {
      try {
        await client.delete(post._id)
        console.log(`✅ ${index + 1}/${allPosts.length} - Deleted: "${post.title}"`)
      } catch (error) {
        console.error(`❌ Failed to delete "${post.title}":`, error.message)
      }
    })

    // Wait for all deletions to complete
    await Promise.all(deletePromises)

    console.log('\n🎯 DELETION COMPLETE - CMS IS NOW CLEAN')
    console.log('Ready to start fresh blog post migration!')

  } catch (error) {
    console.error('❌ Error during deletion process:', error.message)
  }
}

// Run the deletion
deleteAllBlogPosts()