import React from "react";
import Navbar from "../Navbar/Navbar";
import TrendingTopics from "./TrendingTopics";
import TrendingPosts from "./TrendingPosts";
import Footer from "../Layout/Footer";

const Trending: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Trending Now</h1>
          <p className="text-lg text-gray-400">
            Discover the most popular topics and posts across the network.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending Posts Section */}
          <div className="lg:col-span-2">
            <TrendingPosts />
          </div>

          {/* Trending Topics Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TrendingTopics />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trending; 