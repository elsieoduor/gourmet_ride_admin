"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, Clock, Calendar, QrCode, Bell, User, History, CreditCard } from "lucide-react"

export default function CustomerDashboard() {
  const [activeBookings] = useState([
    {
      id: "RD001",
      date: "2024-01-15",
      time: "12:30 PM",
      pickup: "City Center",
      dropoff: "Business District",
      status: "confirmed",
      qrCode: "QR123456",
      foodItems: ["Gourmet Burger", "Truffle Fries"],
    },
  ])

  return (
    <div className="min-h-screen bg-[#F7F9F9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-[#27AE60]" />
            <span className="text-2xl font-bold text-[#2C3E50]">RideDine</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Welcome back, John!</h1>
          <p className="text-[#7F8C8D]">Ready for your next culinary journey?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Button asChild className="h-20 bg-[#27AE60] hover:bg-[#229954]">
            <Link href="/dashboard/book" className="flex flex-col items-center gap-2">
              <Calendar className="h-6 w-6" />
              <span>Book New Ride</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-20 border-[#2980B9] text-[#2980B9] hover:bg-[#2980B9] hover:text-white bg-transparent"
          >
            <Link href="/history" className="flex flex-col items-center gap-2">
              <History className="h-6 w-6" />
              <span>Booking History</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-20 bg-transparent">
            <Link href="/dashboard/payment" className="flex flex-col items-center gap-2">
              <CreditCard className="h-6 w-6" />
              <span>Payment Methods</span>
            </Link>
          </Button>
        </div>

        {/* Active Bookings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Active Bookings</h2>
          {activeBookings.length > 0 ? (
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-[#27AE60]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#2C3E50]">Booking #{booking.id}</CardTitle>
                      <Badge className="bg-[#27AE60] text-white">{booking.status.toUpperCase()}</Badge>
                    </div>
                    <CardDescription className="text-[#7F8C8D]">
                      {booking.date} at {booking.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#27AE60]" />
                          <span className="text-sm">
                            <strong>Pickup:</strong> {booking.pickup}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#2980B9]" />
                          <span className="text-sm">
                            <strong>Drop-off:</strong> {booking.dropoff}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#7F8C8D]" />
                          <span className="text-sm">
                            <strong>Food:</strong> {booking.foodItems.join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-[#F7F9F9] rounded-lg">
                        <QrCode className="h-16 w-16 text-[#2C3E50] mb-2" />
                        <p className="text-sm text-[#7F8C8D] text-center">Show this QR code to the driver</p>
                        <p className="text-xs text-[#7F8C8D] mt-1">Code: {booking.qrCode}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        Track Ride
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                      >
                        View Policy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Truck className="h-16 w-16 text-[#7F8C8D] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">No Active Bookings</h3>
                <p className="text-[#7F8C8D] mb-4">Book your first ride to get started!</p>
                <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
                  <Link href="/book">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="py-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-2 h-2 bg-[#27AE60] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2C3E50]">Booking confirmed</p>
                    <p className="text-xs text-[#7F8C8D]">Your ride for Jan 15 has been confirmed</p>
                  </div>
                  <span className="text-xs text-[#7F8C8D]">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-2 h-2 bg-[#2980B9] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2C3E50]">Payment processed</p>
                    <p className="text-xs text-[#7F8C8D]">Payment of KSH 1,500 processed successfully</p>
                  </div>
                  <span className="text-xs text-[#7F8C8D]">3 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#7F8C8D] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2C3E50]">Account created</p>
                    <p className="text-xs text-[#7F8C8D]">Welcome to RideDine!</p>
                  </div>
                  <span className="text-xs text-[#7F8C8D]">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
