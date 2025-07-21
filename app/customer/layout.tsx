"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Home,
  Calendar,
  History,
  CreditCard,
  Bell,
  User,
  Settings,
  HelpCircle,
  Star,
  Heart,
  Menu,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/customer", icon: Home },
  { name: "Book Ride", href: "/customer/book", icon: Calendar },
  { name: "My Bookings", href: "/customer/bookings", icon: History },
  { name: "Payment Methods", href: "/customer/payments", icon: CreditCard },
  { name: "Notifications", href: "/customer/notifications", icon: Bell },
  { name: "Profile", href: "/customer/profile", icon: User },
  { name: "Settings", href: "/customer/settings", icon: Settings },
]

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const NavContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Truck className="h-8 w-8 text-[#27AE60]" />
          <span className="text-xl font-bold text-[#2C3E50]">Gourmet Ride</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive ? "bg-[#27AE60] text-white" : "text-[#2C3E50] hover:bg-gray-100 hover:text-[#27AE60]"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${isActive ? "text-white" : "text-[#7F8C8D] group-hover:text-[#27AE60]"}`}
              />
              {item.name}
              {item.name === "Notifications" && <Badge className="ml-auto bg-red-500 text-white text-xs">3</Badge>}
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#27AE60] rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#2C3E50] truncate">John Doe</p>
            <p className="text-xs text-[#7F8C8D] truncate">john@example.com</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F7F9F9]">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
          <NavContent />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
