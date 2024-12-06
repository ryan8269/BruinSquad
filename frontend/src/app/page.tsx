'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageSquareIcon, UserIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const featuredCards = [
    {
      icon: MessageSquareIcon,
      title: "Chat",
      description: "Connect with other Bruins",
      onClick: () => router.push('/user/chat')
    },
    {
      icon: UserIcon,
      title: "Profile",
      description: "Set up your preferences",
      onClick: () => router.push('/profile')
    },
    {
      icon: SearchIcon,
      title: "Explore",
      description: "Discover new connections",
      onClick: () => router.push('/user/explore')
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 p-4">
      <div className="w-full max-w-4xl">
        <Card className="w-full mb-8 shadow-lg rounded-xl border-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-blue-600 text-center">
              Welcome to BruinSquad
            </CardTitle>
            <CardDescription className="text-center text-lg text-gray-700">
              Your gateway to connecting with fellow <span className="text-yellow-500 font-semibold">Bruins</span>
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredCards.map((card, index) => (
            <div 
              key={card.title}
              className={`animate-fade-in delay-${index * 200}`}
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-md rounded-xl">
                <CardHeader className="items-center">
                  <card.icon className="w-12 h-12 text-blue-600 mb-4"/>
                  <CardTitle className="text-xl text-center text-[#0A2240]">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">{card.description}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-600 text-blue-600 hover:bg-[#2774AE]/10"
                    onClick={card.onClick}
  
                  >
                    Go to {card.title}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Tailwind CSS animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
        .delay-0 { animation-delay: 0s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}