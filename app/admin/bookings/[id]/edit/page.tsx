"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Calendar } from "lucide-react"
import { toast } from "sonner"

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}

interface Trip {
  id: string
  route: {
    name: string
  }
  scheduled_date: string
  scheduled_time: string
}

interface Booking {
  id: string
  user_id: string
  trip_id: string
  number_of_passengers: number
  total_amount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  special_requests?: string
  payment_status: "pending" | "paid" | "refunded"
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditBookingPage({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [selectedMenuItems, setSelectedMenuItems] = useState<any[]>([]); // or define a type
  const [trips, setTrips] = useState<Trip[]>([])
  const [bookingId, setBookingId] = useState<string>("")
  const [formData, setFormData] = useState<Booking>({
    id: "",
    user_id: "",
    trip_id: "",
    number_of_passengers: 1,
    total_amount: 0,
    status: "pending",
    special_requests: "",
    payment_status: "pending",
  })

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setBookingId(resolvedParams.id)
    }
    getParams()
  }, [params])

  // Mock fetch users and trips - replace with actual API calls
  // useEffect(() => {
  //   const mockUsers: User[] = [
  //     { id: "user1", first_name: "John", last_name: "Doe", email: "john@example.com" },
  //     { id: "user2", first_name: "Jane", last_name: "Smith", email: "jane@example.com" },
  //     { id: "user3", first_name: "Mike", last_name: "Johnson", email: "mike@example.com" },
  //   ]

  //   const mockTrips: Trip[] = [
  //     {
  //       id: "trip1",
  //       route: { name: "City Center → Business District" },
  //       scheduled_date: "2024-01-20",
  //       scheduled_time: "12:30",
  //     },
  //     {
  //       id: "trip2",
  //       route: { name: "University → Shopping Mall" },
  //       scheduled_date: "2024-01-21",
  //       scheduled_time: "14:00",
  //     },
  //   ]

  //   setUsers(mockUsers)
  //   setTrips(mockTrips)
  // }, [])

  // useEffect(() => {
  //   if (!bookingId) return

  //   // Mock API call to fetch booking data - replace with actual implementation
  //   const fetchBooking = async () => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       // Mock booking data
  //       const mockBooking: Booking = {
  //         id: bookingId,
  //         user_id: "user1",
  //         trip_id: "trip1",
  //         number_of_passengers: 2,
  //         total_amount: 2000,
  //         status: "confirmed",
  //         special_requests: "Window seat preferred",
  //         payment_status: "paid",
  //       }

  //       setFormData(mockBooking)
  //     } catch (error) {
  //       toast.error("Failed to load booking data")
  //     } finally {
  //       setInitialLoading(false)
  //     }
  //   }

  //   fetchBooking()
  // }, [bookingId])

  useEffect(() => {
  const fetchData = async () => {
    if (!bookingId) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        credentials: "include",
      })

      if (!res.ok) {
        console.error("❌ Failed to fetch booking:", res.statusText)
        return
      }

      const { data } = await res.json()
      console.log("✅ Booking fetched:", data)

      const booking = data

      // Update form data
      setFormData({
        id: booking.id,
        user_id: booking.user?.id || "",
        trip_id: booking.trip?.id || "",
        number_of_passengers: booking.party_size || 1,
        total_amount: booking.total_amount || 0,
        status: booking.status || "pending",
        special_requests: booking.special_requests || "",
        payment_status: booking.payment_status || "pending",
      })

      // Set users/trips for dropdowns (assuming booking has the data populated)
      const userList = booking.user ? [booking.user] : []
      const tripList = booking.trip ? [booking.trip] : []

      setUsers(userList)
      setTrips(tripList)

    } catch (err) {
      console.error("❌ Error fetching booking:", err)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }

  fetchData()
}, [bookingId])

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        bookingData: {
          user_id: formData.user_id,
          trip_id: formData.trip_id,
          party_size: formData.number_of_passengers,
          total_amount: formData.total_amount,
          status: formData.status,
          payment_status: formData.payment_status,
          special_requests: formData.special_requests,
        },
        booking_menu_items: selectedMenuItems.map((item) => ({
          menu_item_id: item.menu_item.id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          special_instructions: item.special_instructions || null,
          table_number: item.table_number || null,
        })),
      }),
    });

    if (!response.ok) {
      const serverError = await response.text();
      throw new Error(serverError || "Failed to update booking");
    }

    toast.success("✅ Booking updated successfully!");
    router.push("/admin/bookings");
  } catch (error: any) {
    console.error("❌ Update failed:", error);
    toast.error("Failed to update booking: " + error.message);
  } finally {
    setLoading(false);
  }
};


  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (initialLoading) {
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/bookings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Edit Booking</h1>
          <p className="text-[#7F8C8D]">Update booking information</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#27AE60]" />
            Booking Information
          </CardTitle>
          <CardDescription>Update the details for this booking</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user_id">Customer *</Label>
              <Select value={formData.user_id} onValueChange={(value) => handleInputChange("user_id", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trip_id">Trip *</Label>
              <Select value={formData.trip_id} onValueChange={(value) => handleInputChange("trip_id", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select trip" />
                </SelectTrigger>
                <SelectContent>
                  {trips.map((trip) => (
                    <SelectItem key={trip.id} value={trip.id}>
                      {trip.route.name} - {trip.scheduled_date} at {trip.scheduled_time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number_of_passengers">Passengers *</Label>
                <Input
                  id="number_of_passengers"
                  type="number"
                  min="1"
                  max="15"
                  value={formData.number_of_passengers}
                  onChange={(e) => handleInputChange("number_of_passengers", Number.parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total_amount">Total Amount (KSH) *</Label>
                <Input
                  id="total_amount"
                  type="number"
                  min="0"
                  step="50"
                  value={formData.total_amount}
                  onChange={(e) => handleInputChange("total_amount", Number.parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Booking Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment_status">Payment Status *</Label>
                <Select
                  value={formData.payment_status}
                  onValueChange={(value) => handleInputChange("payment_status", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="special_requests">Special Requests</Label>
              <Textarea
                id="special_requests"
                value={formData.special_requests || ""}
                onChange={(e) => handleInputChange("special_requests", e.target.value)}
                placeholder="Any special requests from the customer"
                rows={3}
              />
            </div>
            <div className="space-y-4 pt-2">
            <h3 className="text-lg font-medium text-[#2C3E50]">Booking Menu</h3>
            {selectedMenuItems.length === 0 && (
              <p className="text-sm text-gray-500 italic">No menu items selected.</p>
            )}

            {selectedMenuItems.map((item, index) => (
              <div
                key={index}
                className="border rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50"
              >
                <div>
                  <Label>Item</Label>
                  <Input disabled value={item.menu_item.name} />
                </div>

                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const updated = [...selectedMenuItems]
                      updated[index].quantity = Number(e.target.value)
                      setSelectedMenuItems(updated)
                    }}
                  />
                </div>

                <div>
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    min={0}
                    value={item.unit_price}
                    onChange={(e) => {
                      const updated = [...selectedMenuItems]
                      updated[index].unit_price = Number(e.target.value)
                      setSelectedMenuItems(updated)
                    }}
                  />
                </div>

      <div>
        <Label>Special Instructions</Label>
        <Input
          value={item.special_instructions || ""}
          onChange={(e) => {
            const updated = [...selectedMenuItems]
            updated[index].special_instructions = e.target.value
            setSelectedMenuItems(updated)
          }}
        />
      </div>

      <div>
        <Label>Table Number</Label>
        <Input
          value={item.table_number || ""}
          onChange={(e) => {
            const updated = [...selectedMenuItems]
            updated[index].table_number = e.target.value
            setSelectedMenuItems(updated)
          }}
        />
      </div>
    </div>
  ))}
</div>


            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Updating..." : "Update Booking"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/bookings">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
