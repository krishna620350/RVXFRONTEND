import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { FiSearch, FiUserPlus, FiCheck } from "react-icons/fi";
import "./ConnectionScrollbar.css";
import Footer from "../Layout/Footer";

interface ConnectionProfile {
  id: number;
  name: string;
  title: string;
  avatar: string;
  mutualConnections: number;
  isConnected: boolean;
}

const mockConnections: ConnectionProfile[] = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Frontend Developer at TechCorp",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    mutualConnections: 5,
    isConnected: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    title: "Product Manager at InnovateX",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    mutualConnections: 2,
    isConnected: false,
  },
  {
    id: 3,
    name: "Carol Lee",
    title: "UI/UX Designer at Creatives",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    mutualConnections: 3,
    isConnected: false,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Backend Engineer at Cloudify",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    mutualConnections: 1,
    isConnected: true,
  },
  {
    id: 15,
    name: "Olivia Green",
    title: "Full Stack Developer at WebWeave",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    mutualConnections: 7,
    isConnected: true,
  },
  {
    id: 16,
    name: "Peter Pan",
    title: "CEO at Neverland Inc.",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    mutualConnections: 9,
    isConnected: false,
  },
  {
    id: 17,
    name: "Quincy Jones",
    title: "Music Producer at QJP",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    mutualConnections: 3,
    isConnected: true,
  },
  {
    id: 18,
    name: "Rachel Zane",
    title: "Paralegal at Pearson Specter Litt",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    mutualConnections: 5,
    isConnected: false,
  },
  {
    id: 19,
    name: "Steve Rogers",
    title: "Avenger at SHIELD",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    mutualConnections: 12,
    isConnected: true,
  },
  {
    id: 20,
    name: "Tina Fey",
    title: "Comedian at SNL",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    mutualConnections: 8,
    isConnected: false,
  },
];

const suggestedPeople: ConnectionProfile[] = [
  {
    id: 5,
    name: "Emily Chen",
    title: "QA Engineer at Testify",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    mutualConnections: 2,
    isConnected: false,
  },
  {
    id: 6,
    name: "Frank Miller",
    title: "DevOps at CloudOps",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    mutualConnections: 4,
    isConnected: false,
  },
  {
    id: 7,
    name: "Grace Park",
    title: "Marketing at Brandly",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    mutualConnections: 1,
    isConnected: false,
  },
  {
    id: 8,
    name: "Henry Adams",
    title: "Sales at SellWell",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    mutualConnections: 3,
    isConnected: false,
  },
  {
    id: 9,
    name: "Irene Vance",
    title: "Data Scientist at Numerify",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    mutualConnections: 2,
    isConnected: false,
  },
  {
    id: 10,
    name: "Jack Quinn",
    title: "Mobile Developer at Appify",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    mutualConnections: 3,
    isConnected: false,
  },
  {
    id: 11,
    name: "Karen Hall",
    title: "Project Manager at BuildIt",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    mutualConnections: 1,
    isConnected: false,
  },
  {
    id: 12,
    name: "Liam Foster",
    title: "System Architect at Infra-Sys",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    mutualConnections: 5,
    isConnected: false,
  },
  {
    id: 13,
    name: "Mona Day",
    title: "UX Researcher at UserFirst",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    mutualConnections: 2,
    isConnected: false,
  },
  {
    id: 14,
    name: "Nate Reed",
    title: "Security Specialist at SecureNet",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    mutualConnections: 4,
    isConnected: false,
  },
];

const Connection: React.FC = () => {
  const [connections, setConnections] = useState(mockConnections);
  const [suggestions, setSuggestions] = useState(suggestedPeople);
  const [search, setSearch] = useState("");

  const handleConnectSuggestion = (id: number) => {
    const personToConnect = suggestions.find(p => p.id === id);
    if (personToConnect) {
      // Mark as connected in suggestions
      setSuggestions(prev => prev.map(p => p.id === id ? { ...p, isConnected: true } : p));
      
      // Move from suggestions to connections list after a delay
      setTimeout(() => {
        setConnections(prev => [personToConnect, ...prev]);
        setSuggestions(prev => prev.filter(p => p.id !== id));
      }, 1000);
    }
  };

  const handleToggleConnection = (id: number) => {
    setConnections(prev =>
      prev.map(c =>
        c.id === id ? { ...c, isConnected: !c.isConnected } : c
      )
    );
  };

  const filteredConnections = search.trim()
    ? connections.filter(
        c =>
          c.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          c.title.toLowerCase().includes(search.trim().toLowerCase())
      )
    : connections;

  return (
    <div className="bg-gray-900 h-screen overflow-y-auto text-white custom-scrollbar">
      <Navbar />
      <main className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">My Network</h1>
          <p className="text-lg text-gray-400">
            Connect with colleagues, classmates, and friends.
          </p>
        </div>

        {/* New Single-Column Layout */}
        <div className="space-y-12">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search connections by name or title..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* People You May Know - Horizontal Scroller */}
          <div>
            <h2 className="text-2xl font-bold mb-4">People you may know</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
              {suggestions.map((profile) => (
                <div
                  key={profile.id}
                  className="flex flex-col items-center text-center p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg min-w-[200px] transition-transform transform hover:-translate-y-1"
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-gray-600"
                  />
                  <p className="font-bold truncate w-full">{profile.name}</p>
                  <p className="text-sm text-gray-400 truncate w-full mb-3">
                    {profile.title}
                  </p>
                  <button
                    onClick={() => handleConnectSuggestion(profile.id)}
                    disabled={profile.isConnected}
                    className={`w-full px-4 py-2 rounded-lg font-semibold transition text-sm flex items-center justify-center gap-2 ${
                      profile.isConnected
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {profile.isConnected ? (
                      <>
                        <FiCheck />
                        Connected
                      </>
                    ) : (
                      <>
                        <FiUserPlus />
                        Connect
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Connections List */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {filteredConnections.length} Connections
              </h2>
              <div className="space-y-4">
                {filteredConnections.length > 0 ? (
                  filteredConnections.map((profile) => (
                    <div
                      key={profile.id}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-lg truncate">
                          {profile.name}
                        </p>
                        <p className="text-gray-400 truncate">
                          {profile.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {profile.mutualConnections} mutual connections
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleConnection(profile.id)}
                        className={`px-4 py-2 rounded-lg font-semibold transition text-sm flex items-center gap-2 ${
                          profile.isConnected
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {profile.isConnected ? (
                          <>
                            <FiCheck />
                            Connected
                          </>
                        ) : (
                          "Connect"
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    No connections found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Connection;
