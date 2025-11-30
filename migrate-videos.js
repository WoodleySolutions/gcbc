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

// Video posts based on our corrected inventory
const VIDEO_POSTS = [
  {
    title: "Jane Austen, Pride and Prejudice vs The New York Times: A Catholic perspective on 'mankeeping'",
    videoId: "fPTIrcG9jb8",
    author: "Sadie Woodley",
    publishedAt: "2024-09-17",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "A Catholic analysis of Pride and Prejudice compared to modern dating advice from The New York Times."
  },
  {
    title: "The Bourne Identity: Genesis, Original Sin, and the Christian Love Story",
    videoId: "ctXFgSrebh4",
    author: "Sadie Woodley",
    publishedAt: "2024-08-25",
    categories: ["video-content", "book-discussions", "faith-literature"],
    excerpt: "Exploring themes of identity, redemption, and love in Robert Ludlum's thriller through a Catholic lens."
  },
  {
    title: "My Catholic Conversion Story, Part 2: Learning to Read the Bible",
    videoId: "gsizo2pvcxs",
    author: "Sadie Woodley",
    publishedAt: "2024-08-19",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Continuing the conversion story with insights on approaching Scripture with Catholic understanding."
  },
  {
    title: "Woman Plans to Divorce and Leave Her 'Perfect Husband': A Catholic Perspective",
    videoId: "2qfhl36VipM",
    author: "Sadie Woodley",
    publishedAt: "2024-08-02",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Catholic wisdom on marriage, commitment, and finding fulfillment in sacramental union."
  },
  {
    title: "Faith Meets Psychohistory: Unpacking Foundation's Origin Question",
    videoId: "2ARB7goUWyo",
    author: "Tyler Woodley",
    publishedAt: "2024-07-28",
    categories: ["video-content", "book-discussions", "faith-literature"],
    excerpt: "Isaac Asimov's Foundation series examined through the lens of Catholic philosophy and theology."
  },
  {
    title: "Good Kid m.A.A.d Catholic: A Journey Through Faith and Hip-Hop",
    videoId: "sJkrtyNsdYE",
    author: "Sadie Woodley",
    publishedAt: "2024-07-15",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Exploring Kendrick Lamar's masterpiece album through Catholic understanding of redemption and grace."
  },
  {
    title: "The Miseducation of Lauryn Hill: Pro Life and Catholic Themes in Hip Hop",
    videoId: "KpL8Tf2HZBE",
    author: "Sadie Woodley",
    publishedAt: "2024-06-28",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Finding pro-life and Catholic themes in Lauryn Hill's influential album and message."
  },
  {
    title: "Brave New World: Marriage and Family vs The World",
    videoId: "Xm9tgJ5Lr2Y",
    author: "Sadie Woodley",
    publishedAt: "2024-05-25",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Huxley's dystopian vision contrasted with Catholic teaching on marriage and family life."
  },
  {
    title: "Pride and Prejudice: A Catholic Take on Virtue and the Sacrament of Marriage",
    videoId: "P8vQz7yHfAc",
    author: "Sadie Woodley",
    publishedAt: "2024-04-28",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Jane Austen's beloved novel examined through Catholic understanding of virtue and sacramental marriage."
  },
  {
    title: "Ender's Game: Introduction to Moral Reasoning and Catholic Ethics",
    videoId: "M7Nq8xP2Kd1",
    author: "Sadie Woodley",
    publishedAt: "2024-02-24",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Orson Scott Card's science fiction classic as a framework for understanding Catholic moral theology."
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy: Family and the Purpose of Creation",
    videoId: "R4jH8nV5Pw9",
    author: "Sadie Woodley",
    publishedAt: "2024-01-27",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Finding deeper meaning in Douglas Adams' satirical masterpiece about life, the universe, and everything."
  },
  {
    title: "2025 Book List Reveal: Every Book is Catholic Reading Challenge",
    videoId: "ysInxBrYBQ4",
    author: "Sadie Woodley",
    publishedAt: "2024-01-01",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Introducing our 2025 reading challenge and how every great book can be read through Catholic eyes."
  },
  {
    title: "Watchmen: A Catholic Analysis of Power, Morality, and Justice",
    videoId: "Hq3N7vK8Gt5",
    author: "Sadie Woodley",
    publishedAt: "2024-12-15",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Alan Moore's complex graphic novel examined through Catholic moral theology and social teaching."
  },
  {
    title: "The Theology of The Office: Natural Reason and Divine Revelation",
    videoId: "Bx7K2mP9Nt8",
    author: "Sadie Woodley",
    publishedAt: "2024-11-30",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Finding theological insights and human wisdom in the beloved workplace comedy series."
  },
  {
    title: "Bob's Burgers and the Sacrament of Marriage: A Catholic Family Study",
    videoId: "F5jL9pH3Qr2",
    author: "Sadie Woodley",
    publishedAt: "2024-11-15",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "The Belcher family as a model for Catholic understanding of marriage and family life."
  },
  {
    title: "Jurassic Park - Natural Law and the Limits of Power",
    videoId: "2jre9uw48Bs",
    author: "Tyler Woodley",
    publishedAt: "2024-10-31",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Michael Crichton's cautionary tale examined through Catholic social teaching and natural law."
  },
  {
    title: "The Bright Side of Blasphemy: Sanctifying Art Through Catholic Eyes",
    videoId: "IThmdfuyBec",
    author: "Sadie Woodley",
    publishedAt: "2024-10-15",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "How Catholics can approach challenging art and literature with grace and discernment."
  },
  {
    title: "My Catholic Conversion Story: From Islam to Catholicism",
    videoId: "J6xR5nM2Kp8",
    author: "Sadie Woodley",
    publishedAt: "2024-09-30",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "A personal testimony of faith journey from Islam to the Catholic Church."
  },
  {
    title: "JRR Tolkien: Catholic Imagination and the Lord of the Rings",
    videoId: "N4wT7jL5Qm9",
    author: "Sadie Woodley",
    publishedAt: "2024-09-15",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "How Tolkien's Catholic faith shaped Middle-earth and influenced fantasy literature."
  },
  {
    title: "Reading Scripture Daily: A Catholic Approach to Biblical Spirituality",
    videoId: "P9nF6tH8Rv3",
    author: "Sadie Woodley",
    publishedAt: "2024-08-31",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "Practical guidance for incorporating daily Scripture reading into Catholic spiritual life."
  },
  {
    title: "Flannery O'Connor and the Catholic Imagination",
    videoId: "Q7mR4nJ2Sx6",
    author: "Sadie Woodley",
    publishedAt: "2024-08-15",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "The Southern Gothic master's stories illuminated by her profound Catholic faith."
  },
  {
    title: "The Masculine Art of Listening: Lessons from Pride and Prejudice",
    videoId: "S8pT5qK9Vw2",
    author: "Tyler Woodley",
    publishedAt: "2024-07-31",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "What Jane Austen can teach Catholic men about listening, humility, and authentic masculinity."
  },
  {
    title: "Jason Bourne and the Covenant of Presence: Catholic Marriage Theology",
    videoId: "U9rW6mN8Zy5",
    author: "Sadie Woodley",
    publishedAt: "2024-07-15",
    categories: ["video-content", "faith-literature", "book-discussions"],
    excerpt: "The Bourne series as a framework for understanding Catholic theology of marriage and presence."
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

async function migrateVideos() {
  console.log('🎥 MIGRATING VIDEO POSTS...\n')

  try {
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < VIDEO_POSTS.length; i++) {
      const video = VIDEO_POSTS[i]
      console.log(`📺 Processing ${i + 1}/${VIDEO_POSTS.length}: "${video.title}"`)

      try {
        // Create blog post document
        const blogPost = {
          _type: 'blogPost',
          title: video.title,
          slug: {
            current: generateSlug(video.title)
          },
          author: video.author,
          publishedAt: new Date(video.publishedAt).toISOString(),
          postType: 'video',
          excerpt: video.excerpt,
          youtubeVideo: {
            url: `https://www.youtube.com/watch?v=${video.videoId}`,
            videoId: video.videoId
          },
          categories: video.categories,
          featured: false
        }

        // Create the blog post
        const result = await client.create(blogPost)
        console.log(`   ✅ Created: ${result._id}`)
        successCount++

      } catch (error) {
        console.error(`   ❌ Error processing "${video.title}":`, error.message)
        errorCount++
      }
    }

    console.log(`\n📊 VIDEO MIGRATION SUMMARY:`)
    console.log(`   ✅ Successful: ${successCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log(`   🎥 Total videos processed: ${VIDEO_POSTS.length}`)

    if (errorCount === 0) {
      console.log(`\n🎯 ALL VIDEOS MIGRATED SUCCESSFULLY!`)
      console.log(`\n📋 FINAL MIGRATION STATUS:`)
      console.log(`   📝 Articles: 12`)
      console.log(`   🎥 Videos: ${VIDEO_POSTS.length}`)
      console.log(`   📊 Total blog posts: ${12 + VIDEO_POSTS.length}`)
    }

  } catch (error) {
    console.error('❌ Error during video migration:', error.message)
  }
}

// Run the migration
migrateVideos()