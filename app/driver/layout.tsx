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
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Truck, Menu, Home, Route, Users, MapPin, Settings, Bell, LogOut, Calendar, BarChart3, X } from "lucide-react"

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
        const LinkComponent = (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                ? "bg-gradient-to-r from-[#27AE60] to-[#229954] text-white shadow-lg shadow-[#27AE60]/25"
                : "text-[#7F8C8D] hover:text-[#2C3E50] hover:bg-gray-50/80 hover:shadow-sm"
              } ${mobile ? "w-full mx-2" : ""}`}
          >
            <item.icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
            {item.name}
          </Link>
        )

        // Wrap with SheetClose for mobile to auto-close
        if (mobile) {
          return (
            <SheetClose key={item.name} asChild>
              {LinkComponent}
            </SheetClose>
          )
        }

        return LinkComponent
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
            <nav className="flex-1 px-2 space-y-2">
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
                <DropdownMenuItem onClick={() => window.location.href = '/driver/settings'}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = '/auth/login'}>
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
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-4 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100/80 rounded-xl">
                    <Menu className="h-6 w-6 text-[#2C3E50]" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-80 p-0 bg-gradient-to-b from-white via-white to-gray-50/30 border-r-0 shadow-2xl"
                >
                  <SheetHeader className="px-6 py-6 border-b border-gray-100/50">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center text-xl font-bold text-[#2C3E50]">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-[#27AE60] to-[#229954] rounded-xl shadow-lg">
                            <Truck className="h-6 w-6 text-white" />
                          </div>
                          Driver Portal
                        </div>
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="flex flex-col h-full">
                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6">
                      <div className="space-y-2">
                        <NavItems mobile />
                      </div>
                    </nav>

                    {/* User Profile Section */}
                    <div className="mt-auto border-t border-gray-100/50 p-6 bg-gradient-to-r from-gray-50/50 to-white/80">
                      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100/50">
                        <Avatar className="h-12 w-12 ring-2 ring-[#27AE60]/20">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" />
                          <AvatarFallback className="bg-gradient-to-br from-[#27AE60] to-[#229954] text-white font-semibold">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#2C3E50]">John Driver</p>
                          <p className="text-xs text-[#7F8C8D]">Driver #001</p>
                          <Badge
                            className={`mt-2 text-xs ${isOnline
                                ? "bg-gradient-to-r from-[#27AE60] to-[#229954] text-white shadow-sm"
                                : "bg-red-500 text-white"
                              }`}
                          >
                            {isOnline ? "● Online" : "● Offline"}
                          </Badge>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-gray-200 hover:bg-gray-50 text-[#7F8C8D] hover:text-[#2C3E50]"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="ml-4">
                <h1 className="text-lg font-semibold text-[#2C3E50]">Driver Dashboard</h1>
                <p className="text-xs text-[#7F8C8D]">Welcome back, John</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                className={`cursor-pointer transition-all duration-200 ${isOnline
                    ? "bg-gradient-to-r from-[#27AE60] to-[#229954] text-white shadow-sm hover:shadow-md"
                    : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                onClick={() => setIsOnline(!isOnline)}
              >
                ● {isOnline ? "Online" : "Offline"}
              </Badge>
              <Avatar className="h-9 w-9 ring-2 ring-[#27AE60]/20">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback className="bg-gradient-to-br from-[#27AE60] to-[#229954] text-white text-sm font-semibold">JD</AvatarFallback>
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
                  className={`rounded-xl transition-all duration-200 ${isOnline
                      ? "bg-gradient-to-r from-[#27AE60] to-[#229954] hover:shadow-lg hover:shadow-[#27AE60]/25"
                      : ""
                    }`}
                >
                  ● {isOnline ? "Online" : "Go Online"}
                </Button>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 ring-2 ring-[#27AE60]/20">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" />
                    <AvatarFallback className="bg-gradient-to-br from-[#27AE60] to-[#229954] text-white font-semibold">JD</AvatarFallback>
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