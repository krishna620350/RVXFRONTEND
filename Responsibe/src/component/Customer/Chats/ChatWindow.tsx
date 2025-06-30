import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Mock chat members and messages
const mockChats = [
	{
		id: 1,
		name: "Alice Johnson",
		avatar: "https://randomuser.me/api/portraits/women/1.jpg",
		messages: [
			{ id: 1, sender: "Alice Johnson", text: "Hey! How are you?" },
			{ id: 2, sender: "You", text: "I'm good, thanks! How about you?" },
			{ id: 3, sender: "Alice Johnson", text: "Doing well!" },
		],
	},
	{
		id: 2,
		name: "Bob Smith",
		avatar: "https://randomuser.me/api/portraits/men/2.jpg",
		messages: [
			{ id: 1, sender: "Bob Smith", text: "Did you see the latest update?" },
			{ id: 2, sender: "You", text: "Yes, looks great!" },
			{ id: 3, sender: "Bob Smith", text: "Awesome!" },
		],
	},
	{
		id: 3,
		name: "Carol Lee",
		avatar: "https://randomuser.me/api/portraits/women/3.jpg",
		messages: [
			{ id: 1, sender: "Carol Lee", text: "Let's catch up soon." },
			{ id: 2, sender: "You", text: "Sure, let me know when!" },
		],
	},
	{
		id: 4,
		name: "David Kim",
		avatar: "https://randomuser.me/api/portraits/men/4.jpg",
		messages: [
			{ id: 1, sender: "David Kim", text: "Yo! Are you coming to the party?" },
			{ id: 2, sender: "You", text: "Maybe! Who else is going?" },
			{ id: 3, sender: "David Kim", text: "A bunch of friends from school." },
		],
	},
	{
		id: 5,
		name: "Emily Chen",
		avatar: "https://randomuser.me/api/portraits/women/5.jpg",
		messages: [
			{ id: 1, sender: "Emily Chen", text: "Can you send me the notes?" },
			{ id: 2, sender: "You", text: "Sure, I'll send them now." },
			{ id: 3, sender: "Emily Chen", text: "Thanks a lot!" },
		],
	},
	{
		id: 6,
		name: "Frank Miller",
		avatar: "https://randomuser.me/api/portraits/men/6.jpg",
		messages: [
			{ id: 1, sender: "Frank Miller", text: "Did you finish the project?" },
			{ id: 2, sender: "You", text: "Almost done!" },
			{ id: 3, sender: "Frank Miller", text: "Let me know if you need help." },
		],
	},
];

const ChatWindow: React.FC = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const friendID = params.get("friend");
	const friendIdNum = friendID ? Number(friendID) : undefined;

	const [selectedChatId, setSelectedChatId] = useState(() => {
		if (friendIdNum) {
			const found = mockChats.find((c) => c.id === friendIdNum);
			return found ? found.id : mockChats[0].id;
		}
		return mockChats[0].id;
	});
	const [input, setInput] = useState("");
	const [chats, setChats] = useState(mockChats);
	const [unreadCounts, setUnreadCounts] = useState<{ [id: number]: number }>(
		() => {
			const counts: { [id: number]: number } = {};
			chats.forEach((chat) => {
				counts[chat.id] = chat.id === selectedChatId ? 0 : Math.floor(Math.random() * 4);
			});
			return counts;
		}
	);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const chatWindowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Update selected chat if URL changes
		if (friendIdNum) {
			const found = chats.find((c) => c.id === friendIdNum);
			if (found && found.id !== selectedChatId) {
				setSelectedChatId(found.id);
			}
		}
	}, [friendIdNum, chats, selectedChatId]);

	const selectedChat = chats.find((c) => c.id === selectedChatId)!;

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [selectedChat.messages]);

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;
		setChats((prevChats) =>
			prevChats.map((chat) =>
				chat.id === selectedChatId
					? {
							...chat,
							messages: [
								...chat.messages,
								{ id: chat.messages.length + 1, sender: "You", text: input },
							],
					  }
					: chat
			)
		);
		setInput("");
	};

	// Sort chats: by latest message id (descending), active chat stays in its sorted position
	const sortedChats = chats
		.slice()
		.sort((a, b) => {
			const aLast = a.messages[a.messages.length - 1]?.id || 0;
			const bLast = b.messages[b.messages.length - 1]?.id || 0;
			return bLast - aLast;
		});

	return (
		<div
			ref={chatWindowRef}
			className="fixed inset-0 flex flex-col md:flex-row w-full h-full bg-[#181f2a] rounded-none shadow-none border-none overflow-hidden z-50"
		>
			{/* Left panel: chat members */}
			<div className="w-full md:w-64 bg-[#232b3a] border-b md:border-b-0 md:border-r border-gray-700 flex flex-row md:flex-col">
				<div className="p-4 font-bold text-white text-lg border-b border-gray-700 md:border-b-0 md:border-r">
					Chats
				</div>
				<div className="flex-1 overflow-y-auto flex flex-row md:flex-col">
					{sortedChats.map((chat) => {
						const lastMsg = chat.messages[chat.messages.length - 1];
						const unread = unreadCounts[chat.id] || 0;
						return (
							<div
								key={chat.id}
								className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#202736] ${
									selectedChatId === chat.id ? "bg-[#202736]" : ""
								}`}
								onClick={() => {
									setSelectedChatId(chat.id);
									setUnreadCounts((prev) => ({ ...prev, [chat.id]: 0 }));
								}}
							>
								<img
									src={chat.avatar}
									alt={chat.name}
									className="w-10 h-10 rounded-full object-cover"
								/>
								<div className="flex-1 min-w-0">
									<div className="font-semibold text-white truncate flex items-center">
										{chat.name}
										{unread > 0 && (
											<span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
												{unread}
											</span>
										)}
									</div>
									<div className="text-xs text-gray-400 truncate">
										{lastMsg.text}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{/* Right panel: conversation */}
			<div className="flex-1 flex flex-col min-h-0">
				<div className="p-4 border-b border-gray-700 flex items-center gap-3 bg-[#232b3a]">
					<img
						src={selectedChat.avatar}
						alt={selectedChat.name}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div className="font-semibold text-white text-lg">
						{selectedChat.name}
					</div>
					<button
						type="button"
						className="ml-auto px-3 py-1 text-xs bg-blue-700 text-white rounded hover:bg-blue-600 transition"
						onClick={() => {
							if (document.fullscreenElement) {
								document.exitFullscreen();
							} else {
								chatWindowRef.current?.requestFullscreen();
							}
						}}
						title="Fill Screen"
					>
						Fill Screen
					</button>
				</div>
				<div
					className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-4 space-y-2 text-sm text-white bg-[#181f2a]"
					id="chat-fullscreen-panel"
				>
					{selectedChat.messages.map((msg) => (
						<div
							key={msg.id}
							className={msg.sender === "You" ? "text-right" : "text-left"}
						>
							<span
								className={
									msg.sender === "You"
										? "bg-blue-600 text-white px-3 py-1 rounded-2xl inline-block"
										: "bg-gray-700 text-white px-3 py-1 rounded-2xl inline-block"
								}
							>
								{msg.text}
							</span>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
				<form
					onSubmit={handleSend}
					className="flex border-t border-gray-700 bg-[#181f2a]"
				>
					<input
						className="flex-1 px-3 py-2 bg-transparent text-white outline-none"
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message..."
					/>
					<button
						type="submit"
						className="px-4 py-2 text-blue-400 hover:text-blue-200"
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatWindow;
