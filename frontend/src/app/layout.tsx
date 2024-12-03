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
      <div className="w-64 bg-blue-500 text-white p-6 space-y-8 h-full">
        {/* Button that will direct us to the main page */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">BruinMatch</h1>
          </div>
          <p className="text-sm text-blue-200 mt-2">Connect with Bruins</p>
        </Link>

        <nav className="space-y-4">
          {/* Once I click on this, direct me to /profile using Link */}
          {basketball && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("basketball")}
            >
              <Image src={BASKETBALL} alt="Basketball" width={50} height={50} />
              <span > {sportsToChatName["basketball"]} </span>
            </Link>
          )}

          {running && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("running")}
            >
              <Image src={RUNNING} alt="Running" width={50} height={50} />
              <span > {sportsToChatName["running"]} </span>
            </Link>
          )}

          {tennis && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("tennis")}
            >
              <Image src={TENNIS} alt="Tennis" width={50} height={50} />
              <span> {sportsToChatName["tennis"]} </span>
            </Link>
          )}

          {football && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("football")}
            >
              <Image src={FOOTBALL} alt="Football" width={50} height={50} />
              <span> {sportsToChatName["football"]} </span>
            </Link>
          )}

          {volleyball && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("volleyball")}
            >
              <Image src={VOLLEYBALL} alt="Volleyball" width={50} height={50} />
              <span> {sportsToChatName["volleyball"]} </span>
            </Link>
          )}

          {badminton && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("badminton")}
            >
              <Image src={BADMINTON} alt="Badminton" width={50} height={50} />
              <span> {sportsToChatName["badminton"]} </span>
            </Link>
          )}

          {swimming && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("swimming")}
            >
              <Image src={SWIMMING} alt="Swimming" width={50} height={50} />
              <span> {sportsToChatName["swimming"]} </span>
            </Link> 
          )}

          {yoga && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("yoga")}
            >
              <Image src={YOGA} alt="Yoga" width={50} height={50} />
              <span> {sportsToChatName["yoga"]} </span>
            </Link>
          )}

          {gym && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("gym")}
            >
              <Image src={GYM} alt="Gym" width={50} height={50} />
              <span> {sportsToChatName["gym"]} </span>
            </Link>
          )}

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full"> {/* Add w-full here */}
        {/* Authentication Controls */}
        <div className="p-4 bg-gray-100 flex items-center">
            <button
                className="top-navbar"
              >
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/explore"}
            >
            <span> Explore </span>
            </Link>
          </button>
          <button className = {`${styles.top_navbar}`}>
            EVENTS
          </button>

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
              <button
                className={`${styles.top_navbar} ml-auto`}
              >
                <img
                src={user?.imageUrl} 
                className="w-10 h-10 rounded-full border border-gray-300"
                />
                Profile
              </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"

                >
                  <DropdownMenu.Item>
                      <button>
                        <Link href="/profile">Preferences</Link>
                      </button>
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