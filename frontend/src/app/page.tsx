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