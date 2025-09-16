import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'

// Client configuration (you'll need to add your project details after creating Sanity project)
export const client = createClient({
  projectId: 'your-project-id', // Add your project ID
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: Image) {
  return builder.image(source)
}

// GROQ queries for book club content
export const queries = {
  // Get all books with authors
  books: `*[_type == "book"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    author,
    description,
    coverImage,
    isbn,
    publishedDate,
    rating,
    "currentlyReading": coalesce(currentlyReading, false)
  }`,
  
  // Get all blog posts
  blogPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    coverImage,
    content
  }`,
  
  // Get featured content
  featured: `*[_type == "book" && featured == true] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    author,
    coverImage,
    description
  }`,
  
  // Get current book of the month
  bookOfMonth: `*[_type == "book" && bookOfTheMonth == true] [0] {
    _id,
    title,
    slug,
    author,
    coverImage,
    description,
    discussionDate
  }`
}