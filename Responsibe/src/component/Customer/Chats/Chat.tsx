import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const mockMessages = [
  { id: 1, sender: "You", text: "Hi! How can I help you today?" },
  { id: 2, sender: "Bot", text: "I'm just exploring the app. Thanks!" },
];

const friends = [
  { id: 1, name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "Bob Smith", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Carol Lee", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, name: "Carol Lee", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 5, name: "Carol Lee", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 6, name: "Carol Lee", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
];

const ChatWindow: React.FC<{ friend?: typeof friends[0]; onSelectFriend?: () => void }> = ({ friend, onSelectFriend }) => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, minimized]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { id: msgs.length + 1, sender: "You", text: input },
      { id: msgs.length + 2, sender: "Bot", text: "This is a mock reply!" },
    ]);
    setInput("");
  };

  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="w-16 h-12 bg-[#232b3a] text-white rounded-xl shadow-lg border border-gray-700 flex items-center justify-center hover:bg-[#2d3748]"
          onClick={() => setMinimized(false)}
          title="Open chat"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-message-square"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M8 12h8M8 16h4" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-[#181f2a] rounded-xl shadow-lg border border-gray-700 flex flex-col transition-all duration-300 ${
        minimized
          ? "w-screen h-screen max-w-none max-h-none left-0 top-0 bottom-0 right-0"
          : "w-80 max-w-full"
      }`}
      style={minimized ? { minHeight: "100vh" } : { minHeight: 400 }}
    >
      <div className="flex items-center px-4 py-2 border-b border-gray-700 font-semibold text-lg text-white bg-[#232b3a] rounded-t-xl">
        <span className="flex-1">{friend ? friend.name : "Chat"}</span>
        <button
          className="text-gray-400 hover:text-white mr-2"
          onClick={onSelectFriend}
          title="Friends List"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
            <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
        <button
          className="text-gray-400 hover:text-white mr-2"
          onClick={() => {
            if (friend) {
              navigate(`/chat?friend=${encodeURIComponent(friend.id)}`);
            } else {
              navigate("/chat");
            }
          }}
          title="Fullscreen"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-maximize"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </button>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setMinimized(true)}
          title="Minimize"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-minus"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2 text-sm text-white"
        style={minimized ? { maxHeight: "calc(100vh - 110px)" } : { maxHeight: 260 }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={msg.sender === "You" ? "text-right" : "text-left"}>
            <span className={msg.sender === "You" ? "bg-blue-600 text-white px-3 py-1 rounded-2xl inline-block" : "bg-gray-700 text-white px-3 py-1 rounded-2xl inline-block"}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex border-t border-gray-700 bg-[#181f2a] rounded-b-xl">
        <input
          className="flex-1 px-3 py-2 bg-transparent text-white outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="px-4 py-2 text-blue-400 hover:text-blue-200">
          Send
        </button>
      </form>
    </div>
  );
};

const Chat: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const friendName = params.get("friend");
  const [selectedFriend, setSelectedFriend] = useState<typeof friends[0] | undefined>(
    friends.find(f => f.name === friendName)
  );
  const [showFriends, setShowFriends] = useState(!selectedFriend);
  // Start minimized by default
  const [minimizedFriends, setMinimizedFriends] = useState(true);
  const [search, setSearch] = useState("");

  // Filter friends by search
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  // Responsive: always show floating button on mobile
  if (window.innerWidth < 768 && minimizedFriends) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700"
          onClick={() => setMinimizedFriends(false)}
          title="Open friends list"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
            <circle cx="12" cy="7" r="4" />
            <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <>
      {showFriends ? (
        minimizedFriends ? (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              className="w-16 h-12 bg-[#232b3a] text-white rounded-xl shadow-lg border border-gray-700 flex items-center justify-center hover:bg-[#2d3748]"
              onClick={() => setMinimizedFriends(false)}
              title="Open friends list"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-users"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="fixed bottom-6 right-6 z-50 bg-[#232b3a] rounded-xl shadow-lg border border-gray-700 p-6 flex flex-col items-center min-w-[300px]">
            <div className="flex items-center w-full mb-4">
              <div className="text-white text-lg font-semibold flex-1">Select a friend to chat with:</div>
              <button
                className="text-gray-400 hover:text-white ml-2"
                onClick={() => setMinimizedFriends(true)}
                title="Minimize"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-minus"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
            <input
              type="text"
              className="mb-3 px-3 py-2 rounded-lg bg-[#181f2a] text-white border border-gray-700 focus:outline-none w-full"
              placeholder="Search friends..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
            <div
              className="flex flex-col gap-4 w-full overflow-y-auto custom-thin-scrollbar"
              style={{ height: 172 }}
            >
              {filteredFriends.length === 0 ? (
                <div className="text-gray-400 text-center">No friends found.</div>
              ) : (
                filteredFriends.map((friend) => (
                  <button
                    key={friend.id}
                    className="flex items-center gap-3 bg-[#181f2a] text-white rounded-lg border border-gray-700 px-4 py-2 hover:bg-[#2d3748] transition w-full"
                    style={{ minHeight: 48 }}
                    onClick={() => {
                      setSelectedFriend(friend);
                      setShowFriends(false);
                    }}
                  >
                    <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-semibold">{friend.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )
      ) : (
        <ChatWindow friend={selectedFriend} onSelectFriend={() => setShowFriends(true)} />
      )}
    </>
  );
};

export default Chat;
