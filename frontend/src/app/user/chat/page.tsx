'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { constants } from "fs";
import { HeartIcon, UsersIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { useSession} from '@clerk/nextjs'

import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-react'
import { time } from "console";

const socket: Socket = io("http://localhost:3001"); //FIXME


export default function Home() {        

    const [message,setMessage] = useState<String>("")
    const [messageReceived, setMessageReceived] = useState<Array<string>>([])
    const { isSignedIn, user, isLoaded } = useUser()

    
    const sendMessage= () =>{
        const currentTime = Date.now();
        socket.emit("send_message", {user: user?.fullName, id: user?.id, message: message, time: currentTime});
        console.log(user?.fullName);
    }

    useEffect(() => {
        socket.on("receive_message", (data) =>
        {
            setMessageReceived((prev) => {return [...prev,data.user+":"+data.message+" @ "+data.time.toString()]});
        }
        )
    }, [socket])

    return (
        <>
        <div>
            <input placeholder ="message..." onChange={(e) => {setMessage(e.currentTarget.value)}}
            />
            <button onClick={sendMessage}> Send Message</button>
            <h2>
                Username: {user?.fullName}
            </h2>
            <h1>
                Message:
            </h1>
            <ul>
                {messageReceived.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
        </>
    );
}