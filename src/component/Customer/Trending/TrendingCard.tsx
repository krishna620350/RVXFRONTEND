import React from "react";
import { FiHeart, FiMessageSquare, FiBookmark } from "react-icons/fi";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  topic: string;
  title: string;
  excerpt: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface TrendingCardProps {
  post: Post;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ post }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-blue-500/10 hover:border-gray-600">
      {/* Card Header */}
      <div className="flex items-center mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-gray-400">{post.timestamp}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-blue-400 mb-1">#{post.topic}</p>
        <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
        <p className="text-gray-300">{post.excerpt}</p>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center text-gray-400">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
            <FiHeart />
            <span>{post.likes.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FiMessageSquare />
            <span>{post.comments.toLocaleString()}</span>
          </button>
        </div>
        <button className="hover:text-blue-400 transition-colors">
          <FiBookmark />
        </button>
      </div>
    </div>
  );
};

export default TrendingCard; 