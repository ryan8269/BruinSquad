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
      <html lang="en">
        <body className="flex">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-blue-900 text-white p-6 space-y-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">BruinMatch</h1>
              <p className="text-sm text-blue-200 mt-2">Connect with Bruins</p>
            </div>

            <nav className="space-y-4">
              <Link
                href="/dashboard"
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
        </body>
      </html>
    </ClerkProvider>
  );
}
