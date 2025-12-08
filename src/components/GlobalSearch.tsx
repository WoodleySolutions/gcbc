import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';

interface SearchResult {
  id: string;
  type: 'blog-post' | 'book';
  title: string;
  author?: string;
  excerpt?: string;
  theme?: string;
  description?: string;
  studyGuideTitle?: string;
  url: string;
  publishedAt?: string;
  month?: string;
  year?: number;
  postType?: string;
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'blog-post' | 'book'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize Fuse.js instance
  const fuseRef = useRef<Fuse<SearchResult> | null>(null);

  // Load search data on component mount
  useEffect(() => {
    const loadSearchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/search-data.json');
        const data = await response.json();
        setSearchData(data);

        // Initialize Fuse.js
        fuseRef.current = new Fuse(data, {
          keys: [
            { name: 'title', weight: 3 },
            { name: 'author', weight: 2 },
            { name: 'theme', weight: 2 },
            { name: 'studyGuideTitle', weight: 1.5 },
            { name: 'studyGuideContent', weight: 1 },
            { name: 'excerpt', weight: 1 },
            { name: 'description', weight: 1 },
            { name: 'searchText', weight: 0.5 }
          ],
          threshold: 0.3,
          ignoreLocation: true,
          minMatchCharLength: 2,
          includeScore: true
        });
      } catch (error) {
        console.error('Failed to load search data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSearchData();
  }, []);

  // Perform search
  useEffect(() => {
    if (!fuseRef.current || !query || query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = fuseRef.current.search(query);

    // Filter by type if needed
    const filteredResults = filter === 'all'
      ? searchResults
      : searchResults.filter(r => r.item.type === filter);

    setResults(filteredResults.slice(0, 10)); // Limit to top 10 results
  }, [query, filter]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const highlightMatch = (text: string, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 text-champaign-200 hover:text-champaign-100 transition-colors border border-champaign-700/30 rounded-md hover:border-champaign-500/50"
        aria-label="Search site"
        title="Search (Ctrl+K)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            ref={modalRef}
            className="relative bg-black-olive border border-champaign-700/50 rounded-lg shadow-2xl w-full max-w-2xl"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-champaign-700/30">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-champaign-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search blog posts, books, and study guides..."
                  className="flex-1 bg-transparent text-champaign-100 placeholder-champaign-400 outline-none text-lg"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(''); setResults([]); }}
                    className="text-champaign-400 hover:text-champaign-200"
                    aria-label="Clear search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filter === 'all'
                      ? 'bg-rust-800 text-champaign-100'
                      : 'bg-black-olive border border-champaign-700/30 text-champaign-300 hover:text-champaign-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('blog-post')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filter === 'blog-post'
                      ? 'bg-rust-800 text-champaign-100'
                      : 'bg-black-olive border border-champaign-700/30 text-champaign-300 hover:text-champaign-100'
                  }`}
                >
                  📄 Blog Posts
                </button>
                <button
                  onClick={() => setFilter('book')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filter === 'book'
                      ? 'bg-rust-800 text-champaign-100'
                      : 'bg-black-olive border border-champaign-700/30 text-champaign-300 hover:text-champaign-100'
                  }`}
                >
                  📚 Books
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-champaign-300">
                  Loading search data...
                </div>
              ) : query.length < 2 ? (
                <div className="p-8 text-center text-champaign-300">
                  <p className="mb-2">Start typing to search...</p>
                  <p className="text-sm text-champaign-400">
                    Search across {searchData.filter(d => d.type === 'blog-post').length} blog posts
                    and {searchData.filter(d => d.type === 'book').length} books
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-champaign-300">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="divide-y divide-champaign-700/30">
                  {results.map((result) => {
                    const item = result.item;
                    return (
                      <a
                        key={item.id}
                        href={item.url}
                        className="block p-4 hover:bg-rust-800/20 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1">
                            {item.type === 'book' ? (
                              <span className="text-2xl">📚</span>
                            ) : item.postType === 'video' ? (
                              <span className="text-2xl">🎥</span>
                            ) : (
                              <span className="text-2xl">📄</span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Type Badge */}
                            <span className={`inline-block px-2 py-0.5 text-xs rounded-full mb-1 ${
                              item.type === 'book'
                                ? 'bg-rust-800/50 text-rust-200'
                                : 'bg-champaign-700/30 text-champaign-300'
                            }`}>
                              {item.type === 'book' ? 'Book' : 'Blog Post'}
                            </span>

                            {/* Title */}
                            <h3 className="text-champaign-100 font-semibold mb-1 line-clamp-1">
                              {item.title}
                            </h3>

                            {/* Metadata */}
                            <p className="text-champaign-400 text-sm mb-1">
                              {item.type === 'book' ? (
                                <>
                                  by {item.author}
                                  {item.theme && ` • ${item.theme}`}
                                  {item.month && ` • ${item.month} ${item.year}`}
                                </>
                              ) : (
                                <>
                                  by {item.author}
                                  {item.publishedAt && ` • ${formatDate(item.publishedAt)}`}
                                </>
                              )}
                            </p>

                            {/* Excerpt/Description */}
                            <p className="text-champaign-300 text-sm line-clamp-2">
                              {item.type === 'book'
                                ? highlightMatch(item.studyGuideTitle || item.description || item.theme || '')
                                : highlightMatch(item.excerpt || '')}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="p-3 border-t border-champaign-700/30 text-xs text-champaign-400 text-center">
                Showing {results.length} result{results.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
