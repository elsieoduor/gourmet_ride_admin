"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Truck, Menu, Home, Route, Users, MapPin, Settings, Bell, LogOut, Calendar, BarChart3 } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/driver", icon: Home },
  { name: "My Trips", href: "/driver/trips", icon: Route },
  { name: "Passengers", href: "/driver/passengers", icon: Users },
  { name: "Routes", href: "/driver/routes", icon: MapPin },
  { name: "Schedule", href: "/driver/schedule", icon: Calendar },
  { name: "Performance", href: "/driver/performance", icon: BarChart3 },
  { name: "Notifications", href: "/driver/notifications", icon: Bell },
  { name: "Settings", href: "/driver/settings", icon: Settings },
]

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isOnline, setIsOnline] = useState(true)

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive ? "bg-[#27AE60] text-white" : "text-[#7F8C8D] hover:text-[#2C3E50] hover:bg-gray-100"
            } ${mobile ? "w-full" : ""}`}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="min-h-screen bg-[#F7F9F9]">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Truck className="h-8 w-8 text-[#27AE60]" />
            <span className="ml-2 text-xl font-bold text-[#2C3E50]">Driver Portal</span>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              <NavItems />
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-[#2C3E50]">John Driver</p>
                    <p className="text-xs text-[#7F8C8D]">Driver #001</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex items-center mb-8">
                    <Truck className="h-8 w-8 text-[#27AE60]" />
                    <span className="ml-2 text-xl font-bold text-[#2C3E50]">Driver Portal</span>
                  </div>
                  <nav className="space-y-1">
                    <NavItems mobile />
                  </nav>
                </SheetContent>
              </Sheet>
              <h1 className="ml-4 text-lg font-semibold text-[#2C3E50]">Driver Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={isOnline ? "bg-[#27AE60] text-white" : "bg-red-500 text-white"}
                onClick={() => setIsOnline(!isOnline)}
              >
                {isOnline ? "Online" : "Offline"}
              </Badge>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="flex flex-col">
          {/* Status bar */}
          <div className="hidden md:block bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[#2C3E50]">Driver Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button
                  variant={isOnline ? "default" : "destructive"}
                  onClick={() => setIsOnline(!isOnline)}
                  className={isOnline ? "bg-[#27AE60] hover:bg-[#229954]" : ""}
                >
                  {isOnline ? "Online" : "Go Online"}
                </Button>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-[#2C3E50]">John Driver</p>
                    <p className="text-xs text-[#7F8C8D]">Driver #001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
