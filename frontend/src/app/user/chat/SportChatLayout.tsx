'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SportProvider, usesport } from "@/app/SportContent";

const socket = io("http://localhost:3001");

interface Sports {
    basketball: boolean;
    running: boolean;
    tennis: boolean;
    football: boolean;
    volleyball: boolean;
    badminton: boolean;
    swimming: boolean;
    yoga: boolean;
    gym: boolean;
}

interface MongoUser {
    success: boolean;
    user: {
        _id: string;
        email: string;
        profileImage: string;
        name: string;
        sports: Sports;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
}

// Interface for messages as they come from the database
interface DatabaseMessage {
    userId: string;
    username: string;
    message: string;
    timestamp: Date;
}

interface ChatMessage {
    userId: string;
    user: string;
    message: string;
    time: string;
    timestamp?: Date;
}

interface SportChatLayoutProps {
    mongoUser: MongoUser;
}

interface MessagesByRoom {
    [room: string]: Array<ChatMessage>;
}

interface ActiveUsers {
    [room: string]: string[];
}

const SPORTS = [
    'basketball', 'running', 'tennis', 'football', 
    'volleyball', 'badminton', 'swimming', 'yoga', 'gym'
] as const;

type Sport = typeof SPORTS[number];

export default function SportChatLayout({ mongoUser }: SportChatLayoutProps) {
    const {activeRoom, setActiveRoom} = usesport();
    const [messages, setMessages] = useState<MessagesByRoom>({});
    const [message, setMessage] = useState<string>("");
    const [activeUsers, setActiveUsers] = useState<ActiveUsers>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const fetchMessages = async (room: string): Promise<void> => {
        try {
            console.log('Fetching messages for room:', room);
            const response = await fetch(`http://localhost:4000/api/chat/${room}`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            
            // Convert messages using the DatabaseMessage interface
            const formattedMessages: ChatMessage[] = data.chatMessages.map((msg: DatabaseMessage) => ({
                userId: msg.userId,
                user: msg.username,
                message: msg.message,
                time: new Date(msg.timestamp).toLocaleTimeString(),
                timestamp: msg.timestamp
            }));

            setMessages(prev => ({
                ...prev,
                [room]: formattedMessages
            }));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        if (activeRoom) {
            setIsLoading(true);
            // Fetch existing messages when entering a room
            fetchMessages(activeRoom).finally(() => setIsLoading(false));

            // Join the room
            socket.emit("join_room", {
                room: activeRoom,
                userName: mongoUser.user.name,
                userId: mongoUser.user._id
            });
        }

        // Listen for new messages
        const handleChatMessage = (data: ChatMessage & { room: string }) => {
            setMessages(prev => ({
                ...prev,
                [data.room]: [...(prev[data.room] || []), {
                    userId: data.userId,
                    user: data.user,
                    message: data.message,
                    time: data.time,
                    timestamp: new Date()
                }]
            }));
        };

        // Listen for active users updates
        const handleActiveUsers = (users: ActiveUsers) => {
            setActiveUsers(users);
        };

        socket.on("chat_message", handleChatMessage);
        socket.on("active_users", handleActiveUsers);

        return () => {
            if (activeRoom) {
                socket.emit("leave_room", activeRoom);
            }
            socket.off("chat_message", handleChatMessage);
            socket.off("active_users", handleActiveUsers);
        };
    }, [activeRoom, mongoUser.user.name, mongoUser.user._id]);

    const sendMessage = async (): Promise<void> => {
        if (message.trim() && activeRoom) {
            const currentTime = new Date();
            const messageData: ChatMessage & { room: string } = {
                user: mongoUser.user.name,
                userId: mongoUser.user._id,
                message: message.trim(),
                time: currentTime.toLocaleTimeString(),
                room: activeRoom,
                timestamp: currentTime
            };

            // Send to socket for real-time updates
            socket.emit("chat_message", messageData);

            // Save to database
            try {
                console.log('Sending message:', messageData);
                await fetch('http://localhost:4000/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sport: activeRoom,
                        message: message.trim(),
                        userId: mongoUser.user._id,
                        username: mongoUser.user.name
                    })
                });
            } catch (error) {
                console.error('Error saving message:', error);
            }

            // Update local state
            setMessages(prev => ({
                ...prev,
                [activeRoom]: [...(prev[activeRoom] || []), messageData]
            }));
            setMessage("");
        }
    };

    const renderSportButton = (sport: Sport) => {
        if (mongoUser.user.sports[sport]) {
            return (
                <button
                    key={sport}
                    onClick={() => setActiveRoom(sport)}
                    className={`w-full p-2 text-left rounded transition-colors
                        ${activeRoom === sport 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    {sport.charAt(0).toUpperCase() + sport.slice(1)}
                </button>
            );
        }
        return null;
    };

    if (!mongoUser || !mongoUser.user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="flex h-[600px] gap-4 p-4">
            {/* Sports sidebar */}
            {/* <div className="w-48 space-y-2">
                {SPORTS.map((sport) => renderSportButton(sport))}
            </div> */}

            {/* Chat area */}
            {activeRoom ? (
                <div className="flex-1 flex flex-col border rounded-lg">
                    {/* Room header */}
                    <div className="p-3 border-b bg-gray-50">
                        <h2 className="font-bold text-lg">
                            {activeRoom.charAt(0).toUpperCase() + activeRoom.slice(1)} Chat
                        </h2>
                        <div className="text-sm text-gray-500">
                            Active Users: {activeUsers[activeRoom]?.length || 0}
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-gray-500">Loading messages...</div>
                            </div>
                        ) : messages[activeRoom]?.length === 0 ? (
                            <div className="text-center text-gray-500 mt-4">
                                No messages yet. Start the conversation!
                            </div>
                        ) : (
                            messages[activeRoom]?.map((message: ChatMessage, index: number) => (
                                <div 
                                    key={index}
                                    className={`${message.userId === mongoUser.user._id ? 'ml-auto' : ''} 
                                              max-w-[70%] break-words`}
                                >
                                    <div className={`rounded-lg p-2 ${
                                        message.userId === mongoUser.user._id 
                                            ? 'bg-blue-500 text-white ml-auto' 
                                            : 'bg-gray-100'
                                    }`}>
                                        <div className="text-sm font-bold">{message.user}</div>
                                        <div>{message.message}</div>
                                        <div className="text-xs opacity-75">{message.time}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input area */}
                    <div className="p-3 border-t bg-gray-50">
                        <div className="flex gap-2">
                            <input
                                className="flex-1 p-2 border rounded"
                                value={message}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                    setMessage(e.target.value)}
                                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => 
                                    e.key === 'Enter' && sendMessage()}
                                placeholder="Type a message..."
                            />
                            <button 
                                onClick={sendMessage}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!message.trim()}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a sport to join its chat room
                </div>
            )}
        </div>
    );
}