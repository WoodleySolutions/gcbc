import { client } from '../lib/sanity';

export async function GET() {
  try {
    // Fetch all blog posts with relevant searchable content
    const blogPosts = await client.fetch(`
      *[_type == "blogPost"] {
        _id,
        title,
        slug,
        excerpt,
        author,
        publishedAt,
        categories,
        tags,
        postType,
        "content": pt::text(content)
      } | order(publishedAt desc)
    `);

    // Fetch all books with study guide content
    const books = await client.fetch(`
      *[_type == "monthlyBook"] {
        _id,
        title,
        author,
        slug,
        theme,
        description,
        month,
        year,
        discussionQuestions,
        studyGuideTitle,
        "studyGuideContent": pt::text(studyGuideContent)
      } | order(year desc, month desc)
    `);

    // Transform blog posts for search
    const blogSearchData = blogPosts.map((post: any) => ({
      id: post._id,
      type: 'blog-post',
      title: post.title,
      author: post.author || 'Great Catholic Book Club',
      excerpt: post.excerpt || '',
      content: post.content || '',
      url: `/blog/${post.slug.current}`,
      publishedAt: post.publishedAt,
      categories: post.categories || [],
      tags: post.tags || [],
      postType: post.postType || 'article',
      // Combined searchable text
      searchText: `${post.title} ${post.excerpt || ''} ${post.content || ''} ${post.tags?.join(' ') || ''}`
    }));

    // Transform books for search
    const bookSearchData = books.map((book: any) => ({
      id: book._id,
      type: 'book',
      title: book.title,
      author: book.author,
      theme: book.theme || '',
      description: book.description || '',
      studyGuideTitle: book.studyGuideTitle || '',
      studyGuideContent: book.studyGuideContent || '',
      discussionQuestions: book.discussionQuestions || [],
      url: `/books/${book.slug.current}`,
      month: book.month,
      year: book.year,
      // Combined searchable text
      searchText: `${book.title} ${book.author} ${book.theme || ''} ${book.description || ''} ${book.studyGuideTitle || ''} ${book.studyGuideContent || ''} ${book.discussionQuestions?.join(' ') || ''}`
    }));

    // Combine all searchable content
    const searchData = [...blogSearchData, ...bookSearchData];

    return new Response(JSON.stringify(searchData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache for 1 hour (will be updated on rebuild)
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error building search data:', error);
    return new Response(JSON.stringify({ error: 'Failed to build search data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
