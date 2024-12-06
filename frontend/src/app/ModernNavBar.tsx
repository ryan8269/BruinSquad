"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { SignOutButton } from "@clerk/nextjs"

const NavButton = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Button 
    variant="ghost" 
    className="text-foreground hover:bg-yellow-100 
    transition-colors duration-200 
    px-4 py-2 rounded-full"
    asChild
  >
    <Link href={href}>{children}</Link>
  </Button>
)

export default function UCLANavBar() {
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-50 
      bg-gradient-to-r from-yellow-200 to-yellow-400
      backdrop-blur-md 
      shadow-sm 
      border-b border-yellow-300/50"
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex items-center space-x-2 bg-white/40 rounded-full p-1">
          <NavButton href="/user/chat">Chat</NavButton>
          <NavButton href="/user/explore">Explore</NavButton>
          <NavButton href="/user/events">Events</NavButton>
        </div>

        {/* Authentication Section */}
        <div className="flex items-center space-x-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="outline" 
                className="rounded-full bg-white/40 hover:bg-white/60 
                transition-colors duration-200"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="rounded-full flex items-center space-x-2 
                bg-white/40 hover:bg-white/60 
                transition-colors duration-200"
              >
                <span>Profile</span>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 rounded-full"
                    }
                  }} 
                />
              </Button>
            </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white rounded-xl shadow-lg border-yellow-100 border"
              >
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Preferences
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton>
                    <button className="w-full text-left">
                      Sign Out
                    </button>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}