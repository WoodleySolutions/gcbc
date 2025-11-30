#!/usr/bin/env node

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'

// Load environment variables
dotenv.config()

// Configure client
const client = createClient({
  projectId: '1pod6f3p',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN
})

async function planImageExtraction() {
  console.log('🖼️  PLANNING FEATURED IMAGE EXTRACTION...\n')

  try {
    // Get all article posts that need images
    const articlePosts = await client.fetch(`
      *[_type == "blogPost" && postType == "article"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        featuredImage
      }
    `)

    console.log(`📊 Found ${articlePosts.length} article posts\n`)

    const postsWithoutImages = articlePosts.filter(post => !post.featuredImage)
    const postsWithImages = articlePosts.filter(post => post.featuredImage)

    console.log(`🖼️  ARTICLE IMAGE STATUS:`)
    console.log(`   ✅ Posts with images: ${postsWithImages.length}`)
    console.log(`   ❌ Posts without images: ${postsWithoutImages.length}\n`)

    if (postsWithoutImages.length > 0) {
      console.log(`📋 ARTICLES NEEDING FEATURED IMAGES:`)
      postsWithoutImages.forEach((post, index) => {
        console.log(`   ${index + 1}. "${post.title}"`)
        console.log(`      ID: ${post._id}`)
        console.log(`      Slug: ${post.slug.current}`)
        console.log('')
      })

      console.log(`📝 NEXT STEPS FOR FEATURED IMAGES:`)
      console.log(`   1. Extract images from corresponding PDFs`)
      console.log(`   2. Save images to temporary directory (e.g., /tmp/claude/blog-images)`)
      console.log(`   3. Upload images to Sanity using the client.assets.upload() method`)
      console.log(`   4. Link uploaded images to blog posts by updating featuredImage field`)
      console.log(`   5. Verify images display correctly on the website`)
      console.log('')
      console.log(`📁 PDF LOCATIONS:`)
      console.log(`   Source: C:\\Users\\woodl\\Downloads\\BlogPosts\\`)
      console.log(`   Target: /tmp/claude/blog-images/`)
      console.log('')
      console.log(`🔧 IMPLEMENTATION NOTE:`)
      console.log(`   Featured image extraction from PDFs requires additional`)
      console.log(`   PDF processing libraries. For now, images can be manually`)
      console.log(`   extracted or provided separately for upload.`)
    } else {
      console.log(`✅ All articles already have featured images!`)
    }

  } catch (error) {
    console.error('❌ Error planning image extraction:', error.message)
  }
}

// Run the planning
planImageExtraction()