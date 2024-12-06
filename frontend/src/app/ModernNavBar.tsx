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
  <Link href={href} className="flex-1">
    <Button 
      variant="ghost" 
      className="w-full text-foreground hover:bg-yellow-100 
      transition-all duration-200 
      shadow-sm hover:shadow-md 
      rounded-lg"
    >
      {children}
    </Button>
  </Link>
)

export default function UCLANavBar() {
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-50 
      bg-gradient-to-r from-yellow-200 to-yellow-300
      backdrop-blur-md 
      shadow-sm 
      border-b border-yellow-200/50"
    >
      <div className="container px-4 py-2 flex items-center ">
        {/* Navigation Links */}
        <div className="flex items-center space-x-4 flex-grow ">
          <NavButton href="/user/explore">Explore</NavButton>
          <NavButton href="/user/events">Events</NavButton>
          <NavButton href="/user/chat">Chat</NavButton>
        </div>

        {/* Authentication Section */}
        <div className="flex items-center space-x-4 ">
          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="outline" 
                className="rounded-full bg-yellow-200 hover:bg-yellow-200
                transition-all duration-200 
                shadow-sm hover:shadow-md"
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
                  className="rounded-full flex items-center space-x-2 px-4 py-2 
                    bg-yellow-300 hover:bg-yellow-100 ml-auto
                    transition-all duration-200 
                    border-b border-yellow-200/50
                    shadow-sm hover:shadow-md"
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
                className="w-56 bg-white rounded-xl shadow-xl border-yellow-100 border"
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