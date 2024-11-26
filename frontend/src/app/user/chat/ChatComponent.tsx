'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

interface ChatComponentProps {
  userName: string;
  userId: string;
}

export default function ChatComponent({ userName, userId }: ChatComponentProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Array<{
        user: string;
        userId: string;
        message: string;
        time: string;
    }>>([]);

    const sendMessage = () => {
        if (message.trim()) {
            const messageData = {
                user: userName,
                userId: userId,
                message: message,
                time: new Date().toLocaleTimeString()
            };
            socket.emit("chat_message", messageData);
            setMessages(prev => [...prev, messageData]);
            setMessage(""); // Clear input after sending
        }
    };

    useEffect(() => {
        // Listen for incoming messages
        socket.on("chat_message", (data) => {
            setMessages(prev => [...prev, data]);
        });

        // Cleanup on unmount
        return () => {
            socket.off("chat_message");
        };
    }, []);

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="flex gap-2 mb-4">
                <input
                    className="flex-1 p-2 border rounded"
                    value={message}
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
            
            <div className="border rounded p-4 h-[400px] overflow-y-auto">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`mb-2 ${msg.userId === userId ? 'text-right' : ''}`}
                    >
                        <span className="font-bold">{msg.user}</span>
                        <span className="text-gray-500 text-sm"> {msg.time}</span>
                        <p className={`${msg.userId === userId ? 'bg-blue-100' : 'bg-gray-100'} 
                                    inline-block p-2 rounded`}>
                            {msg.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}