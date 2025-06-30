import React from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import Posts from "../Posts/Posts";
import { mockPosts } from "../../../tests/post/mockPosts";
import Chat from "../Chats/Chat";

interface Profile {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
}

interface HomeProps {
  profiles?: Profile[];
}

const Home: React.FC<HomeProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { profiles?: Profile[] } | null;
  const profiles: Profile[] =
    (state && state.profiles) ||
    props.profiles ||
    [
      { id: 1, name: "Alice Johnson", subtitle: "@alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    ];

  if (!profiles.length) {
    return (
      <div className="flex items-center justify-center min-h-screen h-screen bg-gray-900 text-white">
        <span>No profile data found.</span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {/* Profile header (first profile) - fixed at the top below navbar, responsive layout */}
      <div
        className="fixed left-0 w-full flex justify-center z-20 bg-[#111827] border-b border-gray-800"
        style={{ top: 56 }}
      >
        <div className="w-full max-w-2xl px-2 sm:px-4 py-2 flex flex-row items-center gap-2 sm:gap-4 min-h-0">
          <img
            src={profiles[0].avatar}
            alt={profiles[0].name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div className="flex-1 text-left">
            <div
              className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1 text-gray-100"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(profiles[0].name) }}
            />
            <div
              className="text-gray-400 text-xs sm:text-sm"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(profiles[0].subtitle) }}
            />
          </div>
          <button
            className="ml-2 px-3 sm:px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition text-sm"
            onClick={() => navigate('/post', { state: { backgroundLocation: location } })}
          >
            + Post
          </button>
        </div>
      </div>
      {/* Main content below profile header, scrollable only for posts, thin transparent scrollbar */}
      <div
        className="w-full flex justify-center bg-[#111827] text-white relative overflow-hidden"
        style={{ paddingTop: '108px', minHeight: 0, height: '100vh', overflow: 'hidden' }}
      >
        <div
          className="w-full max-w-2xl p-2 sm:p-8 overflow-y-auto custom-thin-scrollbar"
          style={{ maxHeight: 'calc(100vh - 108px)', width: '100%' }}
        >
          <Posts posts={mockPosts} />
        </div>
        {/* Chat widget fixed at bottom right, pointer-events-none for wrapper */}
        <div className="hidden md:block" style={{ pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <Chat />
          </div>
        </div>
        {/* On mobile, show chat as a floating button */}
        <div className="fixed bottom-4 right-4 z-40 md:hidden">
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
