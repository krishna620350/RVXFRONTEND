import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import Posts from '../Posts/Posts';
import type { Post } from '../Posts/Posts';
import { FiMapPin, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProfileMobile: React.FC = () => {
  const [coverPhotoError, setCoverPhotoError] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const autoplayIntervalRef = useRef<number | null>(null);

  const user = {
    id: 101,
    name: "Alex Doe",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    coverPhoto: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    bio: "Frontend Developer | React Enthusiast | UI/UX Designer",
    location: "San Francisco, CA",
    joined: "Joined January 2023",
    stats: {
      posts: 20,
      followers: "1.2k",
      following: 345,
    },
  };
  
  const userPosts: Post[] = [
    {
      id: 1,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Just finished building a new component for my project. It's always satisfying to see the final result after hours of coding! #React #WebDev",
      createdAt: "2024-07-20T10:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 2,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Exploring the beautiful trails around SF this weekend. It's important to disconnect and recharge. 🌲",
      createdAt: "2024-07-18T15:30:00Z",
    },
    {
      id: 3,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Big fan of the new UI/UX trends emerging this year. Clean, simple, and user-centric designs are the future.",
      createdAt: "2024-07-15T09:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1559028006-448665bd7c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1658&q=80"
    },
    {
      id: 4,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Just deployed a new feature! The feeling of seeing your code go live is unbeatable. #SoftwareEngineering",
      createdAt: "2024-07-12T11:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 5,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Morning coffee and coding. The perfect start to a productive day. ☕️💻",
      createdAt: "2024-07-10T08:00:00Z",
    },
    {
      id: 6,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Attended a great webinar on a11y. Accessibility is not a feature, it's a necessity. #a11y #webdev",
      createdAt: "2024-07-09T16:45:00Z",
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 7,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Trying out the new beta for a design tool I love. So many cool features!",
      createdAt: "2024-07-08T14:00:00Z",
    },
    {
      id: 8,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "My weekend project: building a small app with a new framework. Always learning, always growing.",
      createdAt: "2024-07-05T18:20:00Z",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 9,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Refactoring old code is like cleaning your room. It's not glamorous, but it feels so good afterward.",
      createdAt: "2024-07-03T09:50:00Z",
    },
    {
      id: 10,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Found a hidden gem of a cafe downtown. Great place to work from.",
      createdAt: "2024-07-01T13:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
    },
    {
      id: 11,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Reading a book on system design patterns. Fascinating stuff.",
      createdAt: "2024-06-29T19:00:00Z",
    },
    {
      id: 12,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "The future of frontend seems to be server-side rendering... again! The cycle continues.",
      createdAt: "2024-06-28T12:30:00Z",
      imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 13,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "A long walk in the park to clear my head after a long week of coding.",
      createdAt: "2024-06-25T17:00:00Z",
    },
    {
      id: 14,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Debugging a tricky CSS issue. The culprit was a single line of code, as always.",
      createdAt: "2024-06-24T15:00:00Z",
    },
    {
      id: 15,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Excited to mentor a junior developer starting next week. Paying it forward!",
      createdAt: "2024-06-22T10:10:00Z",
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 16,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "My favorite part of being a developer is the 'aha!' moment when everything just clicks.",
      createdAt: "2024-06-20T11:45:00Z",
    },
    {
      id: 17,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Organized my component library today. Future me will be grateful.",
      createdAt: "2024-06-18T14:55:00Z",
    },
    {
      id: 18,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Pair programming is such an effective way to solve complex problems and share knowledge.",
      createdAt: "2024-06-15T16:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 19,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Finally got around to setting up my new desk configuration. Productivity boost incoming!",
      createdAt: "2024-06-12T09:30:00Z",
    },
    {
      id: 20,
      author: { id: 101, name: user.name, subtitle: user.bio, avatar: user.avatar, verified: true },
      content: "Never stop learning. The tech world moves fast, and you have to keep up.",
      createdAt: "2024-06-10T18:00:00Z",
    }
  ];

  const handleCoverPhotoError = () => {
    setCoverPhotoError(true);
  };

  const handleNextPost = () => {
    setCurrentPostIndex(prevIndex => (prevIndex + 1) % latestPosts.length);
  };

  const handlePrevPost = () => {
    setCurrentPostIndex(prevIndex => (prevIndex - 1 + latestPosts.length) % latestPosts.length);
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  const startAutoplay = () => {
    stopAutoplay(); // Prevent multiple intervals
    autoplayIntervalRef.current = window.setInterval(() => {
      handleNextPost();
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  }, []);

  // Split posts into latest 10 and the rest
  const latestPosts = userPosts.slice(0, 10);
  const remainingPosts = userPosts.slice(10);

  return (
    <>
      <Navbar />
      <div 
        className="bg-slate-950 min-h-screen text-white pt-16"
      >
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="w-full h-40 relative">
              {user.coverPhoto && !coverPhotoError ? (
                  <img src={user.coverPhoto} alt="Cover" className="w-full h-full object-cover" onError={handleCoverPhotoError} />
              ) : (
                  <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-600"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
            </div>

            <div className="relative z-10 -mt-12">
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-950 shadow-lg"/>
            </div>

            <div className="w-full p-4">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="mt-1 text-sm text-gray-400 max-w-md mx-auto">{user.bio}</p>

              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2"><FiMapPin /><span>{user.location}</span></div>
                  <div className="flex items-center gap-2"><FiCalendar /><span>{user.joined}</span></div>
              </div>
              
              <div className="mt-6 w-full max-w-sm mx-auto grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-800/50 p-3 rounded-lg"><div className="font-bold text-lg text-white">{user.stats.posts}</div><div className="text-xs text-gray-400">Posts</div></div>
                <div className="bg-slate-800/50 p-3 rounded-lg"><div className="font-bold text-lg text-white">{user.stats.followers}</div><div className="text-xs text-gray-400">Followers</div></div>
                <div className="bg-slate-800/50 p-3 rounded-lg"><div className="font-bold text-lg text-white">{user.stats.following}</div><div className="text-xs text-gray-400">Following</div></div>
              </div>

              <button className="mt-6 w-full max-w-sm mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300">Follow</button>
            </div>
          </div>
          
          {/* Posts Content */}
          <div className="p-4">
            {/* Horizontal Latest Posts Carousel */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-gray-200">Latest Posts</h2>
              <div 
                className="relative"
                onMouseEnter={stopAutoplay}
                onMouseLeave={startAutoplay}
              >
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentPostIndex * 100}%)` }}>
                    {latestPosts.map((post) => (
                      <div key={post.id} className="w-full flex-shrink-0">
                        <div className="bg-slate-800/80 p-4 rounded-xl shadow-lg">
                          <p className="text-sm text-gray-300 mb-3 h-12 overflow-hidden">{post.content}</p>
                          {post.imageUrl && (<img src={post.imageUrl} alt="" className="w-full h-48 object-cover rounded-lg"/>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Always show controls for manual navigation */}
                <button onClick={handlePrevPost} className="absolute top-1/2 left-2 -translate-y-1/2 bg-slate-900/50 rounded-full p-2"><FiChevronLeft /></button>
                <button onClick={handleNextPost} className="absolute top-1/2 right-2 -translate-y-1/2 bg-slate-900/50 rounded-full p-2"><FiChevronRight /></button>
              </div>
            </div>

            {/* Vertical Remaining Posts */}
            <div>
              <h2 className="text-lg font-bold mb-4 text-gray-200">All Posts</h2>
              <div className="space-y-6">
                <Posts posts={remainingPosts} />
              </div>
            </div>
          </div>
    </div>
    </>
  );
};

export default ProfileMobile; 