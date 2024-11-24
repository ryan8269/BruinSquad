'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, UsersIcon, UserCircleIcon, HomeIcon, MessageCircleIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex">
      {/* Side Navigation */}
      <div className="w-64 bg-blue-900 text-white p-6 space-y-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">BruinMatch</h1>
          <p className="text-sm text-blue-200 mt-2">Connect with Bruins</p>
        </div>
        
        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800">
            <HomeIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/messages" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800">
            <MessageCircleIcon className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link href="/explore" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800">
            <UsersIcon className="h-5 w-5" />
            <span>Explore</span>
          </Link>
          <Link href="/settings" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800">
            <SettingsIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="absolute bottom-6">
          <div className="flex items-center space-x-3 p-2">
            <UserCircleIcon className="h-8 w-8" />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-blue-200">Computer Science</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {/* Top Navigation */}
        <div className="bg-white p-4 shadow-sm flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              Explore
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <HeartIcon className="h-4 w-4" />
              Match
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleProfileClick}
            >
              <UserCircleIcon className="h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-900">Welcome to BruinMatch</CardTitle>
              <CardDescription>
                Connect with fellow Bruins who share your interests, passions, and UCLA spirit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-900">Why Choose BruinMatch?</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Exclusively for UCLA students</li>
                  <li>✓ Match based on majors, clubs, and interests</li>
                  <li>✓ Safe and verified community</li>
                  <li>✓ Privacy-focused platform</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}