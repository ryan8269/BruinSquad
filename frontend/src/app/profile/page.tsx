'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircleIcon, EditIcon, CameraIcon } from "lucide-react";

export default function ProfilePage() {
    //WE ACTUALLY NEED THE DATA
    //TO DO
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                <UserCircleIcon className="w-24 h-24 text-blue-500" />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full bg-white"
              >
                <CameraIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            John Doe
            <Button variant="ghost" size="icon">
              <EditIcon className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-600">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Major</p>
                  <p>Computer Science</p>
                </div>
                <div>
                  <p className="text-gray-500">Year</p>
                  <p>Junior</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p>Westwood</p>
                </div>
                <div>
                  <p className="text-gray-500">Interests</p>
                  <p>Coding, Basketball, Photography</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-600">Bio</h3>
              <p className="text-sm">
                Computer Science student at UCLA passionate about technology and innovation. 
                Always eager to meet new people and collaborate on interesting projects.
              </p>
            </div>

            <div className="pt-4">
              <Button className="w-full">Edit Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}