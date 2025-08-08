"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Truck,
  Users,
  MapPin,
  Route,
  ChefHat,
  Calendar,
  BookOpen,
  Bell,
  BarChart3,
  Menu,
  Settings,
  LogOut,
} from "lucide-react"

const sidebarItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/pickup-locations", label: "Locations", icon: MapPin },
  { href: "/admin/routes", label: "Routes", icon: Route },
  { href: "/admin/food-categories", label: "Categories", icon: ChefHat },
  { href: "/admin/menu-items", label: "Menu Items", icon: BookOpen },
  { href: "/admin/trips", label: "Trips", icon: Calendar },
  { href: "/admin/bookings", label: "Bookings", icon: Truck },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-[#27AE60]" />
          <span className="text-lg font-bold text-[#2C3E50]">Gourmet Ride Admin</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-[#27AE60] text-white" : "text-[#2C3E50] hover:bg-[#F7F9F9] hover:text-[#27AE60]"
                }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-4 space-y-2">
        
        <Link href="auth/login">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#F7F9F9]">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 border-r bg-white lg:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}