"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  MapPin,
  Clock,
  Calendar,
  QrCode,
  Search,
  Filter,
  Eye,
  Trash2,
  Download,
  Star,
  Phone,
  Navigation,
  Plus,
} from "lucide-react"

interface Booking {
  id: string
  date: string
  time: string
  pickup: string
  dropoff: string
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  qrCode: string
  foodItems: string[]
  driver?: string
  vehicle?: string
  totalAmount: number
  partySize: number
  specialRequests?: string
  rating?: number
  createdAt: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([
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
      totalAmount: 2200,
      partySize: 2,
      specialRequests: "Extra napkins please",
      createdAt: "2024-01-10T10:30:00Z",
    },
    {
      id: "RD002",
      date: "2024-01-10",
      time: "06:00 PM",
      pickup: "University Campus",
      dropoff: "Shopping Mall",
      status: "completed",
      qrCode: "QR789012",
      foodItems: ["Chicken Wrap", "Fresh Juice"],
      driver: "Sarah Wilson",
      vehicle: "Nissan Matatu - KBZ 456B",
      totalAmount: 1800,
      partySize: 1,
      rating: 5,
      createdAt: "2024-01-05T14:20:00Z",
    },
    {
      id: "RD003",
      date: "2024-01-08",
      time: "08:00 AM",
      pickup: "Residential Area A",
      dropoff: "City Center",
      status: "cancelled",
      qrCode: "QR345678",
      foodItems: ["Caesar Salad"],
      totalAmount: 1500,
      partySize: 1,
      specialRequests: "Vegetarian meal only",
      createdAt: "2024-01-03T09:15:00Z",
    },
  ])

  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null)

  useEffect(() => {
    let filtered = bookings

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.dropoff.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.driver?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter)
    }

    setFilteredBookings(filtered)
  }, [bookings, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" as const } : booking)),
    )
    toast.success("Booking cancelled successfully")
  }

  const handleDeleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
    setShowDeleteDialog(false)
    setBookingToDelete(null)
    toast.success("Booking deleted successfully")
  }

  const handleRateBooking = (bookingId: string, rating: number) => {
    setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, rating } : booking)))
    toast.success("Rating submitted successfully")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">My Bookings</h1>
          <p className="text-[#7F8C8D] mt-2">Manage your ride bookings and history</p>
        </div>
        <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/customer/book">
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7F8C8D] h-4 w-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-[#2C3E50]">Booking #{booking.id}</h3>
                    <p className="text-sm text-[#7F8C8D]">
                      {booking.date} at {booking.time} • {booking.partySize}{" "}
                      {booking.partySize === 1 ? "person" : "people"}
                    </p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
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
                    {booking.driver && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#7F8C8D]" />
                        <span className="text-sm">
                          <strong>Driver:</strong> {booking.driver}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#7F8C8D]" />
                      <span className="text-sm">
                        <strong>Food:</strong> {booking.foodItems.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>Total Amount:</strong> KSH {booking.totalAmount.toLocaleString()}
                    </div>
                    {booking.specialRequests && (
                      <div className="text-sm">
                        <strong>Special Requests:</strong> {booking.specialRequests}
                      </div>
                    )}
                    {booking.status === "confirmed" && (
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded border">
                        <QrCode className="h-4 w-4 text-[#27AE60]" />
                        <span className="text-sm font-medium">QR: {booking.qrCode}</span>
                      </div>
                    )}
                    {booking.rating && (
                      <div className="flex items-center gap-1">
                        <strong className="text-sm">Rating:</strong>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < booking.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedBooking(booking)}
                    className="bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>

                  {booking.status === "confirmed" && (
                    <>
                      <Button size="sm" className="bg-[#2980B9] hover:bg-[#2471A3]">
                        <Navigation className="h-4 w-4 mr-2" />
                        Track Live
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Driver
                      </Button>
                    </>
                  )}

                  {booking.status === "completed" && !booking.rating && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRateBooking(booking.id, 5)}
                      className="bg-transparent text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Rate Trip
                    </Button>
                  )}

                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Receipt
                  </Button>

                  {(booking.status === "pending" || booking.status === "confirmed") && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancelBooking(booking.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setBookingToDelete(booking.id)
                      setShowDeleteDialog(true)
                    }}
                    className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-16 w-16 text-[#7F8C8D] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">No bookings found</h3>
              <p className="text-[#7F8C8D] mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't made any bookings yet"}
              </p>
              <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
                <Link href="/customer/book">Book Your First Ride</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Booking Details Dialog */}
      {selectedBooking && (
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Booking Details - #{selectedBooking.id}</DialogTitle>
              <DialogDescription>Complete information about your booking</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-[#2C3E50] mb-2">Trip Information</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Date:</strong> {selectedBooking.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedBooking.time}
                    </p>
                    <p>
                      <strong>From:</strong> {selectedBooking.pickup}
                    </p>
                    <p>
                      <strong>To:</strong> {selectedBooking.dropoff}
                    </p>
                    <p>
                      <strong>Party Size:</strong> {selectedBooking.partySize}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <Badge className={`ml-2 ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-[#2C3E50] mb-2">Service Details</h4>
                  <div className="space-y-2 text-sm">
                    {selectedBooking.driver && (
                      <p>
                        <strong>Driver:</strong> {selectedBooking.driver}
                      </p>
                    )}
                    {selectedBooking.vehicle && (
                      <p>
                        <strong>Vehicle:</strong> {selectedBooking.vehicle}
                      </p>
                    )}
                    <p>
                      <strong>Food Items:</strong> {selectedBooking.foodItems.join(", ")}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> KSH {selectedBooking.totalAmount.toLocaleString()}
                    </p>
                    {selectedBooking.qrCode && (
                      <p>
                        <strong>QR Code:</strong> {selectedBooking.qrCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {selectedBooking.specialRequests && (
                <div>
                  <h4 className="font-medium text-[#2C3E50] mb-2">Special Requests</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedBooking.specialRequests}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedBooking(null)} className="bg-transparent">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => bookingToDelete && handleDeleteBooking(bookingToDelete)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
