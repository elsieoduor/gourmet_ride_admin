"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Truck,
  MapPin,
  Clock,
  Calendar,
  QrCode,
  Star,
  TrendingUp,
  CreditCard,
  Bell,
  Plus,
  ArrowRight,
} from "lucide-react"

export default function CustomerDashboard() {
  const [activeBookings, setActiveBookings] = useState([
    {
      id: "RD001",
      date: "2024-01-15",
      time: "12:30 PM",
      pickup: "City Center",
      dropoff: "Business District",
      status: "confirmed",
      qrCode: "QR123456",
      foodItems: ["Gourmet Burger", "Truffle Fries"],
      driver: "Michael Johnson",
      vehicle: "Toyota Hiace - KCA 123A",
      progress: 0,
    },
  ])

  const [stats] = useState({
    totalRides: 24,
    totalSpent: 48500,
    favoriteRoute: "City Center → Business District",
    loyaltyPoints: 1250,
  })

  const [recentActivity] = useState([
    {
      id: 1,
      type: "booking_confirmed",
      title: "Booking confirmed",
      description: "Your ride for Jan 15 has been confirmed",
      time: "2 hours ago",
      icon: Calendar,
      color: "text-[#27AE60]",
    },
    {
      id: 2,
      type: "payment_processed",
      title: "Payment processed",
      description: "Payment of KSH 1,500 processed successfully",
      time: "3 hours ago",
      icon: CreditCard,
      color: "text-[#2980B9]",
    },
    {
      id: 3,
      type: "review_submitted",
      title: "Review submitted",
      description: "Thank you for rating your last trip",
      time: "1 day ago",
      icon: Star,
      color: "text-[#F39C12]",
    },
  ])

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C3E50]">Welcome back, John!</h1>
        <p className="text-sm sm:text-base text-[#7F8C8D] mt-2">Ready for your next culinary journey?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#7F8C8D]">Total Rides</p>
                <p className="text-xl sm:text-2xl font-bold text-[#2C3E50]">{stats.totalRides}</p>
              </div>
              <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#7F8C8D]">Total Spent</p>
                <p className="text-xl sm:text-2xl font-bold text-[#2C3E50]">KSH {stats.totalSpent.toLocaleString()}</p>
              </div>
              <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-[#2980B9]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-[#7F8C8D]">Loyalty Points</p>
                <p className="text-xl sm:text-2xl font-bold text-[#2C3E50]">{stats.loyaltyPoints}</p>
              </div>
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-[#F39C12]" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Button asChild className="h-16 sm:h-20 bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/customer/book" className="flex flex-col items-center gap-1 sm:gap-2">
            <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm sm:text-base">Book New Ride</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-16 sm:h-20 border-[#2980B9] text-[#2980B9] hover:bg-[#2980B9] hover:text-white bg-transparent"
        >
          <Link href="/customer/bookings" className="flex flex-col items-center gap-1 sm:gap-2">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm sm:text-base">My Bookings</span>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-16 sm:h-20 bg-transparent">
          <Link href="/customer/support" className="flex flex-col items-center gap-1 sm:gap-2">
            <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm sm:text-base">Get Help</span>
          </Link>
        </Button>
      </div>

      {/* Active Bookings */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <CardTitle className="text-lg sm:text-xl text-[#2C3E50]">Active Bookings</CardTitle>
            <Button asChild variant="outline" size="sm" className="bg-transparent w-full sm:w-auto">
              <Link href="/customer/bookings" className="flex items-center justify-center gap-2">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeBookings.length > 0 ? (
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <div key={booking.id} className="border border-[#27AE60] rounded-lg p-4 bg-green-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="font-semibold text-[#2C3E50]">Booking #{booking.id}</h3>
                      <p className="text-sm text-[#7F8C8D]">
                        {booking.date} at {booking.time}
                      </p>
                    </div>
                    <Badge className="bg-[#27AE60] text-white w-fit">{booking.status.toUpperCase()}</Badge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#27AE60] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <strong>From:</strong> {booking.pickup}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#2980B9] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <strong>To:</strong> {booking.dropoff}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Truck className="h-4 w-4 text-[#7F8C8D] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <strong>Driver:</strong> {booking.driver}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-[#7F8C8D] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <strong>Food:</strong> {booking.foodItems.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border-2 border-dashed border-[#27AE60]">
                      <QrCode className="h-12 w-12 sm:h-16 sm:w-16 text-[#2C3E50] mb-2" />
                      <p className="text-xs sm:text-sm text-[#7F8C8D] text-center">Show QR to driver</p>
                      <p className="text-xs text-[#7F8C8D] mt-1">Code: {booking.qrCode}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#2C3E50]">Trip Progress</span>
                      <span className="text-sm text-[#7F8C8D]">{booking.progress}%</span>
                    </div>
                    <Progress value={booking.progress} className="h-2" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full">
                    <Button size="sm" className="bg-[#2980B9] hover:bg-[#2471A3] flex-1 sm:flex-initial">
                      Track Live
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent flex-1 sm:flex-initial">
                      Contact Driver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent flex-1 sm:flex-initial"
                    >
                      Cancel Booking
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 px-4">
              <Truck className="h-12 w-12 sm:h-16 sm:w-16 text-[#7F8C8D] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">No Active Bookings</h3>
              <p className="text-sm sm:text-base text-[#7F8C8D] mb-4">Book your first ride to get started!</p>
              <Button asChild className="bg-[#27AE60] hover:bg-[#229954] w-full sm:w-auto">
                <Link href="/customer/book">Book Now</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-[#2C3E50]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2C3E50]">{activity.title}</p>
                  <p className="text-xs text-[#7F8C8D] break-words">{activity.description}</p>
                </div>
                <span className="text-xs text-[#7F8C8D] flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}