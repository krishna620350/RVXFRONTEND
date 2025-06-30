import React from "react";
import DOMPurify from "dompurify";
import CommentPanel from "./Comment/CommentPanel";

export interface Profile {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
  verified?: boolean;
  role?: string;
}

export interface Post {
  id: number;
  author: Profile;
  content: string;
  createdAt: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  readTime?: number;
}

interface PostsProps {
  posts: Post[];
}

// Mock comments for demonstration
const mockComments: { [postId: number]: { id: number; author: string; text: string; createdAt: string }[] } = {
  1: [
    { id: 1, author: "Jane Doe", text: "Great post! Thanks for sharing this insight.", createdAt: "2024-01-15T10:30:00Z" },
    { id: 2, author: "John Smith", text: "This is exactly what I needed to read today.", createdAt: "2024-01-15T11:15:00Z" },
  ],
  2: [
    { id: 1, author: "Alice", text: "Interesting thoughts on this topic.", createdAt: "2024-01-15T09:45:00Z" },
  ],
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [likedPosts, setLikedPosts] = React.useState<{ [id: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = React.useState<{ [id: number]: number }>(() => {
    const counts: { [id: number]: number } = {};
    posts.forEach((post) => {
      counts[post.id] = Math.floor(Math.random() * 50) + 5; // Random initial likes
    });
    return counts;
  });
  const [dislikedPosts, setDislikedPosts] = React.useState<{ [id: number]: boolean }>({});
  const [dislikeCounts, setDislikeCounts] = React.useState<{ [id: number]: number }>(() => {
    const counts: { [id: number]: number } = {};
    posts.forEach((post) => {
      counts[post.id] = Math.floor(Math.random() * 10); // Random initial dislikes
    });
    return counts;
  });
  const [activeCommentPost, setActiveCommentPost] = React.useState<number | null>(null);
  const [expandedPosts, setExpandedPosts] = React.useState<{ [id: number]: boolean }>({});
  const [bookmarkedPosts, setBookmarkedPosts] = React.useState<{ [id: number]: boolean }>({});
  const postRefs = React.useRef<{ [id: number]: HTMLDivElement | null }>({});
  const [anchorRect, setAnchorRect] = React.useState<DOMRect | null>(null);
  const [commentsByPost, setCommentsByPost] = React.useState<{ [postId: number]: { id: number; author: string; text: string; createdAt: string }[] }>(mockComments);

  React.useEffect(() => {
    if (activeCommentPost !== null && postRefs.current[activeCommentPost]) {
      setAnchorRect(postRefs.current[activeCommentPost]?.getBoundingClientRect() || null);
    } else {
      setAnchorRect(null);
    }
  }, [activeCommentPost]);

  const handleLike = (id: number) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikeCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + (likedPosts[id] ? -1 : 1) }));
  };

  const handleDislike = (id: number) => {
    setDislikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    setDislikeCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + (dislikedPosts[id] ? -1 : 1) }));
  };

  const handleShare = (id: number) => {
    console.log("Sharing post with id:", id);
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post',
        text: 'I found this interesting post',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      window.alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = (id: number) => {
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Find the active post object
  const activePost = posts.find((p) => p.id === activeCommentPost) || null;
  const comments = activePost ? commentsByPost[activePost.id] || [] : [];

  const handleAddComment = (text: string) => {
    if (!activePost) return;
    setCommentsByPost(prev => {
      const prevComments = prev[activePost.id] || [];
      return {
        ...prev,
        [activePost.id]: [
          ...prevComments,
          { id: Date.now(), author: "You", text, createdAt: new Date().toISOString() },
        ],
      };
    });
  };

  // Helper to get first 40 characters
  const getPreview = (content: string) => {
    if (content.length <= 40) return content;
    return content.slice(0, 40) + '...';
  };

  // Helper to format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'technology': return 'bg-blue-500';
      case 'business': return 'bg-green-500';
      case 'lifestyle': return 'bg-purple-500';
      case 'news': return 'bg-red-500';
      case 'entertainment': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Comment panel overlays the post card, matches its width/position */}
      {activeCommentPost !== null && anchorRect && (
        <CommentPanel
          comments={comments}
          onClose={() => setActiveCommentPost(null)}
          post={activePost || undefined}
          anchorRect={anchorRect}
          onAddComment={handleAddComment}
        />
      )}
      {/* Main post list */}
      <div className="flex-1 space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            ref={el => {
              postRefs.current[post.id] = el;
            }}
            className={`group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-default ${
              activeCommentPost === post.id ? "ring-2 ring-blue-400/50" : "hover:border-gray-600/50"
            }`}
          >
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                  />
                  {post.author.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-semibold text-gray-100 truncate"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.author.name) }}
                    />
                    {post.author.role && (
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">
                        {post.author.role}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{getTimeAgo(post.createdAt)}</span>
                    {post.readTime && (
                      <>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </>
                    )}
                    {post.category && (
                      <>
                        <span>•</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)} text-white`}>
                          {post.category}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Post actions menu */}
                <div className="flex items-center gap-2">
                  <button
                    className={`p-2 rounded-lg transition-colors ${
                      bookmarkedPosts[post.id] 
                        ? 'text-yellow-400 hover:text-yellow-300' 
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(post.id);
                    }}
                    aria-label="Bookmark"
                  >
                    <svg className="w-5 h-5" fill={bookmarkedPosts[post.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  
                  <button
                    className="p-2 text-gray-400 hover:text-gray-300 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(post.id);
                    }}
                    aria-label="Share"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
              {post.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt="Post content" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    expandedPosts[post.id]
                      ? post.content
                      : getPreview(post.content)
                  ),
                }}
              />
              
              {post.content.length > 40 && (
                <button
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-2 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedPosts(prev => ({ ...prev, [post.id]: !prev[post.id] }));
                  }}
                >
                  {expandedPosts[post.id] ? 'Show less' : 'Show more'}
                </button>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="px-6 py-4 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Like button */}
                  <button
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      likedPosts[post.id] 
                        ? 'text-blue-400 bg-blue-500/10' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                    aria-pressed={!!likedPosts[post.id]}
                    aria-label="Like"
                  >
                    <svg className="w-5 h-5" fill={likedPosts[post.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="text-sm font-medium">{likeCounts[post.id] || 0}</span>
                  </button>

                  {/* Dislike button */}
                  <button
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      dislikedPosts[post.id] 
                        ? 'text-red-400 bg-red-500/10' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDislike(post.id);
                    }}
                    aria-pressed={!!dislikedPosts[post.id]}
                    aria-label="Dislike"
                  >
                    <svg className="w-5 h-5" fill={dislikedPosts[post.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10H9" />
                    </svg>
                    <span className="text-sm font-medium">{dislikeCounts[post.id] || 0}</span>
                  </button>

                  {/* Comment button */}
                  <button
                    className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCommentPost(post.id);
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {commentsByPost[post.id]?.length || 0}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
