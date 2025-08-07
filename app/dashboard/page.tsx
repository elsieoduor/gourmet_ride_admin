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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-[#27AE60]" />
            <span className="text-xl sm:text-2xl font-bold text-[#2C3E50]">RideDine</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] mb-2">Welcome back, John!</h1>
          <p className="text-sm sm:text-base text-[#7F8C8D]">Ready for your next culinary journey?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Button asChild className="h-16 sm:h-20 bg-[#27AE60] hover:bg-[#229954]">
            <Link href="/dashboard/book" className="flex flex-col items-center gap-1 sm:gap-2">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">Book New Ride</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-16 sm:h-20 border-[#2980B9] text-[#2980B9] hover:bg-[#2980B9] hover:text-white bg-transparent"
          >
            <Link href="/history" className="flex flex-col items-center gap-1 sm:gap-2">
              <History className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">Booking History</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-16 sm:h-20 bg-transparent sm:col-span-1 col-span-1">
            <Link href="/dashboard/payment" className="flex flex-col items-center gap-1 sm:gap-2">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">Payment Methods</span>
            </Link>
          </Button>
        </div>

        {/* Active Bookings */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-4">Active Bookings</h2>
          {activeBookings.length > 0 ? (
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-[#27AE60]">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <CardTitle className="text-lg sm:text-xl text-[#2C3E50]">Booking #{booking.id}</CardTitle>
                      <Badge className="bg-[#27AE60] text-white w-fit">{booking.status.toUpperCase()}</Badge>
                    </div>
                    <CardDescription className="text-sm sm:text-base text-[#7F8C8D]">
                      {booking.date} at {booking.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#27AE60] mt-0.5 flex-shrink-0" />
                          <span className="text-sm">
                            <strong>Pickup:</strong> {booking.pickup}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#2980B9] mt-0.5 flex-shrink-0" />
                          <span className="text-sm">
                            <strong>Drop-off:</strong> {booking.dropoff}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-[#7F8C8D] mt-0.5 flex-shrink-0" />
                          <span className="text-sm">
                            <strong>Food:</strong> {booking.foodItems.join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-[#F7F9F9] rounded-lg">
                        <QrCode className="h-12 w-12 sm:h-16 sm:w-16 text-[#2C3E50] mb-2" />
                        <p className="text-xs sm:text-sm text-[#7F8C8D] text-center">Show this QR code to the driver</p>
                        <p className="text-xs text-[#7F8C8D] mt-1">Code: {booking.qrCode}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button size="sm" variant="outline" className="w-full sm:w-auto">
                        Track Ride
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent w-full sm:w-auto"
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
              <CardContent className="text-center py-8 sm:py-12 px-4">
                <Truck className="h-12 w-12 sm:h-16 sm:w-16 text-[#7F8C8D] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">No Active Bookings</h3>
                <p className="text-sm sm:text-base text-[#7F8C8D] mb-4">Book your first ride to get started!</p>
                <Button asChild className="bg-[#27AE60] hover:bg-[#229954] w-full sm:w-auto">
                  <Link href="/book">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="py-4 sm:py-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="w-2 h-2 bg-[#27AE60] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2C3E50]">Booking confirmed</p>
                    <p className="text-xs text-[#7F8C8D] break-words">Your ride for Jan 15 has been confirmed</p>
                  </div>
                  <span className="text-xs text-[#7F8C8D] flex-shrink-0">2 hours ago</span>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="w-2 h-2 bg-[#2980B9] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2C3E50]">Payment processed</p>
                    <p className="text-xs text-[#7F8C8D] break-words">Payment of KSH 1,500 processed successfully</p>
                  </div>
                  <span className="text-xs text-[#7F8C8D] flex-shrink-0">3 hours ago</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#7F8C8D] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2C3E50]">Account created</p>
                    <p className="text-xs text-[#7F8C8D] break-words">Welcome to RideDine!</p>
                  </div>
                  <span className="text-xs text-[#7F8C8D] flex-shrink-0">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}