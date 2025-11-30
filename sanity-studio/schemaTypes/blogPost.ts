import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Great Catholic Book Club',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary that appears in blog listings',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Video Post', value: 'video'},
        ],
      },
      initialValue: 'article',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({document}) => document?.postType === 'video',
    }),
    defineField({
      name: 'youtubeVideo',
      title: 'YouTube Video',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'YouTube URL',
          type: 'url',
          description: 'Full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)',
          validation: (Rule) => Rule.required().custom((url) => {
            if (!url) return true
            const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/
            return youtubeRegex.test(url) || 'Please enter a valid YouTube URL'
          }),
        },
        {
          name: 'videoId',
          title: 'Video ID',
          type: 'string',
          description: 'YouTube video ID (automatically extracted from URL)',
          readOnly: true,
        },
        {
          name: 'thumbnail',
          title: 'Custom Thumbnail',
          type: 'image',
          description: 'Optional custom thumbnail (uses YouTube thumbnail if not provided)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'duration',
          title: 'Video Duration',
          type: 'string',
          description: 'e.g., "15:30" for 15 minutes 30 seconds',
        },
      ],
      hidden: ({document}) => document?.postType !== 'video',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Book Reviews', value: 'book-reviews'},
          {title: 'Reading Tips', value: 'reading-tips'},
          {title: 'Catholic Living', value: 'catholic-living'},
          {title: 'Book Club Updates', value: 'club-updates'},
          {title: 'Author Spotlights', value: 'author-spotlights'},
          {title: 'Discussion Guides', value: 'discussion-guides'},
          {title: 'Faith & Literature', value: 'faith-literature'},
          {title: 'Event Recaps', value: 'event-recaps'},
          {title: 'Video Content', value: 'video-content'},
          {title: 'Book Discussions', value: 'book-discussions'},
          {title: 'Reading Lists', value: 'reading-lists'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords and topics for this post',
    }),
    defineField({
      name: 'relatedBooks',
      title: 'Related Books',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'monthlyBook'}],
        },
      ],
      description: 'Monthly books related to this post',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Override the default title for search engines',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'Description for search engines (max 160 characters)',
          validation: (Rule) => Rule.max(160),
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      publishedAt: 'publishedAt',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, author, publishedAt, media} = selection
      const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : 'No date'
      return {
        title: title,
        subtitle: `${author} - ${formattedDate}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})