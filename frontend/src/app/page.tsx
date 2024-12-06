'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, UsersIcon, UserCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content Area */}
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-900">Welcome to BruinSquad</CardTitle>
            <CardDescription>
              Connect with fellow Bruins who share your interests, passions, and UCLA spirit.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}