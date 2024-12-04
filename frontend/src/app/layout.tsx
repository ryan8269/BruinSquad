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
          <button
            className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
          >
            <UserCircleIcon className="h-12 w-12" />
            <Link href="/profile">Profile</Link>
          </button>
          {basketball && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/events"} //TO DO Set this back to chat
              onClick={() => setActiveRoom("basketball")}
            >
              <Image src={BASKETBALL} alt="Basketball" width={50} height={50} />
              <span > League of Ballers </span>
            </Link>
          )}

          {running && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("running")}
            >
              <Image src={RUNNING} alt="Running" width={50} height={50} />
              <span > Run Forest Run </span>
            </Link>
          )}

          {tennis && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("tennis")}
            >
              <Image src={TENNIS} alt="Tennis" width={50} height={50} />
              <span> The Smash Bros </span>
            </Link>
          )}

          {football && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("football")}
            >
              <Image src={FOOTBALL} alt="Football" width={50} height={50} />
              <span> Touchdown Town </span>
            </Link>
          )}

          {volleyball && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("volleyball")}
            >
              <Image src={VOLLEYBALL} alt="Volleyball" width={50} height={50} />
              <span> Set, Spike, Repeat </span>
            </Link>
          )}

          {badminton && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("badminton")}
            >
              <Image src={BADMINTON} alt="Badminton" width={50} height={50} />
              <span> Badminton Group Chat </span>
            </Link>
          )}

          {swimming && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("swimming")}
            >
              <Image src={SWIMMING} alt="Swimming" width={50} height={50} />
              <span> The Pool Sharks </span>
            </Link> 
          )}

          {yoga && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("yoga")}
            >
              <Image src={YOGA} alt="Yoga" width={50} height={50} />
              <span> Stretch It Daddy </span>
            </Link>
          )}

          {gym && (
            <Link
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              href={"/user/chat"}
              onClick={() => setActiveRoom("gym")}
            >
              <Image src={GYM} alt="Gym" width={50} height={50} />
              <span> Gym Bros </span>
            </Link>
          )}

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full"> {/* Add w-full here */}
        {/* Authentication Controls */}
        <div className="p-4 bg-gray-100 flex justify-end items-center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Page Content */}
        <main className="p-6 flex-grow w-full">{children}</main> {/* Add w-full */}
      </div>
    </div>
  );
}
