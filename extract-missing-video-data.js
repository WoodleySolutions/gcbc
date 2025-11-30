import fs from 'fs';

const CSV_PATH = 'C:/Users/woodl/Downloads/Youtubedata/videos.csv';

const MISSING_VIDEO_IDS = [
  'R4jH8nV5Pw9', // Hitchhiker's Guide
  'J6xR5nM2Kp8', // Conversion Story Part 1
  'P9nF6tH8Rv3', // Reading Scripture Daily
  'S8pT5qK9Vw2', // Masculine Art of Listening
  'U9rW6mN8Zy5', // Jason Bourne Covenant
];

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const videos = [];

  for (let i = 1; i < lines.length; i++) {
    // Handle CSV parsing with quotes and commas in descriptions
    const line = lines[i];
    if (!line.trim()) continue;

    const values = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue);

    if (values.length >= headers.length) {
      const video = {};
      headers.forEach((header, index) => {
        video[header.trim()] = values[index] ? values[index].trim() : '';
      });
      videos.push(video);
    }
  }

  return videos;
}

function extractMissingVideoData() {
  console.log('📺 EXTRACTING DATA FOR MISSING VIDEOS\n');

  try {
    const csvText = fs.readFileSync(CSV_PATH, 'utf-8');
    const videos = parseCSV(csvText);

    console.log(`Found ${videos.length} total videos in CSV\n`);

    const missingVideos = videos.filter(v => MISSING_VIDEO_IDS.includes(v['Video ID']));

    console.log(`Found ${missingVideos.length} of ${MISSING_VIDEO_IDS.length} missing videos\n`);
    console.log('='  .repeat(80) + '\n');

    missingVideos.forEach((video, index) => {
      console.log(`${index + 1}. VIDEO ID: ${video['Video ID']}`);
      console.log(`   TITLE: ${video['Video Title (Original)']}`);
      console.log(`   PUBLISHED: ${video['Video Publish Timestamp']}`);
      console.log(`   DURATION: ${video['Approx Duration (ms)']}ms`);
      console.log(`   DESCRIPTION:`);
      console.log(`   ${video['Video Description (Original)'].substring(0, 500)}...`);
      console.log('\n' + '='  .repeat(80) + '\n');
    });

    // Output as JSON for script use
    const outputData = missingVideos.map(v => ({
      videoId: v['Video ID'],
      title: v['Video Title (Original)'],
      description: v['Video Description (Original)'],
      publishedAt: v['Video Publish Timestamp'],
      duration: v['Approx Duration (ms)'],
    }));

    fs.writeFileSync(
      'missing-videos-data.json',
      JSON.stringify(outputData, null, 2)
    );

    console.log('✅ Data exported to missing-videos-data.json');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

extractMissingVideoData();
