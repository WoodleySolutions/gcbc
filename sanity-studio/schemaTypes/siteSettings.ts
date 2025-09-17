import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Great Catholic Book Club',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Used for SEO and social media previews',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currentBook',
      title: 'Current Monthly Book',
      type: 'reference',
      to: [{type: 'monthlyBook'}],
      description: 'The book currently being featured/discussed',
    }),
    defineField({
      name: 'nextMeeting',
      title: 'Next Upcoming Meeting',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'The next scheduled book club meeting or event',
    }),
    defineField({
      name: 'announcements',
      title: 'Site Announcements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Announcement Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'message',
              title: 'Message',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              title: 'Announcement Type',
              type: 'string',
              options: {
                list: [
                  {title: 'General Info', value: 'info'},
                  {title: 'Important Notice', value: 'warning'},
                  {title: 'Urgent Alert', value: 'alert'},
                  {title: 'Good News', value: 'success'},
                ],
              },
              initialValue: 'info',
            },
            {
              name: 'active',
              title: 'Show on Website',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'expiresAt',
              title: 'Expires At',
              type: 'datetime',
              description: 'When this announcement should stop showing (optional)',
            },
            {
              name: 'link',
              title: 'Action Link',
              type: 'object',
              fields: [
                {name: 'text', type: 'string', title: 'Link Text'},
                {name: 'url', type: 'url', title: 'URL'},
                {name: 'external', type: 'boolean', title: 'External Link', initialValue: false},
              ],
              options: {
                collapsible: true,
                collapsed: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
              active: 'active',
            },
            prepare(selection) {
              const {title, type, active} = selection
              return {
                title: title,
                subtitle: `${type} ${active ? '(Active)' : '(Inactive)'}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'homepage',
      title: 'Homepage Settings',
      type: 'object',
      fields: [
        {
          name: 'heroTitle',
          title: 'Hero Section Title',
          type: 'string',
          initialValue: 'Welcome to the Great Catholic Book Club',
        },
        {
          name: 'heroSubtitle',
          title: 'Hero Section Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Deepening our faith through great Catholic literature',
        },
        {
          name: 'heroBackgroundImage',
          title: 'Hero Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'featuredPosts',
          title: 'Featured Blog Posts',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'blogPost'}],
            },
          ],
          validation: (Rule) => Rule.max(3),
          description: 'Up to 3 featured blog posts for homepage',
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Contact Email',
          type: 'email',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'phone',
          title: 'Contact Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Mailing Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'socialMedia',
          title: 'Social Media Links',
          type: 'object',
          fields: [
            {name: 'facebook', type: 'url', title: 'Facebook'},
            {name: 'twitter', type: 'url', title: 'Twitter/X'},
            {name: 'instagram', type: 'url', title: 'Instagram'},
            {name: 'youtube', type: 'url', title: 'YouTube'},
            {name: 'linkedin', type: 'url', title: 'LinkedIn'},
          ],
          options: {
            collapsible: true,
            collapsed: true,
          },
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: 'Used when pages don\'t have their own meta title',
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Site Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'General keywords for the site',
        },
        {
          name: 'socialImage',
          title: 'Default Social Sharing Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Used for social media previews when specific image isn\'t set',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Settings',
      type: 'object',
      fields: [
        {
          name: 'primaryMenu',
          title: 'Primary Navigation Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', type: 'string', title: 'Menu Item Title'},
                {name: 'url', type: 'string', title: 'URL/Path'},
                {name: 'external', type: 'boolean', title: 'External Link', initialValue: false},
                {name: 'order', type: 'number', title: 'Display Order'},
              ],
            },
          ],
        },
        {
          name: 'footerMenu',
          title: 'Footer Navigation Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', type: 'string', title: 'Menu Item Title'},
                {name: 'url', type: 'string', title: 'URL/Path'},
                {name: 'external', type: 'boolean', title: 'External Link', initialValue: false},
              ],
            },
          ],
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updatedAt: 'updatedAt',
    },
    prepare(selection) {
      const {title, updatedAt} = selection
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString()
        : 'Never'
      return {
        title: title || 'Site Settings',
        subtitle: `Last updated: ${formattedDate}`,
      }
    },
  },
})