import React from "react";
import TrendingCard from "./TrendingCard";

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    topic: "FutureOfAI",
    title: "The Next Frontier in Artificial Intelligence",
    excerpt: "AI is evolving faster than ever. We explore the ethical implications and the exciting possibilities that lie ahead...",
    likes: 1200,
    comments: 350,
    timestamp: "8h ago",
  },
  {
    id: 2,
    author: {
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    topic: "ReactJS",
    title: "Mastering State Management in React with Zustand",
    excerpt: "Forget Redux boilerplate. Zustand offers a minimalistic and powerful way to handle state in your React applications...",
    likes: 980,
    comments: 210,
    timestamp: "1d ago",
  },
  {
    id: 3,
    author: {
      name: "Alex Ray",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    topic: "DevOps",
    title: "CI/CD Pipelines: A 2024 Guide to Automation",
    excerpt: "Automate your workflow from development to deployment. This guide covers the best practices for building robust CI/CD pipelines...",
    likes: 750,
    comments: 150,
    timestamp: "2d ago",
  },
];


const TrendingPosts: React.FC = () => {
  return (
    <div className="space-y-6">
      {mockPosts.map((post) => (
        <TrendingCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default TrendingPosts; 