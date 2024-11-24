'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { constants } from "fs";
import { HeartIcon, UsersIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";

import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const socket: Socket = io("http://localhost:3001");

export default function Home() {
    const [message,setMessage] = useState<String>("")
    const [messageReceived, setMessageReceived] = useState<Array<string>>([])

    const sendMessage= () =>{
        socket.emit("send_message", {message: message});
    }

    useEffect(() => {
        socket.on("receive_message", (data) =>
        {
            setMessageReceived((prev) => {return [...prev,data.message]})
        }
        )
    }, [socket])

    return (
        <>
        <div>
            <input placeholder ="message..." onChange={(e) => {setMessage(e.currentTarget.value)}}
            />
            <button onClick={sendMessage}> Send Message</button>
            <h1>
                Message:
            </h1>
            {messageReceived}
        </div>
        </>
    );
}