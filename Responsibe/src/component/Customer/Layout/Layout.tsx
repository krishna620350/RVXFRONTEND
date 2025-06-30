import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const mockProfiles = [
  { id: 1, name: "Alice Johnson", subtitle: "@alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "Bob Smith", subtitle: "@bob", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Carol Lee", subtitle: "@carol", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, name: "David Kim", subtitle: "@david", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
];

const LoadingSkeleton: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen h-screen bg-gray-900 text-white relative overflow-hidden">
    <div className="w-full max-w-2xl p-4 sm:p-8">
      {/* Profile skeleton */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 animate-pulse">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-500/90 mb-2 sm:mb-0" />
        <div className="flex-1 w-full">
          <div className="h-6 w-1/2 bg-gray-400/80 rounded mb-2" />
          <div className="h-4 w-1/3 bg-gray-400/60 rounded" />
        </div>
      </div>
      {/* Tiles skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 h-24 sm:h-32 bg-gray-500/80 rounded-xl animate-pulse border border-gray-700/60 p-4"
          >
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gray-400/70" />
            <div className="flex-1">
              <div className="h-5 w-2/3 bg-gray-400/60 rounded mb-2" />
              <div className="h-4 w-1/3 bg-gray-400/40 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900/80 flex items-center justify-center z-50">
      <span className="text-lg text-gray-300 font-semibold tracking-wide animate-pulse drop-shadow text-center w-full block">
        Loading your social feed...
      </span>
    </div>
  </div>
);

const Layout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/", { replace: true, state: { profiles: mockProfiles } });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading)
    return (
      <>
        <nav className="w-full bg-gray-950/40 border-b border-gray-800/30 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between fixed top-0 left-0 z-50 shadow-none">
          <span className="text-xl font-bold text-blue-400/60 mb-2 sm:mb-0">SocialApp</span>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            {["Home", "Chat", "Post", "Connections", "Notifications", "Profile"].map((label) => (
              <span key={label} className="flex items-center gap-2 text-gray-400/60 font-medium px-2 py-1 rounded cursor-default select-none">
                <span className="text-lg">•</span>
                <span className="hidden sm:inline">{label}</span>
              </span>
            ))}
          </div>
        </nav>
        <LoadingSkeleton />
      </>
    );
  return <Home profiles={mockProfiles} />;
};

export default Layout;
