import React, { useState, useRef } from "react";
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

// Mock data (same as desktop)
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

const MessageStatus: React.FC<{ status: Message['status'] }> = ({ status }) => {
  switch (status) {
    case 'sending': return <span className="text-gray-400">⏳</span>;
    case 'sent': return <span className="text-gray-400">✓</span>;
    case 'delivered': return <span className="text-blue-400">✓✓</span>;
    case 'read': return <span className="text-blue-500">✓✓</span>;
    case 'error': return <span className="text-red-400">✗</span>;
    default: return null;
  }
};

const ChatPageMobile: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !selectedChat) return;

    const newMessageData: Message = {
      id: Date.now(),
      senderId: 0,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text',
    };

    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, messages: [...chat.messages, newMessageData], lastMessage: newMessageData }
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
          ? { ...chat, messages: [...chat.messages, message], lastMessage: message }
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

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleBackToChatList = () => {
    setSelectedChat(null);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Chat list view
  if (!selectedChat) {
    return (
      <div className="w-full bg-gray-900 flex flex-col" style={{ height: 'var(--app-height)' }}>
        <Navbar />
        <div className="flex-1 overflow-y-auto pt-16">
          <h2 className="text-xl font-bold text-white px-4 pt-6 pb-2">Chats</h2>
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              className="w-full flex items-center gap-4 px-4 py-3 border-b border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={() => handleChatSelect(chat)}
            >
              <img
                src={chat.isGroup ? chat.groupAvatar : chat.participants[0]?.avatar}
                alt={chat.isGroup ? chat.groupName : chat.participants[0]?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white truncate">
                    {chat.isGroup ? chat.groupName : chat.participants[0]?.name}
                  </span>
                  {chat.lastMessage && (
                    <span className="text-xs text-gray-400 ml-2">
                      {formatTime(chat.lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 truncate mt-1">
                  {chat.lastMessage?.type === 'image' ? `📷 ${chat.lastMessage.text}` :
                   chat.lastMessage?.type === 'file' ? `📄 ${chat.lastMessage.text}` :
                   chat.lastMessage?.text}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Chat conversation view
  return (
    <div className="w-full bg-gray-900 flex flex-col" style={{ height: 'var(--app-height)' }}>
      <Navbar />
      {/* Chat header */}
      <div className="bg-gray-800 border-b border-gray-800 flex items-center gap-3 px-4 py-3 shadow-md h-16 flex-shrink-0 mt-16">
        <button
           className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600"
          onClick={handleBackToChatList}
        >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <img
          src={selectedChat.isGroup ? selectedChat.groupAvatar : selectedChat.participants[0]?.avatar}
          alt={selectedChat.isGroup ? selectedChat.groupName : selectedChat.participants[0]?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="font-semibold text-white">
            {selectedChat.isGroup ? selectedChat.groupName : selectedChat.participants[0]?.name}
        </div>
      </div>
    
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {selectedChat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl ${message.senderId === 0 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
              <div className="px-4 py-2">
                {message.type === 'text' ? (
                  <p className="text-sm">{message.text}</p>
                ) : message.type === 'image' && message.url ? (
                  <a href={message.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <img src={message.url} alt={message.text} className="rounded-lg max-w-full max-h-64 object-cover" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2 font-medium">
                    {message.type === 'image' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    <span className="underline cursor-pointer hover:no-underline text-sm">{message.text}</span>
                  </div>
                )}
              </div>
              <div className={`flex items-center justify-end text-xs mt-1 px-4 pb-2 ${message.senderId === 0 ? 'text-blue-200' : 'text-gray-400'}`}>
                <span>{formatTime(message.timestamp)}</span>
                {message.senderId === 0 && (
                  <span className="ml-2"><MessageStatus status={message.status} /></span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-3 flex-shrink-0">
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem("message") as HTMLInputElement;
            if (input.value.trim()) {
              handleSendMessage(input.value);
              input.value = "";
            }
          }}
        >
          <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
          <input type="file" ref={docInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'file')} />
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-2">
              <button type="button" onClick={() => imageInputRef.current?.click()} className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
              <button type="button" onClick={() => docInputRef.current?.click()} className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3.375 3.375 0 0119.5 7.372l-10.94 10.94a2.25 2.25 0 01-3.182-3.182l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a1.125 1.125 0 001.591 1.591l10.94-10.94a2.25 2.25 0 00-3.182-3.182L5.625 14.125a3.375 3.375 0 004.773 4.773l7.693-7.693a.75.75 0 011.06-1.06z" />
                </svg>
              </button>
            </div>
          <input
              name="message"
            type="text"
            placeholder="Type a message..."
              className="flex-1 w-full bg-gray-700 rounded-full pl-16 pr-4 py-2 text-white focus:outline-none"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPageMobile; 