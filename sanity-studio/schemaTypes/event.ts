import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
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
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Book Club Meeting', value: 'meeting'},
          {title: 'Author Visit', value: 'author-visit'},
          {title: 'Reading Group', value: 'reading-group'},
          {title: 'Book Launch', value: 'book-launch'},
          {title: 'Social Gathering', value: 'social'},
          {title: 'Special Event', value: 'special'},
          {title: 'Online Discussion', value: 'online'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
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
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.min(Rule.valueOfField('startDateTime')).error('End time must be after start time'),
    }),
    defineField({
      name: 'isAllDay',
      title: 'All Day Event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Location Type',
          type: 'string',
          options: {
            list: [
              {title: 'In Person', value: 'in-person'},
              {title: 'Online (Zoom/Teams)', value: 'online'},
              {title: 'Hybrid', value: 'hybrid'},
              {title: 'TBD', value: 'tbd'},
            ],
          },
        },
        {
          name: 'venueName',
          title: 'Venue Name',
          type: 'string',
          description: 'Name of the venue or building',
        },
        {
          name: 'address',
          title: 'Full Address',
          type: 'text',
          rows: 2,
        },
        {
          name: 'room',
          title: 'Room/Suite',
          type: 'string',
        },
        {
          name: 'onlineLink',
          title: 'Online Meeting Link',
          type: 'url',
          description: 'Zoom, Teams, or other online meeting link',
        },
        {
          name: 'parkingInfo',
          title: 'Parking Information',
          type: 'text',
          rows: 2,
        },
        {
          name: 'accessibilityInfo',
          title: 'Accessibility Information',
          type: 'text',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'relatedBook',
      title: 'Related Book',
      type: 'reference',
      to: [{type: 'monthlyBook'}],
      description: 'The book being discussed at this event (if applicable)',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'External registration link (Eventbrite, etc.)',
      hidden: ({document}) => !document?.registrationRequired,
    }),
    defineField({
      name: 'maxAttendees',
      title: 'Maximum Attendees',
      type: 'number',
      description: 'Leave blank for unlimited capacity',
      hidden: ({document}) => !document?.registrationRequired,
    }),
    defineField({
      name: 'cost',
      title: 'Cost',
      type: 'object',
      fields: [
        {
          name: 'isFree',
          title: 'Free Event',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
          hidden: ({parent}) => parent?.isFree,
        },
        {
          name: 'priceNote',
          title: 'Price Note',
          type: 'string',
          description: 'e.g., "Suggested donation", "Members only", etc.',
          hidden: ({parent}) => parent?.isFree,
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'contactName',
          title: 'Contact Person',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Contact Email',
          type: 'email',
        },
        {
          name: 'phone',
          title: 'Contact Phone',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Event Status',
      type: 'string',
      options: {
        list: [
          {title: 'Scheduled', value: 'scheduled'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Postponed', value: 'postponed'},
          {title: 'Completed', value: 'completed'},
        ],
      },
      initialValue: 'scheduled',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags for categorizing and filtering events',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDateTime: 'startDateTime',
      eventType: 'eventType',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, startDateTime, eventType, media} = selection
      const formattedDate = startDateTime
        ? new Date(startDateTime).toLocaleDateString()
        : 'No date'
      return {
        title: title,
        subtitle: `${eventType} - ${formattedDate}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, Newest',
      name: 'startDateDesc',
      by: [{field: 'startDateTime', direction: 'desc'}],
    },
    {
      title: 'Start Date, Oldest',
      name: 'startDateAsc',
      by: [{field: 'startDateTime', direction: 'asc'}],
    },
  ],
})