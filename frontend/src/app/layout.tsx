"use client";
import { SportProvider, usesport } from './SportContent';
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
    <div className="flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-blue-900 text-white p-6 space-y-8 h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">BruinMatch</h1>
          <p className="text-sm text-blue-200 mt-2">Connect with Bruins</p>
        </div>

        <nav className="space-y-4">
          <Link
            href="/"
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/messages"
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800"
          >
            <MessageCircleIcon className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link
            href="/explore"
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800"
          >
            <UsersIcon className="h-5 w-5" />
            <span>Explore</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800"
          >
            <SettingsIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>

          {basketball && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> basketball Action</span>
            </button>
          )}

          {running && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> running Action</span>
            </button>
          )}

          {tennis && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> tennis Action</span>
            </button>
          )}

          {football && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> football Action</span>
            </button>
          )}

          {volleyball && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> volleyball Action</span>
            </button>
          )}

          {badminton && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> badminton Action</span>
            </button>
          )}

          {swimming && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> swimming Action</span>
            </button> 
          )}

          {yoga && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> yoga Action</span>
            </button>
          )}

          {gym && (
            <button
              className="w-full text-left flex items-center space-x-3 p-2 rounded bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("sport button clicked!")}
            >
              <span> gym Action</span>
            </button>
          )}

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
        <main className="p-6 flex-grow">{children}</main>
      </div>
    </div>
  );
}
