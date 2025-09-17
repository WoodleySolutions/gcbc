# Sanity CMS Setup for Great Catholic Book Club

This guide will walk you through setting up Sanity CMS to manage content for the Great Catholic Book Club website. The Astro project already has Sanity client dependencies installed.

## 🚀 Quick Start Overview

1. **Create Sanity Project** - Set up your Sanity.io account and project
2. **Install Sanity Studio** - Set up the content management interface
3. **Configure Schemas** - Define content types (books, blog posts, events)
4. **Connect to Astro** - Integrate Sanity with your existing Astro site
5. **Migrate Content** - Move existing content from static files to Sanity

## Step 1: Create Sanity Account & Project

### 1.1 Create Account
1. Go to [https://sanity.io](https://sanity.io) and create a free account
2. Choose the "Community" plan (free tier is perfect for your needs)

### 1.2 Initialize Sanity Project
Run this command in your project root:

```bash
cd great-catholic-book-club
npx @sanity/cli@latest init
```

When prompted:
- **Project name**: `great-catholic-book-club`
- **Use TypeScript**: `Yes`
- **Dataset name**: `production`
- **Output path**: `sanity-studio` (creates a separate folder)
- **Template**: Choose "Clean project with no predefined schemas"

This will create a `sanity-studio` folder alongside your `src` directory.

## Step 2: Content Schema Design

Based on your current website structure, we need these content types:

### 📚 Monthly Book Schema
```typescript
// For your 2025 reading schedule
{
  name: 'monthlyBook',
  fields: [
    'title',           // "Dune"
    'author',          // "Frank Herbert"
    'month',           // "September"
    'discussionDate',  // "September 29th"
    'theme',           // "Free Will and Prophecy"
    'coverImage',      // Book cover from your 2025BookImages
    'amazonLink',      // Affiliate link
    'description',     // Book description for discussions
    'studyGuideNotes', // Notes for the study guide
    'isCurrent'        // Boolean to mark current book
  ]
}
```

### 📝 Blog Post Schema
```typescript
{
  name: 'blogPost',
  fields: [
    'title',
    'slug',
    'excerpt',
    'content',          // Rich text editor
    'publishedAt',
    'author',
    'featuredImage',
    'categories',       // ["Faith", "Literature", "Book Reviews"]
    'relatedBooks'      // Reference to monthlyBook documents
  ]
}
```

### 📅 Event Schema
```typescript
{
  name: 'event',
  fields: [
    'title',
    'description',
    'eventDate',
    'eventTime',
    'timezone',         // "CST"
    'eventType',        // "Online Meeting", "In-Person", "Movie Night"
    'relatedBook',      // Reference to monthlyBook
    'meetingLink',      // Zoom/video conference link
    'location',         // For in-person events
    'registrationRequired'
  ]
}
```

### 👥 Site Settings Schema
```typescript
{
  name: 'siteSettings',
  fields: [
    'currentBook',      // Reference to current monthlyBook
    'nextMeetingDate',
    'announcementBanner', // For site-wide announcements
    'socialLinks',
    'contactEmail'
  ]
}
```

## Step 3: Set Up Sanity Studio

### 3.1 Navigate to Studio Folder
```bash
cd sanity-studio
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Create Schema Files
Create these files in `sanity-studio/schemas/`:

**monthlyBook.ts**:
```typescript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'monthlyBook',
  title: 'Monthly Book',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Book Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
      options: {
        list: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
      }
    }),
    defineField({
      name: 'discussionDate',
      title: 'Discussion Date',
      type: 'string',
      description: 'e.g., "September 29th"'
    }),
    defineField({
      name: 'theme',
      title: 'Catholic Theme',
      type: 'string',
      description: 'e.g., "Free Will and Prophecy"'
    }),
    defineField({
      name: 'coverImage',
      title: 'Book Cover',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'amazonLink',
      title: 'Amazon Affiliate Link',
      type: 'url'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'isCurrent',
      title: 'Currently Reading',
      type: 'boolean',
      initialValue: false
    })
  ]
})
```

### 3.4 Update Schema Index
Edit `sanity-studio/schemas/index.ts`:
```typescript
import monthlyBook from './monthlyBook'
import blogPost from './blogPost'
import event from './event'
import siteSettings from './siteSettings'

export const schemaTypes = [monthlyBook, blogPost, event, siteSettings]
```

### 3.5 Start Studio Locally
```bash
npm run dev
```

This opens Sanity Studio at `http://localhost:3333`

## Step 4: Configure Astro Integration

### 4.1 Create Sanity Configuration
Create `src/lib/sanity.ts`:

```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'YOUR_PROJECT_ID', // Get this from sanity.io
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-12-12'
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch current book
export async function getCurrentBook() {
  return await client.fetch(`
    *[_type == "monthlyBook" && isCurrent == true][0] {
      title,
      author,
      month,
      discussionDate,
      theme,
      coverImage,
      amazonLink
    }
  `)
}

// Fetch all books for the year
export async function getAllBooks() {
  return await client.fetch(`
    *[_type == "monthlyBook"] | order(month asc) {
      title,
      author,
      month,
      discussionDate,
      theme,
      coverImage,
      amazonLink,
      isCurrent
    }
  `)
}

// Fetch blog posts
export async function getBlogPosts() {
  return await client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage,
      categories
    }
  `)
}
```

### 4.2 Environment Variables
Create `.env.local`:
```
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
```

Update `src/lib/sanity.ts` to use environment variables:
```typescript
export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-12-12'
})
```

## Step 5: Deploy Sanity Studio

### 5.1 Deploy to Sanity's Hosting
```bash
cd sanity-studio
npm run deploy
```

This creates a hosted studio at `https://your-project-id.sanity.studio`

### 5.2 Set Studio URL in Project Settings
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to Settings → Studio
4. Add your studio URL

## Step 6: Update Astro Pages to Use Sanity

### 6.1 Update Books Page
Modify `src/pages/books.astro` to fetch from Sanity instead of using the hardcoded data:

```astro
---
import Layout from '../layouts/Layout.astro';
import { getAllBooks } from '../lib/sanity';

const books = await getAllBooks();
const currentEvent = books.find(book => book.isCurrent);
---
```

### 6.2 Update Current Event System
Replace `src/lib/currentEvent.ts` with Sanity data:

```typescript
import { getCurrentBook } from './sanity';

export async function getCurrentEventText() {
  const currentBook = await getCurrentBook();

  if (!currentBook) {
    return {
      joinPrompt: "Join the Book Club to get the 2025 Study Guide",
      scheduleText: "Monthly meetings held on the last Monday of each month",
      joinNowText: "You can join anytime during the year!"
    };
  }

  return {
    joinPrompt: `Join the Book Club to get the 2025 Study Guide to participate in monthly online group discussions`,
    scheduleText: `The next online meeting to discuss ${currentBook.title} will be held on ${currentBook.discussionDate} at 7pm CST.`,
    joinNowText: "You can join anytime during the year, starting now!"
  };
}
```

## Step 7: Content Migration

### 7.1 Migrate Current Books
1. Access your Sanity Studio
2. Create "Monthly Book" documents for each book in your 2025 list
3. Upload the cover images from `public/images/2025BookImages/`
4. Set the current book's `isCurrent` field to `true`

### 7.2 Create Initial Content
1. **Site Settings**: Create a single "Site Settings" document
2. **Events**: Add your upcoming book discussions
3. **Blog Posts**: Start with placeholder posts or migrate existing content

## 🎯 Next Steps After Setup

1. **Test Integration**: Verify your Astro pages display Sanity content
2. **Content Preview**: Set up preview mode for draft content
3. **Webhooks**: Configure automatic rebuilds when content changes
4. **Access Control**: Set up user permissions for content editors

## 🔧 Troubleshooting

### Common Issues:
- **CORS Errors**: Add your domain to Sanity project settings
- **Build Failures**: Check environment variables are set
- **Image Loading**: Verify image URLs use the `urlFor()` helper

### Getting Your Project ID:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy the Project ID from the project overview

---

**Ready to start?** Run the first command and I'll walk you through each step! 🚀