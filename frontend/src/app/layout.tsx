"use client";
import { SportProvider, usesport } from './SportContent';
import BASKETBALL from "../../public/basketball.svg";
import RUNNING from "../../public/running.svg";
import TENNIS from "../../public/tennis.svg";
import FOOTBALL from "../../public/football.svg";
import VOLLEYBALL from "../../public/volleyball.svg";
import BADMINTON from "../../public/badminton.svg";
import SWIMMING from "../../public/swimming.svg";
import YOGA from "../../public/yoga.svg";
import GYM from "../../public/gym.svg";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
  useUser,
} from '@clerk/nextjs';
import './globals.css';
import {
  UsersIcon,
  HomeIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserCircleIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as styles from './styles.module.css';
import { useEffect } from 'react';
import ModernNavBar from './ModernNavBar';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SportProvider>
        <html lang="en">
          <body className="flex">
            <MainLayout>{children}</MainLayout>
          </body>
        </html>
      </SportProvider>
    </ClerkProvider>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const { gym } = usesport(); // Access sport state
  const { basketball } = usesport();
  const { running } = usesport();
  const { tennis } = usesport();
  const { football } = usesport();
  const { volleyball } = usesport();
  const { badminton } = usesport();
  const { swimming } = usesport();
  const { yoga } = usesport();
  const { activeRoom, setActiveRoom } = usesport();

  const {signOut} = useClerk();
  const {user} = useUser();

  return (
    <div className="flex w-full">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-blue-500 text-white space-y-8 h-full">
        {/* Button that will direct us to the main page */}
        <Link href="/">
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">BruinSquad</h1>
            </div>
            <p className="text-sm text-blue-200 mt-2">Connect with Bruins</p>
          </div>
        </Link>

        <nav className="">
          {/* Once I click on this, direct me to /profile using Link */}
          { basketball ? ChatNavBar({ activity:"basketball", imageSource:BASKETBALL, activeRoom, setActiveRoom}) : null}

          { running ? ChatNavBar({ activity:"running", imageSource:RUNNING, activeRoom, setActiveRoom}) : null}

          {tennis ? ChatNavBar({ activity:"tennis", imageSource:TENNIS, activeRoom, setActiveRoom}) : null}

          {football ? ChatNavBar({ activity:"football", imageSource:FOOTBALL, activeRoom, setActiveRoom}) : null}

          {volleyball ? ChatNavBar({ activity:"volleyball", imageSource:VOLLEYBALL, activeRoom, setActiveRoom}) : null}

          {badminton ? ChatNavBar({ activity:"badminton", imageSource:BADMINTON, activeRoom, setActiveRoom}) : null}

          {yoga ? ChatNavBar({ activity:"yoga", imageSource:YOGA, activeRoom, setActiveRoom}) : null}

          {swimming ? ChatNavBar({ activity:"swimming", imageSource:SWIMMING, activeRoom, setActiveRoom}) : null}

          {gym ? ChatNavBar({ activity:"gym", imageSource:GYM, activeRoom, setActiveRoom}) : null}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <ModernNavBar user={user} />
        
        {/* Page Content */}
        <main className="p-6 flex-grow w-full">{children}</main>
      </div>
    </div>
  );
} 

interface ChatNavBarProps {
  activity: string; 
  imageSource: any;
  activeRoom: string | null;
  setActiveRoom: (room: string) => void;
}

function ChatNavBar({ activity, imageSource, activeRoom, setActiveRoom}: ChatNavBarProps){
  return(
  <button
    className= {activeRoom == activity
      ? `will-change-[opacity,transform] animate-slideLeftAndFade w-full text-black text-left flex items-center space-x-3 p-2 rounded-l bg-white`
      : `w-full text-left flex items-center space-x-3 p-2 rounded-l hover:bg-blue-600`
    }    
    onClick={() => setActiveRoom(`${activity}`)}
    >
    <Image src={imageSource} alt={`${activity}`} width={50} height={50} />
    <span> {sportsToChatName[`${activity}`]} </span>
    </button>);
}

interface sportToChat {
  [key: string]: string;
}

export const sportsToChatName: sportToChat = {
  "basketball" : "League of Ballers",
  "running" : "Run Forest Run",
  "tennis" : "The Smash Bros",
  "football" : "Touchdown Town",
  "volleyball" : "Set, Spike, Repeat",
  "badminton" : "Badminton Group Chat",
  "swimming" : "The Pool Sharks",
  "yoga" : "Mat Chat Crew",
  "gym" : "Gym Bros",
}