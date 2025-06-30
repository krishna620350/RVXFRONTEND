import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

// Types
interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: string;
  isTyping?: boolean;
  role?: 'admin' | 'moderator' | 'member';
}

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  type: 'text' | 'image' | 'file';
  replyTo?: Message;
  reactions?: { [key: string]: number };
  url?: string;
}

interface Chat {
  id: number;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
}

// Enhanced mock data
const mockUsers: User[] = [
  { id: 1, name: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg", status: 'online', role: 'admin' },
  { id: 2, name: "Bob Smith", avatar: "https://randomuser.me/api/portraits/men/2.jpg", status: 'away', lastSeen: "2 minutes ago", role: 'moderator' },
  { id: 3, name: "Carol Lee", avatar: "https://randomuser.me/api/portraits/women/3.jpg", status: 'busy', role: 'member' },
  { id: 4, name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/4.jpg", status: 'online', role: 'member' },
  { id: 5, name: "Emily Chen", avatar: "https://randomuser.me/api/portraits/women/5.jpg", status: 'offline', lastSeen: "1 hour ago", role: 'member' },
  { id: 6, name: "Frank Wilson", avatar: "https://randomuser.me/api/portraits/men/6.jpg", status: 'online', role: 'member' },
  { id: 7, name: "Grace Taylor", avatar: "https://randomuser.me/api/portraits/women/7.jpg", status: 'away', lastSeen: "5 minutes ago", role: 'member' },
  { id: 8, name: "Henry Brown", avatar: "https://randomuser.me/api/portraits/men/8.jpg", status: 'busy', role: 'member' },
  { id: 9, name: "Ivy Davis", avatar: "https://randomuser.me/api/portraits/women/9.jpg", status: 'online', role: 'member' },
  { id: 10, name: "Jack Miller", avatar: "https://randomuser.me/api/portraits/men/10.jpg", status: 'offline', lastSeen: "30 minutes ago", role: 'member' },
  { id: 11, name: "Kate Anderson", avatar: "https://randomuser.me/api/portraits/women/11.jpg", status: 'online', role: 'member' },
  { id: 12, name: "Liam Garcia", avatar: "https://randomuser.me/api/portraits/men/12.jpg", status: 'away', lastSeen: "10 minutes ago", role: 'member' },
  { id: 13, name: "Mia Rodriguez", avatar: "https://randomuser.me/api/portraits/women/13.jpg", status: 'online', role: 'member' },
  { id: 14, name: "Noah Martinez", avatar: "https://randomuser.me/api/portraits/men/14.jpg", status: 'busy', role: 'member' },
  { id: 15, name: "Olivia Thompson", avatar: "https://randomuser.me/api/portraits/women/15.jpg", status: 'offline', lastSeen: "2 hours ago", role: 'member' },
];

const mockChats: Chat[] = [
  {
    id: 1,
    participants: [mockUsers[0]],
    messages: [
      { id: 1, senderId: 1, text: "Hey! How are you doing?", timestamp: "2024-01-15T10:30:00Z", status: 'read', type: 'text' },
      { id: 2, senderId: 0, text: "I'm doing great! Thanks for asking. How about you?", timestamp: "2024-01-15T10:32:00Z", status: 'read', type: 'text' },
    ],
    lastMessage: { id: 2, senderId: 0, text: "I'm doing great! Thanks for asking.", timestamp: "2024-01-15T10:32:00Z", status: 'read', type: 'text' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 2,
    participants: [mockUsers[1]],
    messages: [
      { id: 1, senderId: 2, text: "Did you see the latest update?", timestamp: "2024-01-15T09:15:00Z", status: 'read', type: 'text' },
    ],
    lastMessage: { id: 1, senderId: 2, text: "Did you see the latest update?", timestamp: "2024-01-15T09:15:00Z", status: 'delivered', type: 'text' },
    unreadCount: 1,
    isGroup: false
  },
    {
    id: 3,
    participants: [mockUsers[2]],
    messages: [{ id: 1, senderId: 3, text: "Team meeting at 3 PM today", timestamp: "2024-01-15T08:00:00Z", status: 'read', type: 'text' }],
    lastMessage: { id: 1, senderId: 3, text: "Team meeting at 3 PM today", timestamp: "2024-01-15T08:00:00Z", status: 'read', type: 'text' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 4,
    participants: [mockUsers[3]],
    messages: [{ id: 1, senderId: 4, text: "Let's catch up tomorrow!", timestamp: "2024-01-14T18:00:00Z", status: 'read', type: 'text' }],
    lastMessage: { id: 1, senderId: 4, text: "Let's catch up tomorrow!", timestamp: "2024-01-14T18:00:00Z", status: 'read', type: 'text' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 5,
    participants: [mockUsers[4]],
    messages: [{ id: 1, senderId: 5, text: "Can you review my PR?", timestamp: "2024-01-15T11:30:00Z", status: 'sent', type: 'text' }],
    lastMessage: { id: 1, senderId: 5, text: "Can you review my PR?", timestamp: "2024-01-15T11:30:00Z", status: 'sent', type: 'text' },
    unreadCount: 3,
    isGroup: false
  },
  {
    id: 6,
    participants: [mockUsers[5]],
    messages: [{ id: 1, senderId: 6, text: "Happy Friday!", timestamp: "2024-01-12T17:00:00Z", status: 'read', type: 'text' }],
    lastMessage: { id: 1, senderId: 6, text: "Happy Friday!", timestamp: "2024-01-12T17:00:00Z", status: 'read', type: 'text' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 7,
    participants: [mockUsers[6]],
    messages: [{ id: 1, senderId: 7, text: "img.png", timestamp: "2024-01-15T12:00:00Z", status: 'read', type: 'image' }],
    lastMessage: { id: 1, senderId: 7, text: "img.png", timestamp: "2024-01-15T12:00:00Z", status: 'read', type: 'image' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 8,
    participants: [mockUsers[7]],
    messages: [{ id: 1, senderId: 8, text: "See you at the conference.", timestamp: "2024-01-13T14:20:00Z", status: 'read', type: 'text' }],
    lastMessage: { id: 1, senderId: 8, text: "See you at the conference.", timestamp: "2024-01-13T14:20:00Z", status: 'read', type: 'text' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 9,
    participants: [mockUsers[8]],
    messages: [{ id: 1, senderId: 9, text: "Thank you!", timestamp: "2024-01-15T13:00:00Z", status: 'read', type: 'text' }],
    lastMessage: { id: 1, senderId: 9, text: "Thank you!", timestamp: "2024-01-15T13:00:00Z", status: 'read', type: 'text' },
    unreadCount: 5,
    isGroup: false
  },
  {
    id: 10,
    participants: [mockUsers[9]],
    messages: [{ id: 1, senderId: 10, text: "You there?", timestamp: "2024-01-15T14:00:00Z", status: 'delivered', type: 'text' }],
    lastMessage: { id: 1, senderId: 10, text: "You there?", timestamp: "2024-01-15T14:00:00Z", status: 'delivered', type: 'text' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 11,
    participants: [mockUsers[10]],
    messages: [{ id: 1, senderId: 11, text: "Let's connect later.", timestamp: "2024-01-15T15:00:00Z", status: 'read', type: 'text' }],
    lastMessage: { id: 1, senderId: 11, text: "Let's connect later.", timestamp: "2024-01-15T15:00:00Z", status: 'read', type: 'text' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 12,
    participants: [mockUsers[11]],
    messages: [{ id: 1, senderId: 12, text: "What's the plan for weekend?", timestamp: "2024-01-15T16:00:00Z", status: 'read', type: 'text' }],
    lastMessage: { id: 1, senderId: 12, text: "What's the plan for weekend?", timestamp: "2024-01-15T16:00:00Z", status: 'read', type: 'text' },
    unreadCount: 1,
    isGroup: false
  },
  {
    id: 13,
    participants: [mockUsers[12]],
    messages: [{ id: 1, senderId: 13, text: "I've sent you the files.", timestamp: "2024-01-15T17:00:00Z", status: 'delivered', type: 'text' }],
    lastMessage: { id: 1, senderId: 13, text: "I've sent you the files.", timestamp: "2024-01-15T17:00:00Z", status: 'delivered', type: 'text' },
    unreadCount: 0,
    isGroup: false
  },
  {
    id: 14,
    participants: [mockUsers[13]],
    messages: [{ id: 1, senderId: 14, text: "Running late, be there in 10.", timestamp: "2024-01-15T18:00:00Z", status: 'read', type: 'text' }],
    lastMessage: { id: 1, senderId: 14, text: "Running late, be there in 10.", timestamp: "2024-01-15T18:00:00Z", status: 'read', type: 'text' },
    unreadCount: 2,
    isGroup: false
  },
  {
    id: 15,
    participants: [mockUsers[14]],
    messages: [{ id: 1, senderId: 15, text: "Good morning!", timestamp: "2024-01-16T09:00:00Z", status: 'sent', type: 'text' }],
    lastMessage: { id: 1, senderId: 15, text: "Good morning!", timestamp: "2024-01-16T09:00:00Z", status: 'sent', type: 'text' },
    unreadCount: 0,
    isGroup: false
  }
];

// Message Status Component
const MessageStatus: React.FC<{ status: Message['status'] }> = ({ status }) => {
  switch (status) {
    case 'sending':
      return <span className="text-gray-400">⏳</span>;
    case 'sent':
      return <span className="text-gray-400">✓</span>;
    case 'delivered':
      return <span className="text-blue-400">✓✓</span>;
    case 'read':
      return <span className="text-blue-500">✓✓</span>;
    case 'error':
      return <span className="text-red-400">✗</span>;
    default:
      return null;
  }
};

const ChatPageDesktop: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !selectedChat) return;

    const newMessageData: Message = {
      id: Date.now(),
      senderId: 0, // Assuming current user's ID is 0
      text: text.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text',
    };

    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id
        ? {
          ...chat,
          messages: [...chat.messages, newMessageData],
          lastMessage: newMessageData,
        }
        : chat
    );

    setChats(updatedChats);
    setSelectedChat(updatedChats.find(chat => chat.id === selectedChat.id) || null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'image' | 'file') => {
    const file = e.target.files?.[0];
    if (!file || !selectedChat) return;

    const sendMessage = (message: Message) => {
      const updatedChats = chats.map(chat =>
        chat.id === selectedChat.id
          ? {
            ...chat,
            messages: [...chat.messages, message],
            lastMessage: message,
          }
          : chat
      );
      setChats(updatedChats);
      setSelectedChat(updatedChats.find(chat => chat.id === selectedChat.id) || null);
      if (e.target) e.target.value = '';
    };

    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFileMessage: Message = {
          id: Date.now(),
          senderId: 0,
          text: file.name,
          timestamp: new Date().toISOString(),
          status: 'sent',
          type: 'image',
          url: reader.result as string,
        };
        sendMessage(newFileMessage);
      };
      reader.readAsDataURL(file);
    } else {
      const newFileMessage: Message = {
        id: Date.now(),
        senderId: 0,
        text: file.name,
        timestamp: new Date().toISOString(),
        status: 'sent',
        type: 'file',
      };
      sendMessage(newFileMessage);
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatLastMessage = (message?: Message) => {
    if (!message) return "No messages yet";
    if (message.type === 'image') return `📷 ${message.text}`;
    if (message.type === 'file') return `📄 ${message.text}`;
    return message.text.length > 30 ? message.text.substring(0, 30) + "..." : message.text;
  };

  const filteredChats = chats.filter(chat => {
    const searchTerm = search.toLowerCase();
    const chatName = chat.isGroup ? chat.groupName : chat.participants[0]?.name;
    return chatName?.toLowerCase().includes(searchTerm);
  });

  const sortedChats = filteredChats.sort((a, b) => {
    if (!a.lastMessage || !b.lastMessage) return 0;
    return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
  });

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] bg-gray-900 mt-16">
        {/* Chat List Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
          {/* Search Header */}
          <div className="p-3 border-b border-gray-700 flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-900 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {sortedChats.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No conversations found.</div>
            ) : (
              sortedChats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`w-full text-left flex items-center gap-4 px-6 py-4 transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-blue-600/20' : 'hover:bg-gray-700/50'
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={chat.isGroup ? chat.groupAvatar : chat.participants[0]?.avatar} 
                      alt={chat.isGroup ? chat.groupName : chat.participants[0]?.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {!chat.isGroup && chat.participants[0] && (
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(chat.participants[0].status)}`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white truncate text-base">
                        {chat.isGroup ? chat.groupName : chat.participants[0]?.name}
                      </h4>
                      {chat.lastMessage && (
                        <span className="text-xs text-gray-400 ml-2">
                          {formatTime(chat.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate mt-1">
                      {formatLastMessage(chat.lastMessage)}
                    </p>
                  </div>
                  
                  {chat.unreadCount > 0 && (
                    <div className="bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col h-full">
          {selectedChat ? (
            <>
              {/* Chat Header - Fixed */}
              <div className="flex items-center px-8 py-2 border-b border-gray-700 bg-gray-800 flex-shrink-0">
                <div className="flex items-center flex-1">
                  <div className="relative">
                    <img 
                      src={selectedChat.isGroup ? selectedChat.groupAvatar : selectedChat.participants[0]?.avatar} 
                      alt={selectedChat.isGroup ? selectedChat.groupName : selectedChat.participants[0]?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {!selectedChat.isGroup && selectedChat.participants[0] && (
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(selectedChat.participants[0].status)}`} />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-white text-lg">
                      {selectedChat.isGroup ? selectedChat.groupName : selectedChat.participants[0]?.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {!selectedChat.isGroup && selectedChat.participants[0]?.status === 'online' ? 'Online' : 
                       !selectedChat.isGroup && selectedChat.participants[0]?.lastSeen ? `Last seen ${selectedChat.participants[0].lastSeen}` :
                       selectedChat.isGroup ? `${selectedChat.participants.length} members` : 'Offline'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Area - Scrollable */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-8 space-y-6">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl ${
                        message.senderId === 0 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-white'
                      }`}>
                        <div className="px-6 py-3">
                          {message.type === 'text' ? (
                            <p className="text-base leading-relaxed">{message.text}</p>
                          ) : message.type === 'image' && message.url ? (
                            <a href={message.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                              <img src={message.url} alt={message.text} className="rounded-lg max-w-xs max-h-64 object-cover" />
                            </a>
                          ) : (
                            <div className="flex items-center gap-3 font-medium">
                              {message.type === 'image' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                              <span className="underline cursor-pointer hover:no-underline">{message.text}</span>
                            </div>
                          )}
                        </div>
                        <div className={`flex items-center justify-between text-xs px-6 pb-3 ${
                          message.senderId === 0 ? 'text-blue-200' : 'text-gray-400'
                        }`}>
                          <span>{formatTime(message.timestamp)}</span>
                          {message.senderId === 0 && (
                            <div className="ml-3">
                              <MessageStatus status={message.status} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input - Fixed */}
              <div className="p-4 border-t border-gray-700 bg-gray-900 flex-shrink-0">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (newMessage.trim()) {
                    handleSendMessage(newMessage);
                    setNewMessage('');
                  }
                }}>
                  <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
                  <input type="file" ref={docInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'file')} />
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-4">
                          <button type="button" onClick={() => imageInputRef.current?.click()} className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </button>
                          <button type="button" onClick={() => docInputRef.current?.click()} className="text-gray-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3.375 3.375 0 0119.5 7.372l-10.94 10.94a2.25 2.25 0 01-3.182-3.182l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a1.125 1.125 0 001.591 1.591l10.94-10.94a2.25 2.25 0 00-3.182-3.182L5.625 14.125a3.375 3.375 0 004.773 4.773l7.693-7.693a.75.75 0 011.06-1.06z" />
                            </svg>
                          </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 w-full pl-24 pr-6 py-4 bg-gray-700 text-white rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none text-base"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-20 h-20 mx-auto mb-6 text-6xl">💬</div>
                <h3 className="text-2xl font-semibold mb-3">Select a conversation</h3>
                <p className="text-lg">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.2); border-radius: 20px; border: 3px solid transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(156, 163, 175, 0.4); }
      `}</style>
    </>
  );
};

export default ChatPageDesktop; 