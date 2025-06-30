import React from 'react';
import Navbar from '../Navbar/Navbar';

const Bookmarks: React.FC = () => {
  // Placeholder data
  const bookmarkedPosts = [
    { id: 1, author: 'Jane Doe', content: 'Just released a new article on advanced CSS techniques!', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 2, author: 'John Smith', content: 'Exploring the future of web development with WebAssembly.', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 3, author: 'Emily White', content: "A deep dive into React's new concurrent features.", avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white pt-24">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8">Bookmarks</h1>
          <div className="space-y-6">
            {bookmarkedPosts.map(post => (
              <div key={post.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
                  <div className="ml-4">
                    <h2 className="font-semibold text-lg">{post.author}</h2>
                  </div>
                </div>
                <p className="text-gray-300">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmarks; 