'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, UsersIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-blue-900">BruinMatch</CardTitle>
          <CardDescription className="text-lg mt-4">
            Connect with fellow Bruins who share your interests, passions, and UCLA spirit.
            Find meaningful relationships within our trusted campus community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/user/explore" className="block">
              <Button 
                variant="outline" 
                className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-blue-50"
              >
                <UsersIcon className="h-6 w-6" />
                <span>Explore</span>
              </Button>
            </Link>

            <Link href="/user/match" className="block">
              <Button 
                variant="outline"
                className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-blue-50"
              >
                <HeartIcon className="h-6 w-6" />
                <span>Match</span>
              </Button>
            </Link>

            <Link href="/user/profile" className="block">
              <Button 
                variant="outline"
                className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-blue-50"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span>Profile</span>
              </Button>
            </Link>
          </div>

          <div className="mt-8 space-y-4 text-center">
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
  );
}