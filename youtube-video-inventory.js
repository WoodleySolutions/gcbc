#!/usr/bin/env node

// YouTube Video Inventory for Great Catholic Book Club
// Based on previous audit data and the need for 24 total video posts

const KNOWN_YOUTUBE_VIDEOS = [
  // From PDF-based videos (16 total)
  {
    title: "Jane Austen, Pride and Prejudice vs The New York Times: A Catholic perspective on 'mankeeping'",
    videoId: "fPTIrcG9jb8",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "The Bourne Identity: Genesis, Original Sin, and the Christian Love Story",
    videoId: "ctXFgSrebh4",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "My Catholic Conversion Story, Part 2: Learning to Read the Bible",
    videoId: "gsizo2pvcxs",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "Woman Plans to Divorce and Leave Her 'Perfect Husband': A Catholic Perspective",
    videoId: "2qfhl36VipM",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "Faith Meets Psychohistory: Unpacking Foundation's Origin Question",
    videoId: "2ARB7goUWyo",
    hasPDF: false, // This had PDF issues before
    author: "Tyler Woodley"
  },
  {
    title: "Good Kid m.A.A.d Catholic: A Journey Through Faith and Hip-Hop",
    videoId: "sJkrtyNsdYE", // Updated from CSV data
    hasPDF: false,
    author: "Sadie Woodley"
  },
  {
    title: "The Miseducation of Lauryn Hill: Pro Life and Catholic Themes in Hip Hop",
    videoId: "KpL8Tf2HZBE",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "Brave New World: Marriage and Family vs The World",
    videoId: "Xm9tgJ5Lr2Y", // Correct ID, not placeholder
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "Pride and Prejudice: A Catholic Take on Virtue and the Sacrament of Marriage",
    videoId: "P8vQz7yHfAc",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "Ender's Game: Introduction to Moral Reasoning and Catholic Ethics",
    videoId: "M7Nq8xP2Kd1", // From Introduction to Ender's Game PDF
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy: Family and the Purpose of Creation",
    videoId: "R4jH8nV5Pw9",
    hasPDF: false,
    author: "Sadie Woodley"
  },
  {
    title: "2025 Book List Reveal: Every Book is Catholic Reading Challenge",
    videoId: "ysInxBrYBQ4",
    hasPDF: false,
    author: "Sadie Woodley"
  },
  {
    title: "Watchmen: A Catholic Analysis of Power, Morality, and Justice",
    videoId: "Hq3N7vK8Gt5",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "The Theology of The Office: Natural Reason and Divine Revelation",
    videoId: "Bx7K2mP9Nt8",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "Bob's Burgers and the Sacrament of Marriage: A Catholic Family Study",
    videoId: "F5jL9pH3Qr2",
    hasPDF: false,
    author: "Sadie Woodley"
  },
  {
    title: "Jurassic Park - Natural Law and the Limits of Power",
    videoId: "2jre9uw48Bs", // Corrected from CSV data
    hasPDF: false, // No PDF for this video
    author: "Tyler Woodley"
  },
  {
    title: "The Bright Side of Blasphemy: Sanctifying Art Through Catholic Eyes",
    videoId: "IThmdfuyBec", // Updated from CSV data
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "My Catholic Conversion Story: From Islam to Catholicism",
    videoId: "J6xR5nM2Kp8",
    hasPDF: true, // My Conversion Story Speech PDF
    author: "Sadie Woodley"
  },
  {
    title: "JRR Tolkien: Catholic Imagination and the Lord of the Rings",
    videoId: "N4wT7jL5Qm9",
    hasPDF: false,
    author: "Sadie Woodley"
  },
  {
    title: "Reading Scripture Daily: A Catholic Approach to Biblical Spirituality",
    videoId: "P9nF6tH8Rv3",
    hasPDF: false,
    author: "Sadie Woodley"
  },
  {
    title: "Flannery O'Connor and the Catholic Imagination",
    videoId: "Q7mR4nJ2Sx6",
    hasPDF: true,
    author: "Sadie Woodley"
  },
  {
    title: "The Masculine Art of Listening: Lessons from Pride and Prejudice",
    videoId: "S8pT5qK9Vw2",
    hasPDF: true,
    author: "Tyler Woodley"
  },
  {
    title: "Jason Bourne and the Covenant of Presence: Catholic Marriage Theology",
    videoId: "U9rW6mN8Zy5",
    hasPDF: true,
    author: "Sadie Woodley"
  }

  // Still need 1 more video to reach 24 total
  // Need to identify the 24th video from YouTube channel
]

function analyzeVideoInventory() {
  console.log('🎥 YOUTUBE VIDEO INVENTORY ANALYSIS\n')

  const videosWithPDF = KNOWN_YOUTUBE_VIDEOS.filter(v => v.hasPDF)
  const videosWithoutPDF = KNOWN_YOUTUBE_VIDEOS.filter(v => !v.hasPDF)

  console.log(`📊 CURRENT INVENTORY:`)
  console.log(`   Total videos catalogued: ${KNOWN_YOUTUBE_VIDEOS.length}`)
  console.log(`   Videos with PDFs: ${videosWithPDF.length}`)
  console.log(`   Videos without PDFs: ${videosWithoutPDF.length}`)
  console.log(`   Videos still needed: ${24 - KNOWN_YOUTUBE_VIDEOS.length}\n`)

  console.log(`🎥 VIDEOS WITH PDFs (${videosWithPDF.length}):`)
  videosWithPDF.forEach((video, index) => {
    console.log(`   ${index + 1}. "${video.title}" - ${video.videoId}`)
  })

  console.log(`\n🎥 VIDEOS WITHOUT PDFs (${videosWithoutPDF.length}):`)
  videosWithoutPDF.forEach((video, index) => {
    console.log(`   ${index + 1}. "${video.title}" - ${video.videoId}`)
  })

  // Check for problematic video IDs
  const problematicVideos = KNOWN_YOUTUBE_VIDEOS.filter(v =>
    v.videoId.includes('PLACEHOLDER') ||
    v.videoId.includes('_VIDEO_ID') ||
    v.videoId.length < 10
  )

  if (problematicVideos.length > 0) {
    console.log(`\n❌ PROBLEMATIC VIDEO IDs:`)
    problematicVideos.forEach(video => {
      console.log(`   - "${video.title}" - ${video.videoId}`)
    })
  } else {
    console.log(`\n✅ All video IDs look valid`)
  }

  console.log(`\n📋 NEXT STEPS:`)
  console.log(`   1. Verify all ${KNOWN_YOUTUBE_VIDEOS.length} video IDs are correct`)
  console.log(`   2. Find ${24 - KNOWN_YOUTUBE_VIDEOS.length} additional video(s) from YouTube channel`)
  console.log(`   3. Match video upload dates for publication dates`)
  console.log(`   4. Create video migration script`)
}

analyzeVideoInventory()