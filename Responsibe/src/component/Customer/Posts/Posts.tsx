import React from "react";
import DOMPurify from "dompurify";
import CommentPanel from "./Comment/CommentPanel";

export interface Profile {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
}

export interface Post {
  id: number;
  author: Profile;
  content: string;
  createdAt: string;
}

interface PostsProps {
  posts: Post[];
}

// Mock comments for demonstration
const mockComments: { [postId: number]: { id: number; author: string; text: string }[] } = {
  1: [
    { id: 1, author: "Jane Doe", text: "Great post!" },
    { id: 2, author: "John Smith", text: "Thanks for sharing." },
  ],
  2: [
    { id: 1, author: "Alice", text: "Interesting thoughts." },
  ],
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [likedPosts, setLikedPosts] = React.useState<{ [id: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = React.useState<{ [id: number]: number }>(() => {
    const counts: { [id: number]: number } = {};
    posts.forEach((post) => {
      counts[post.id] = 0;
    });
    return counts;
  });
  const [dislikedPosts, setDislikedPosts] = React.useState<{ [id: number]: boolean }>({});
  const [dislikeCounts, setDislikeCounts] = React.useState<{ [id: number]: number }>(() => {
    const counts: { [id: number]: number } = {};
    posts.forEach((post) => {
      counts[post.id] = 0;
    });
    return counts;
  });
  const [activeCommentPost, setActiveCommentPost] = React.useState<number | null>(null);
  const [expandedPosts, setExpandedPosts] = React.useState<{ [id: number]: boolean }>({});
  const postRefs = React.useRef<{ [id: number]: HTMLDivElement | null }>({});
  const [anchorRect, setAnchorRect] = React.useState<DOMRect | null>(null);
  const [commentsByPost, setCommentsByPost] = React.useState<{ [postId: number]: { id: number; author: string; text: string }[] }>(mockComments);

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
    window.alert(`Post ${id} shared!`);
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
          { id: Date.now(), author: "You", text },
        ],
      };
    });
  };

  // Helper to get first 40 characters
  const getPreview = (content: string) => {
    if (content.length <= 40) return content;
    return content.slice(0, 40) + '...';
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
      <div className="flex-1 space-y-2">
        {posts.map((post) => (
          <div
            key={post.id}
            ref={el => {
              postRefs.current[post.id] = el;
            }}
            className={`group mt-2 p-4 sm:p-6 bg-gray-800 rounded-xl shadow flex flex-col sm:flex-row gap-4 relative transition-all duration-200 cursor-pointer ${
              activeCommentPost === post.id ? "ring-2 ring-blue-400" : ""
            }`}
            style={{ minHeight: 180 }}
            onClick={e => {
              // Prevent click if like/share/comment button is clicked
              const target = e.target as HTMLElement;
              if (
                target.closest('button') ||
                target.closest('svg')
              ) return;
              setActiveCommentPost(post.id);
            }}
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover mb-2 sm:mb-0"
            />
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-1">
                <span
                  className="font-semibold"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.author.name) }}
                />
                <span className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
              <div
                className="text-gray-200 mb-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    expandedPosts[post.id]
                      ? post.content
                      : getPreview(post.content)
                  ),
                }}
              />
              {post.content.length > 40 && !expandedPosts[post.id] && (
                <button
                  className="text-blue-400 hover:underline text-xs mt-1 self-start"
                  onClick={e => {
                    e.stopPropagation();
                    setExpandedPosts(prev => ({ ...prev, [post.id]: true }));
                  }}
                >
                  Show more
                </button>
              )}
              {post.content.length > 40 && expandedPosts[post.id] && (
                <button
                  className="text-blue-400 hover:underline text-xs mt-1 self-start"
                  onClick={e => {
                    e.stopPropagation();
                    setExpandedPosts(prev => ({ ...prev, [post.id]: false }));
                  }}
                >
                  Show less
                </button>
              )}
              <button
                className="mt-4 text-gray-400 hover:text-gray-200 font-semibold flex items-center gap-1 self-start"
                onClick={e => {
                  e.stopPropagation();
                  setActiveCommentPost(post.id);
                }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-message-circle"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4A8.5 8.5 0 0 1 3.6 16.9L2 21l4.1-1.6A8.38 8.38 0 0 0 12 19.5a8.5 8.5 0 1 0-8.5-8.5" />
                </svg>
                Comment
              </button>
            </div>
            {/* Share icon top right */}
            <button
              className="absolute top-6 right-6 text-green-400 hover:text-green-200 flex flex-col items-center"
              onClick={e => {
                e.stopPropagation();
                handleShare(post.id);
              }}
              aria-label="Share"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-share-2"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
            {/* Like icon bottom right */}
            <button
              className={`absolute bottom-6 right-20 flex flex-col items-center text-blue-400 hover:text-blue-200 ${
                likedPosts[post.id] ? "text-blue-600" : ""
              }`}
              onClick={e => {
                e.stopPropagation();
                handleLike(post.id);
              }}
              aria-pressed={!!likedPosts[post.id]}
              aria-label="Like"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-thumbs-up"
              >
                <path d="M14 9V5a3 3 0 0 0-6 0v4" />
                <path d="M5 15h10a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2z" />
              </svg>
              <span className="text-xs mt-0.5">{likeCounts[post.id] || 0}</span>
            </button>
            {/* Dislike icon beside like */}
            <button
              className={`absolute bottom-6 right-6 flex flex-col items-center text-red-400 hover:text-red-200 ${
                dislikedPosts[post.id] ? "text-red-600" : ""
              }`}
              onClick={e => {
                e.stopPropagation();
                handleDislike(post.id);
              }}
              aria-pressed={!!dislikedPosts[post.id]}
              aria-label="Dislike"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-thumbs-down"
              >
                <path d="M10 15v4a3 3 0 0 0 6 0v-4" />
                <path d="M19 9H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2z" />
              </svg>
              <span className="text-xs mt-0.5">{dislikeCounts[post.id] || 0}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
