// app/SportChatLayout.tsx
'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

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
    none: boolean;
}

interface MongoUser {
    success: boolean;
    data: {
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

interface SportChatLayoutProps {
    mongoUser: MongoUser;
}

export default function SportChatLayout({ mongoUser }: SportChatLayoutProps) {
    const [activeRoom, setActiveRoom] = useState<string | null>(null);
    // Change messages to be an object with room IDs as keys
    const [messages, setMessages] = useState<{
        [room: string]: Array<{
            user: string;
            userId: string;
            message: string;
            time: string;
        }>;
    }>({});
    const [message, setMessage] = useState("");
    const [activeUsers, setActiveUsers] = useState<{[room: string]: string[]}>({});

    const SPORTS = [
        'basketball', 'running', 'tennis', 'football', 
        'volleyball', 'badminton', 'swimming', 'yoga', 'gym'
    ];

    useEffect(() => {
        if (activeRoom) {
            // Initialize messages array for new room if it doesn't exist
            if (!messages[activeRoom]) {
                setMessages(prev => ({
                    ...prev,
                    [activeRoom]: []
                }));
            }

            socket.emit("join_room", {
                room: activeRoom,
                userName: mongoUser.data.name,
                userId: mongoUser.data._id
            });
        }

        socket.on("chat_message", (data) => {
            // Add message to the correct room's message array
            setMessages(prev => ({
                ...prev,
                [data.room]: [...(prev[data.room] || []), data]
            }));
        });

        socket.on("active_users", (users) => {
            setActiveUsers(users);
        });

        return () => {
            if (activeRoom) {
                socket.emit("leave_room", activeRoom);
            }
            socket.off("chat_message");
            socket.off("active_users");
        };
    }, [activeRoom, mongoUser.data.name, mongoUser.data._id]);

    const sendMessage = () => {
        if (message.trim() && activeRoom) {
            const messageData = {
                user: mongoUser.data.name,
                userId: mongoUser.data._id,
                message: message.trim(),
                time: new Date().toLocaleTimeString(),
                room: activeRoom
            };
            socket.emit("chat_message", messageData);
            // Add message to the correct room's message array
            setMessages(prev => ({
                ...prev,
                [activeRoom]: [...(prev[activeRoom] || []), messageData]
            }));
            setMessage("");
        }
    };

    return (
        <div className="flex h-[600px] gap-4 p-4">
            {/* Sports sidebar */}
            <div className="w-48 space-y-2">
                {SPORTS.map((sport) => (
                    mongoUser.data.sports[sport] && (
                        <button
                            key={sport}
                            onClick={() => setActiveRoom(sport)}
                            className={`w-full p-2 text-left rounded ${
                                activeRoom === sport 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            {sport.charAt(0).toUpperCase() + sport.slice(1)}
                        </button>
                    )
                ))}
            </div>

            {/* Chat area */}
            {activeRoom ? (
                <div className="flex-1 flex flex-col border rounded-lg">
                    {/* Room header */}
                    <div className="p-3 border-b">
                        <h2 className="font-bold">{activeRoom.charAt(0).toUpperCase() + activeRoom.slice(1)} Chat</h2>
                        <div className="text-sm text-gray-500">
                            Active Users: {activeUsers[activeRoom]?.length || 0}
                        </div>
                    </div>

                    {/* Messages - now showing only messages for the active room */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {messages[activeRoom]?.map((msg, index) => (
                            <div 
                                key={index}
                                className={`${msg.userId === mongoUser.data._id ? 'ml-auto' : ''} 
                                          max-w-[70%] break-words`}
                            >
                                <div className={`rounded-lg p-2 ${
                                    msg.userId === mongoUser.data._id 
                                        ? 'bg-blue-500 text-white ml-auto' 
                                        : 'bg-gray-100'
                                }`}>
                                    <div className="text-sm font-bold">{msg.user}</div>
                                    <div>{msg.message}</div>
                                    <div className="text-xs opacity-75">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input area */}
                    <div className="p-3 border-t">
                        <div className="flex gap-2">
                            <input
                                className="flex-1 p-2 border rounded"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Type a message..."
                            />
                            <button 
                                onClick={sendMessage}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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