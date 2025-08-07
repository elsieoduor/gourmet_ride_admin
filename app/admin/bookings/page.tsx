"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Users, Calendar, MapPin } from "lucide-react"

interface Booking {
  id: string
  user: {
    id: string
    first_name: string
    last_name: string
    email: string
  }
  trip: {
    id: string
    scheduled_date: string
    scheduled_time: string
    route: {
      name: string
      pickup_location: { name: string }
      dropoff_location: { name: string }
    }
  }
  party_size: number
  total_amount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  qr_code: string
  booked_at: string
  booking_menu_items: Array<{
    menu_item: { name: string }
    quantity: number
  }>
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data - replace with actual API calls
  // useEffect(() => {
  //   const mockBookings: Booking[] = [
  //     {
  //       id: "1",
  //       user: {
  //         id: "user1",
  //         first_name: "John",
  //         last_name: "Doe",
  //         email: "john@example.com",
  //       },
  //       trip: {
  //         id: "trip1",
  //         scheduled_date: "2024-01-20",
  //         scheduled_time: "12:30",
  //         route: {
  //           name: "City Center → Business District",
  //           pickup_location: { name: "City Center" },
  //           dropoff_location: { name: "Business District" },
  //         },
  //       },
  //       party_size: 2,
  //       total_amount: 2200,
  //       status: "confirmed",
  //       qr_code: "QR123456",
  //       booked_at: "2024-01-15T10:00:00Z",
  //       booking_menu_items: [
  //         { menu_item: { name: "Gourmet Burger" }, quantity: 2 },
  //         { menu_item: { name: "Truffle Fries" }, quantity: 1 },
  //       ],
  //     },
  //     {
  //       id: "2",
  //       user: {
  //         id: "user2",
  //         first_name: "Jane",
  //         last_name: "Smith",
  //         email: "jane@example.com",
  //       },
  //       trip: {
  //         id: "trip2",
  //         scheduled_date: "2024-01-21",
  //         scheduled_time: "18:00",
  //         route: {
  //           name: "University → Shopping Mall",
  //           pickup_location: { name: "University Campus" },
  //           dropoff_location: { name: "Shopping Mall" },
  //         },
  //       },
  //       party_size: 1,
  //       total_amount: 1400,
  //       status: "pending",
  //       qr_code: "QR789012",
  //       booked_at: "2024-01-16T14:30:00Z",
  //       booking_menu_items: [{ menu_item: { name: "Vegan Salad Bowl" }, quantity: 1 }],
  //     },
  //   ]

  //   setTimeout(() => {
  //     setBookings(mockBookings)
  //     setLoading(false)
  //   }, 1000)
  // }, [currentPage, statusFilter, searchTerm])
  useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true)
        try {
          const res = await fetch("http://localhost:5000/api/bookings", {
            credentials: "include", // 🔑 Important if cookie-based auth is used
          })
  
          if (!res.ok) {
            console.error("❌ Failed to fetch bookings:", res.statusText)
            return
          }
  
          const data = await res.json()
          console.log("✅ Bookings fetched:", data.data)
          setBookings(data.data)
        } catch (err) {
          console.error(" Error fetching bookings:", err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchUsers()
    }, [])
  const filteredBookings = bookings.filter((booking) => {
  const matchesSearch =
    (booking.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.qr_code?.toLowerCase().includes(searchTerm.toLowerCase()))

  const matchesStatus = statusFilter === "all" || booking.status === statusFilter

  return matchesSearch && matchesStatus
})


  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-[#27AE60] text-white"
      case "pending":
        return "bg-yellow-500 text-white"
      case "completed":
        return "bg-[#2980B9] text-white"
      case "cancelled":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Bookings</h1>
          <p className="text-[#7F8C8D]">Manage customer reservations and trips</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>Customer reservations and trip details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Trip Details</TableHead>
                <TableHead>Party Size</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Booked</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-[#2C3E50]">
                        {booking.user?.first_name} {booking.user?.last_name}
                      </div>
                      <div className="text-sm text-[#7F8C8D]">{booking.user?.email}</div>
                      <div className="text-xs text-[#7F8C8D] mt-1">QR: {booking.qr_code}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-[#7F8C8D]" />
                        <span>
                          {booking.trip.scheduled_date} at {booking.trip.scheduled_time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[#7F8C8D]">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {booking.trip.route.pickup_location.name} → {booking.trip.route.dropoff_location.name}
                        </span>
                      </div>
                      {booking.booking_menu_items.length > 0 && (
                        <div className="text-xs text-[#7F8C8D]">
                          Food:{" "}
                          {booking.booking_menu_items
                            .map((item) => `${item.menu_item.name} (${item.quantity})`)
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-[#7F8C8D]" />
                      <span>{booking.party_size}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">KSH {booking.total_amount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(booking.booked_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/bookings/${booking.id}/edit`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredBookings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#7F8C8D]">No bookings found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
