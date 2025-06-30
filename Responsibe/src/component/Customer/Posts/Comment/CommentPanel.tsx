import React from "react";
import Comment from "./Comment";
import type { Post } from "../Posts";

interface CommentPanelProps {
  comments: { id: number; author: string; text: string }[];
  onClose: () => void;
  post?: Post;
  anchorRect?: DOMRect | null;
  onAddComment?: (text: string) => void;
}

const CommentPanel: React.FC<CommentPanelProps> = ({ comments, onClose, post, anchorRect, onAddComment }) => {
  const [input, setInput] = React.useState("");
  const style: React.CSSProperties = anchorRect
    ? {
        position: 'fixed',
        top: anchorRect.top,
        left: anchorRect.left,
        width: anchorRect.width,
        zIndex: 50,
        minHeight: 180,
        maxHeight: '80vh',
      }
    : {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && onAddComment) {
      onAddComment(input.trim());
      setInput("");
    }
  };

  return (
    <>
      {/* Overlay only around the post */}
      <div
        className="fixed inset-0 z-40 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />
      {/* Panel overlays the post, matches its width/position */}
      <div
        className="bg-gray-900 bg-opacity-95 shadow-lg flex flex-col p-3 md:p-4 border border-gray-800 pointer-events-auto rounded-2xl z-50 transition-all"
        style={style}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-lg text-white">
            {post ? `Comments for ${post.author.name}` : "Comments"}
          </div>
          <button
            className="text-gray-400 hover:text-white"
            onClick={onClose}
            aria-label="Close comments"
          >
            ✕
          </button>
        </div>
        <div
          className="flex-1 space-y-4"
          style={{
            maxHeight: comments.length > 3 ? 180 : undefined,
            overflowY: comments.length > 3 ? 'auto' : 'visible',
            scrollbarWidth: 'thin', // for Firefox
            scrollbarColor: 'rgba(255,255,255,0.2) transparent',
          }}
        >
          <style>{`
            /* Chrome, Edge, Safari */
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255,255,255,0.15);
              border-radius: 4px;
            }
          `}</style>
          <div className={comments.length > 3 ? "custom-scrollbar" : undefined}>
            {comments.length === 0 ? (
              <div className="text-gray-400">No comments yet.</div>
            ) : (
              comments.slice(0, 3).map((c) => <Comment key={c.id} comment={c} />)
            )}
            {comments.length > 3 && (
              comments.slice(3).map((c) => <Comment key={c.id} comment={c} />)
            )}
          </div>
        </div>
        {/* Add comment input */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-lg px-3 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a comment..."
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={200}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
            disabled={!input.trim()}
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CommentPanel;
