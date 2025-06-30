import React from "react";
import { FiHash } from "react-icons/fi";

const mockTopics = [
  { name: "TechInnovation", posts: 18400 },
  { name: "FutureOfAI", posts: 15200 },
  { name: "ReactJS", posts: 12500 },
  { name: "RemoteWork", posts: 9800 },
  { name: "UIUXDesign", posts: 7600 },
  { name: "DevOps", posts: 5400 },
];

const TrendingTopics: React.FC = () => {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
      <div className="space-y-4">
        {mockTopics.map((topic) => (
          <div
            key={topic.name}
            className="group flex justify-between items-center cursor-pointer"
          >
            <div>
              <p className="font-semibold text-gray-300 group-hover:text-white transition-colors">
                #{topic.name}
              </p>
              <p className="text-sm text-gray-500">
                {topic.posts.toLocaleString()} posts
              </p>
            </div>
            <FiHash className="text-gray-600 group-hover:text-blue-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics; 