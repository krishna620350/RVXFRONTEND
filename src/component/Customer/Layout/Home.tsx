import React, { useState, useRef, useLayoutEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import Posts from "../Posts/Posts";
import { mockPosts } from "../../../tests/post/mockPosts";
import Footer from "./Footer";
import FloatingChat from "../Chats/FloatingChat";

interface Profile {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  role?: string;
  location?: string;
  verified?: boolean;
  lastSeen?: string;
}

interface HomeProps {
  profiles?: Profile[];
}

const Home: React.FC<HomeProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileHeaderRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setHeaderHeight(entry.target.getBoundingClientRect().height);
      }
    });

    const currentRef = profileHeaderRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const state = location.state as { profiles?: Profile[] } | null;
  const profiles: Profile[] =
    (state && state.profiles) ||
    props.profiles ||
    [
      { 
        id: 1, 
        name: "Alice Johnson", 
        subtitle: "@alice", 
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        status: 'online',
        role: 'Software Engineer',
        location: 'San Francisco, CA',
        verified: true,
        lastSeen: '2 minutes ago'
      },
    ];

  if (!profiles.length) {
    return (
      <div className="flex items-center justify-center min-h-screen h-screen bg-gray-900 text-white">
        <span>No profile data found.</span>
      </div>
    );
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Offline';
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Navbar fixed at the very top, always visible */}
      <Navbar />
      {/* Enhanced Profile header - fixed below navbar */}
      <div
        ref={profileHeaderRef}
        className="fixed top-0 left-0 w-full flex justify-center z-10 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-lg"
        style={{ marginTop: '60px' }}
      >
        <div className="w-full max-w-4xl px-4 py-3 flex flex-row items-center justify-between">
          {/* Enhanced Profile info - left side */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Avatar with status indicator */}
            <div className="relative">
              <img
                src={profiles[0].avatar}
                alt={profiles[0].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 shadow-md"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(profiles[0].status)}`}></div>
            </div>
            
            {/* Profile details */}
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="text-lg font-bold text-gray-100 truncate"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(profiles[0].name) }}
                />
                {profiles[0].verified && (
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div
                className="text-gray-400 text-sm truncate mb-1"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(profiles[0].subtitle) }}
              />
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`inline-flex items-center gap-1 ${getStatusColor(profiles[0].status).replace('bg-', 'text-')}`}>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(profiles[0].status)}`}></div>
                  {getStatusText(profiles[0].status)}
                </span>
                {profiles[0].role && (
                  <span className="text-gray-400">• {profiles[0].role}</span>
                )}
                {profiles[0].location && (
                  <span className="text-gray-400">• {profiles[0].location}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Action buttons - right side */}
          <div className="flex items-center gap-2">
            {/* Profile menu button */}
            <button
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors relative"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              
              {/* Profile dropdown menu */}
              {showProfileMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-20">
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </button>
                    <hr className="border-gray-700 my-1" />
                    <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </button>
            
            {/* Post button */}
            <button
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center gap-2"
              onClick={() => navigate('/post', { state: { backgroundLocation: location } })}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post
            </button>
          </div>
        </div>
      </div>
      
      {/* Click outside to close profile menu */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
      
      {/* Main content below profile header */}
      <div
        className="w-full flex justify-center bg-[#111827] text-white"
        style={{ paddingTop: `${60 + headerHeight}px` }}
      >
        <div
          className="w-full max-w-2xl p-2 sm:p-8"
        >
          <Posts posts={mockPosts} />
        </div>
      </div>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Home;
