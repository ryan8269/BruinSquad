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
              <h1 className="text-2xl font-bold">BruinMatch</h1>
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
      <div className="flex-1 flex flex-col w-full"> {/* Add w-full here */}
        {/* Authentication Controls */}
        <div className="bg-yellow-400 flex min-h-[60px]">
          <div className="grid grid-cols-10 w-full h-full">
              <TopNavBar button_href='/user/explore' description="Explore" />
              <TopNavBar button_href='/user/events' description="Events" />
              <TopNavBar button_href='/user/chat' description="Chat" />
          </div>
          <SignedOut>
            <div className="min-w-[100px] min-h-[60px] flex ml-auto">
            <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
              <button
                className={`min-w-[100px] min-h-[60px] text-left flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 ml-auto `}
              >
                  <span>Profile</span>
                  <img
                  src={user?.imageUrl} 
                  className="w-10 h-10 rounded-full border border-gray-300"
                  />
              </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[100px] space-y-2 bg-white px-4 py-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                >
                  <DropdownMenu.Item>
                      <Link href="/profile">Preferences</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <button onClick={() => signOut()}>
                      Sign Out
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </SignedIn>
        </div>
        {/* Page Content */}
        <main className="p-6 flex-grow w-full">{children}</main> {/* Add w-full */}
      </div>
    </div>
  );
} 

interface TopNavBarProps {
  button_href:string
  description:string
}

function TopNavBar({button_href,description}: TopNavBarProps){
  return(
    <Link
      className={`h-full justify-center text-left flex items-center space-x-3 p-2 hover:bg-blue-600`}
      href={button_href}
    >
      <span> {description} </span>
    </Link>
  )
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
  "yoga" : "Stretch It Daddy",
  "gym" : "Gym Bros",
}