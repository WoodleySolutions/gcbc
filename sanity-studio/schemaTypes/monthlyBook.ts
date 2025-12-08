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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
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
      name: 'month',
      title: 'Month',
      type: 'string',
      options: {
        list: [
          {title: 'January', value: 'january'},
          {title: 'February', value: 'february'},
          {title: 'March', value: 'march'},
          {title: 'April', value: 'april'},
          {title: 'May', value: 'may'},
          {title: 'June', value: 'june'},
          {title: 'July', value: 'july'},
          {title: 'August', value: 'august'},
          {title: 'September', value: 'september'},
          {title: 'October', value: 'october'},
          {title: 'November', value: 'november'},
          {title: 'December', value: 'december'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2020).max(2030),
    }),
    defineField({
      name: 'theme',
      title: 'Monthly Theme',
      type: 'string',
      description: 'The theme or focus for this month (e.g., "Saints and Martyrs", "Advent Preparation")',
    }),
    defineField({
      name: 'coverImage',
      title: 'Book Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Book Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of the book and why it was chosen for this month',
    }),
    defineField({
      name: 'amazonLink',
      title: 'Amazon Purchase Link',
      type: 'url',
      description: 'Direct link to purchase the book on Amazon',
    }),
    defineField({
      name: 'meetingDate',
      title: 'Meeting Date',
      type: 'datetime',
      description: 'Date and time of the book club meeting for this book',
    }),
    defineField({
      name: 'discussionQuestions',
      title: 'Discussion Questions',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Questions from the GCBC Study Guide to give visitors an idea of how discussions work',
    }),
    defineField({
      name: 'studyGuideTitle',
      title: 'Study Guide Title',
      type: 'string',
      description: 'The title/heading for the study guide article (e.g., "Life, the Universe, and Everything")',
    }),
    defineField({
      name: 'studyGuideContent',
      title: 'Study Guide Article',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Full study guide article content for this book (from the annual study guide PDF)',
    }),
    defineField({
      name: 'isCurrentBook',
      title: 'Is Current Month\'s Book?',
      type: 'boolean',
      description: 'Mark as true for the current month\'s featured book',
      initialValue: false,
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
      author: 'author',
      month: 'month',
      year: 'year',
      media: 'coverImage',
    },
    prepare(selection) {
      const {title, author, month, year, media} = selection
      return {
        title: title,
        subtitle: `${author} - ${month} ${year}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Year, Month',
      name: 'yearMonth',
      by: [
        {field: 'year', direction: 'desc'},
        {field: 'month', direction: 'desc'},
      ],
    },
  ],
})