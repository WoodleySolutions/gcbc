import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity client configuration
export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '1pod6f3p',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Enable CDN for faster reads
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Type definitions for our content types
export interface MonthlyBook {
  _id: string
  _type: 'monthlyBook'
  title: string
  author: string
  slug: { current: string }
  month: string
  year: number
  theme?: string
  coverImage?: any
  description?: string
  amazonLink?: string
  meetingDate?: string
  discussionQuestions?: string[]
  isCurrentBook?: boolean
  publishedAt: string
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: { current: string }
  author?: string
  excerpt: string
  featuredImage?: any
  content: any[]
  categories?: string[]
  tags?: string[]
  relatedBooks?: MonthlyBook[]
  featured?: boolean
  publishedAt: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Event {
  _id: string
  _type: 'event'
  title: string
  slug: { current: string }
  eventType: string
  description: string
  longDescription?: any[]
  startDateTime: string
  endDateTime?: string
  isAllDay?: boolean
  location?: {
    type: string
    venueName?: string
    address?: string
    room?: string
    onlineLink?: string
    parkingInfo?: string
    accessibilityInfo?: string
  }
  relatedBook?: MonthlyBook
  featuredImage?: any
  registrationRequired?: boolean
  registrationLink?: string
  maxAttendees?: number
  cost?: {
    isFree: boolean
    price?: number
    priceNote?: string
  }
  contactInfo?: {
    contactName?: string
    email?: string
    phone?: string
  }
  status: 'scheduled' | 'cancelled' | 'postponed' | 'completed'
  tags?: string[]
  publishedAt: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  title: string
  description: string
  currentBook?: MonthlyBook
  nextMeeting?: Event
  announcements?: Array<{
    title: string
    message: string
    type: 'info' | 'warning' | 'alert' | 'success'
    active: boolean
    expiresAt?: string
    link?: {
      text: string
      url: string
      external: boolean
    }
  }>
  homepage?: {
    heroTitle?: string
    heroSubtitle?: string
    heroBackgroundImage?: any
    featuredPosts?: BlogPost[]
  }
  contact?: {
    email: string
    phone?: string
    address?: string
    socialMedia?: {
      facebook?: string
      twitter?: string
      instagram?: string
      youtube?: string
      linkedin?: string
    }
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    socialImage?: any
  }
  navigation?: {
    primaryMenu?: Array<{
      title: string
      url: string
      external: boolean
      order: number
    }>
    footerMenu?: Array<{
      title: string
      url: string
      external: boolean
    }>
  }
  updatedAt: string
}

// Query helpers
export const queries = {
  // Get all monthly books ordered by meeting date
  allBooks: `*[_type == "monthlyBook"] | order(meetingDate asc)`,

  // Get current book
  currentBook: `*[_type == "monthlyBook" && isCurrentBook == true][0]`,

  // Get books by year
  booksByYear: (year: number) =>
    `*[_type == "monthlyBook" && year == ${year}] | order(month desc)`,

  // Get single book by slug
  bookBySlug: (slug: string) =>
    `*[_type == "monthlyBook" && slug.current == "${slug}"][0]`,

  // Get all blog posts
  allPosts: `*[_type == "blogPost"] | order(publishedAt desc)`,

  // Get featured blog posts
  featuredPosts: `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author,
    categories
  }`,

  // Get single blog post by slug
  postBySlug: (slug: string) =>
    `*[_type == "blogPost" && slug.current == "${slug}"][0]{
      ...,
      relatedBooks[]->{
        title,
        author,
        slug,
        coverImage
      }
    }`,

  // Get upcoming events
  upcomingEvents: `*[_type == "event" && startDateTime > now() && status == "scheduled"] | order(startDateTime asc)`,

  // Get next meeting
  nextMeeting: `*[_type == "event" && startDateTime > now() && status == "scheduled"] | order(startDateTime asc)[0]`,

  // Get single event by slug
  eventBySlug: (slug: string) =>
    `*[_type == "event" && slug.current == "${slug}"][0]{
      ...,
      relatedBook->{
        title,
        author,
        slug,
        coverImage
      }
    }`,

  // Get site settings
  siteSettings: `*[_type == "siteSettings"][0]{
    ...,
    currentBook->{
      title,
      author,
      slug,
      coverImage,
      month,
      year
    },
    nextMeeting->{
      title,
      slug,
      startDateTime,
      location
    },
    homepage{
      ...,
      featuredPosts[]->{
        title,
        slug,
        excerpt,
        featuredImage,
        publishedAt
      }
    }
  }`,

  // Get active announcements
  activeAnnouncements: `*[_type == "siteSettings"][0].announcements[active == true && (expiresAt == null || expiresAt > now())]`,
}

// Utility functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(queries.siteSettings)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

export async function getCurrentBook(): Promise<MonthlyBook | null> {
  try {
    return await client.fetch(queries.currentBook)
  } catch (error) {
    console.error('Error fetching current book:', error)
    return null
  }
}

export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    return await client.fetch(queries.upcomingEvents)
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(queries.featuredPosts)
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}