#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const CSV_PATH = 'C:\\Users\\woodl\\Downloads\\Youtubedata\\videos.csv'

function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim())
  const headers = lines[0].split(',')
  const videos = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    if (values.length >= headers.length) {
      const video = {}
      headers.forEach((header, index) => {
        video[header.trim()] = values[index] ? values[index].trim() : ''
      })
      videos.push(video)
    }
  }

  return videos
}

function analyzeYouTubeVideos() {
  console.log('📺 ANALYZING YOUTUBE CSV DATA...\n')

  try {
    const csvText = fs.readFileSync(CSV_PATH, 'utf-8')
    const videos = parseCSV(csvText)

    console.log(`📊 Found ${videos.length} total videos in CSV\n`)

    // Show sample video data structure
    console.log('📋 CSV HEADERS:')
    if (videos.length > 0) {
      Object.keys(videos[0]).forEach((key, index) => {
        console.log(`   ${index + 1}. ${key}`)
      })
    }

    console.log('\n🎥 RECENT VIDEOS (First 10):')
    videos.slice(0, 10).forEach((video, index) => {
      const title = video['Video Title (Original)'] || 'No Title'
      const videoId = video['Video ID'] || 'No ID'
      const publishDate = video['Video Publish Timestamp'] || 'No Date'
      console.log(`   ${index + 1}. "${title}" - ${videoId} - ${publishDate}`)
    })

    // Find the specific video we need to correct
    const jurassicVideo = videos.find(v =>
      v['Video Title (Original)'] &&
      v['Video Title (Original)'].toLowerCase().includes('jurassic')
    )

    if (jurassicVideo) {
      console.log('\n🦕 JURASSIC PARK VIDEO FOUND:')
      console.log(`   Title: "${jurassicVideo['Video Title (Original)']}"`)
      console.log(`   Video ID: ${jurassicVideo['Video ID']}`)
      console.log(`   Publish Date: ${jurassicVideo['Video Publish Timestamp']}`)
    }

    // Look for any video we might be missing
    console.log('\n🔍 SEARCHING FOR POTENTIAL 24TH VIDEO...')
    console.log('Looking for videos published recently that might complete our set of 24...')

    const recentVideos = videos
      .filter(v => v['Video Publish Timestamp'] && v['Video Title (Original)'])
      .sort((a, b) => new Date(b['Video Publish Timestamp']) - new Date(a['Video Publish Timestamp']))
      .slice(0, 25) // Get top 25 most recent

    console.log('\n📅 TOP 25 MOST RECENT VIDEOS:')
    recentVideos.forEach((video, index) => {
      const title = video['Video Title (Original)']
      const videoId = video['Video ID']
      const publishDate = video['Video Publish Timestamp']
      console.log(`   ${index + 1}. "${title}" - ${videoId} - ${publishDate}`)
    })

  } catch (error) {
    console.error('❌ Error analyzing CSV:', error.message)
  }
}

analyzeYouTubeVideos()