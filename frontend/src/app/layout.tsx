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

  return (
    <div className="flex w-full">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-blue-500 text-white p-6 space-y-8 h-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">BruinMatch</h1>
          <p className="text-sm text-blue-200 mt-2">Connect with Bruins</p>
        </div>

        <nav className="space-y-4">
          {basketball && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={BASKETBALL} alt="Basketball" width={50} height={50} />
              <span > League of Ballers </span>
            </button>
          )}

          {running && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={RUNNING} alt="Running" width={50} height={50} />
              <span > Run Forest Run </span>
            </button>
          )}

          {tennis && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={TENNIS} alt="Tennis" width={50} height={50} />
              <span> The Smash Bros </span>
            </button>
          )}

          {football && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={FOOTBALL} alt="Football" width={50} height={50} />
              <span> Touchdown Town </span>
            </button>
          )}

          {volleyball && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={VOLLEYBALL} alt="Volleyball" width={50} height={50} />
              <span> Set, Spike, Repeat </span>
            </button>
          )}

          {badminton && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={BADMINTON} alt="Badminton" width={50} height={50} />
              <span> Badminton Group Chat </span>
            </button>
          )}

          {swimming && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={SWIMMING} alt="Swimming" width={50} height={50} />
              <span> The Pool Sharks </span>
            </button> 
          )}

          {yoga && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={YOGA} alt="Yoga" width={50} height={50} />
              <span> Stretch It Daddy </span>
            </button>
          )}

          {gym && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded hover:bg-blue-600"
              onClick={() => alert("sport button clicked!")}
            >
              <Image src={GYM} alt="Gym" width={50} height={50} />
              <span> Gym Bros </span>
            </button>
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
