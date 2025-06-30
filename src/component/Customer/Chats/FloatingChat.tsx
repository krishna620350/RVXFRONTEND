import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../../hooks/useResponsive';
import './FloatingChat.css';

interface Message {
  sender: string;
  type: 'text' | 'image' | 'file';
  content: string | File;
  fileName?: string;
}

const friends = [
  { id: 1, name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 3, name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
];

const initialMessages: { [key: number]: Message[] } = {
  1: [
    { sender: 'Alice', type: 'text', content: 'Hey, how are you?' },
    { sender: 'Me', type: 'text', content: 'I am good, thanks!' }
  ],
  2: [
    { sender: 'Bob', type: 'text', content: 'Wanna hang out?' },
  ],
  3: [],
}

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const isMobile = useResponsive();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderMessageContent = (msg: Message): React.ReactNode => {
    if (msg.type === 'text') {
      return msg.content as string;
    }
    if (msg.content instanceof File) {
      const url = URL.createObjectURL(msg.content);
      if (msg.type === 'image') {
        return <img src={url} alt={msg.fileName} className="message-image" />;
      }
      if (msg.type === 'file') {
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className="message-file">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M15.5 14h-11a1.5 1.5 0 01-1.5-1.5V7.5a1.5 1.5 0 011.5-1.5h11a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5zM14 8H6v4h8V8z"></path></svg>
            {msg.fileName}
          </a>
        );
      }
    }
    return null;
  };

  const toggleChat = () => {
    if (isMobile) {
      navigate('/chat');
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = { sender: 'Me', type: 'text', content: inputValue.trim() };
    const newMessages = { ...chatMessages };
    newMessages[selectedFriend.id] = [...newMessages[selectedFriend.id], newMessage];

    setChatMessages(newMessages);
    setInputValue('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newMessage: Message = {
      sender: 'Me',
      type: file.type.startsWith('image/') ? 'image' : 'file',
      content: file,
      fileName: file.name,
    };
    const newMessages = { ...chatMessages };
    newMessages[selectedFriend.id] = [...newMessages[selectedFriend.id], newMessage];
    setChatMessages(newMessages);
  };

  const handleOpenInFullScreen = () => {
    navigate('/chat');
  };

  return (
    <div className={`floating-chat ${isOpen ? 'open' : ''}`}>
      <div className="chat-header" onClick={!isOpen ? toggleChat : undefined}>
        {isOpen ? (
          <>
            <h3>{selectedFriend.name}</h3>
            <div className="chat-actions">
              <button onClick={(e) => { e.stopPropagation(); handleOpenInFullScreen(); }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
                </svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="chat-icon-container">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        )}
      </div>
      <div className="chat-body">
        <div className="friend-list">
          {friends.map(friend => (
            <div 
              key={friend.id} 
              className={`friend ${selectedFriend.id === friend.id ? 'selected' : ''}`}
              onClick={() => setSelectedFriend(friend)}
            >
              <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
              <span>{friend.name}</span>
            </div>
          ))}
        </div>
        <div className="chat-main">
          <div className="chat-messages">
            {chatMessages[selectedFriend.id].map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'Me' ? 'sent' : 'received'}`}>
                  {renderMessageContent(msg)}
                </div>
              ))}
          </div>
          <div className="chat-input">
             <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <button onClick={() => imageInputRef.current?.click()} className="icon-button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m5-2a2 2 0 100-4 2 2 0 000 4z"></path></svg>
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="icon-button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="icon-button">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.922 2.019a.5.5 0 01.657-.024l13.999 8.001a.5.5 0 010 .869l-13.999 8a.5.5 0 01-.814-.434V2.453a.5.5 0 01.157-.434z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingChat; 