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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#2C3E50]">Welcome back, John!</h1>
        <p className="text-[#7F8C8D] mt-2">Ready for your next culinary journey?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#7F8C8D]">Total Rides</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{stats.totalRides}</p>
              </div>
              <Truck className="h-8 w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#7F8C8D]">Total Spent</p>
                <p className="text-2xl font-bold text-[#2C3E50]">KSH {stats.totalSpent.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-[#2980B9]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#7F8C8D]">Loyalty Points</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{stats.loyaltyPoints}</p>
              </div>
              <Star className="h-8 w-8 text-[#F39C12]" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Button asChild className="h-20 bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/customer/book" className="flex flex-col items-center gap-2">
            <Plus className="h-6 w-6" />
            <span>Book New Ride</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-20 border-[#2980B9] text-[#2980B9] hover:bg-[#2980B9] hover:text-white bg-transparent"
        >
          <Link href="/customer/bookings" className="flex flex-col items-center gap-2">
            <Calendar className="h-6 w-6" />
            <span>My Bookings</span>
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-20 bg-transparent">
          <Link href="/customer/support" className="flex flex-col items-center gap-2">
            <Bell className="h-6 w-6" />
            <span>Get Help</span>
          </Link>
        </Button>
      </div>

      {/* Active Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#2C3E50]">Active Bookings</CardTitle>
            <Button asChild variant="outline" size="sm" className="bg-transparent">
              <Link href="/customer/bookings">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeBookings.length > 0 ? (
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <div key={booking.id} className="border border-[#27AE60] rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[#2C3E50]">Booking #{booking.id}</h3>
                      <p className="text-sm text-[#7F8C8D]">
                        {booking.date} at {booking.time}
                      </p>
                    </div>
                    <Badge className="bg-[#27AE60] text-white">{booking.status.toUpperCase()}</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#27AE60]" />
                        <span className="text-sm">
                          <strong>From:</strong> {booking.pickup}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#2980B9]" />
                        <span className="text-sm">
                          <strong>To:</strong> {booking.dropoff}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-[#7F8C8D]" />
                        <span className="text-sm">
                          <strong>Driver:</strong> {booking.driver}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#7F8C8D]" />
                        <span className="text-sm">
                          <strong>Food:</strong> {booking.foodItems.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border-2 border-dashed border-[#27AE60]">
                      <QrCode className="h-16 w-16 text-[#2C3E50] mb-2" />
                      <p className="text-sm text-[#7F8C8D] text-center">Show QR to driver</p>
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

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-[#2980B9] hover:bg-[#2471A3]">
                      Track Live
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Contact Driver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                    >
                      Cancel Booking
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Truck className="h-16 w-16 text-[#7F8C8D] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">No Active Bookings</h3>
              <p className="text-[#7F8C8D] mb-4">Book your first ride to get started!</p>
              <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
                <Link href="/customer/book">Book Now</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#2C3E50]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2C3E50]">{activity.title}</p>
                  <p className="text-xs text-[#7F8C8D]">{activity.description}</p>
                </div>
                <span className="text-xs text-[#7F8C8D]">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
