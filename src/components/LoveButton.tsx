import { useState, useEffect } from 'react';

interface LoveButtonProps {
  postId: string;
  postTitle: string;
}

export default function LoveButton({ postId, postTitle }: LoveButtonProps) {
  const [hasLoved, setHasLoved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if user has already loved this post
  useEffect(() => {
    const lovedPosts = localStorage.getItem('lovedPosts');
    if (lovedPosts) {
      const loved = JSON.parse(lovedPosts);
      setHasLoved(loved.includes(postId));
    }
  }, [postId]);

  const handleLove = () => {
    if (hasLoved) return; // Already loved, do nothing

    // Mark as loved
    setHasLoved(true);
    setIsAnimating(true);

    // Save to localStorage
    const lovedPosts = localStorage.getItem('lovedPosts');
    const loved = lovedPosts ? JSON.parse(lovedPosts) : [];
    loved.push(postId);
    localStorage.setItem('lovedPosts', JSON.stringify(loved));

    // Track in Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'love_post', {
        event_category: 'engagement',
        event_label: postTitle,
        post_id: postId,
      });
    }

    // Reset animation after 600ms
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="flex items-center justify-center py-8">
      <button
        onClick={handleLove}
        disabled={hasLoved}
        className={`
          group flex items-center gap-3 px-6 py-3 rounded-lg
          transition-all duration-300 ease-out
          ${hasLoved
            ? 'bg-rust-800/20 cursor-default'
            : 'bg-black-olive border border-champaign-700/30 hover:border-rust-400/50 hover:bg-rust-800/10 cursor-pointer'
          }
          ${isAnimating ? 'scale-110' : 'scale-100'}
        `}
        aria-label={hasLoved ? 'You loved this post' : 'Love this post'}
      >
        {/* Heart Icon */}
        <svg
          className={`
            w-6 h-6 transition-all duration-300
            ${hasLoved
              ? 'text-rust-400 fill-rust-400'
              : 'text-champaign-300 fill-none group-hover:text-rust-400 group-hover:scale-110'
            }
            ${isAnimating ? 'animate-bounce' : ''}
          `}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>

        {/* Text */}
        <span
          className={`
            text-sm font-medium transition-colors duration-300
            ${hasLoved
              ? 'text-rust-400'
              : 'text-champaign-200 group-hover:text-rust-400'
            }
          `}
        >
          {hasLoved ? 'You loved this!' : 'Love this post'}
        </span>
      </button>

      {/* Helper text */}
      {!hasLoved && (
        <style jsx>{`
          @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1); }
            75% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (command: string, eventName: string, params: any) => void;
  }
}
