"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ArrowLeft, MapPin, Clock, Users, AlertTriangle, Plus, Minus } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  category: string
  image?: string
}

interface BookingData {
  pickup: string
  dropoff: string
  date: Date | undefined
  time: string
  partySize: number
  selectedFoodItems: { id: string; quantity: number }[]
  specialRequests: string
  paymentMethod: string
}

export default function BookRidePage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData>({
    pickup: "",
    dropoff: "",
    date: undefined,
    time: "",
    partySize: 1,
    selectedFoodItems: [],
    specialRequests: "",
    paymentMethod: "",
  })

  const pickupPoints = [
    "City Center - Main Street",
    "University Campus - Gate A",
    "Shopping Mall - Entrance",
    "Business District - Corporate Plaza",
    "Residential Area A - Community Center",
    "Airport - Terminal 1",
  ]

  const timeSlots = [
    { time: "08:00 AM", available: 12 },
    { time: "10:30 AM", available: 8 },
    { time: "12:30 PM", available: 15 },
    { time: "03:00 PM", available: 10 },
    { time: "06:00 PM", available: 5 },
    { time: "08:30 PM", available: 7 },
  ]

  const menuItems: MenuItem[] = [
    {
      id: "burger",
      name: "Gourmet Burger",
      price: 800,
      description: "Beef patty with premium toppings",
      category: "mains",
    },
    {
      id: "fries",
      name: "Truffle Fries",
      price: 400,
      description: "Hand-cut fries with truffle oil",
      category: "sides",
    },
    {
      id: "wrap",
      name: "Chicken Wrap",
      price: 600,
      description: "Grilled chicken with fresh vegetables",
      category: "mains",
    },
    {
      id: "salad",
      name: "Caesar Salad",
      price: 500,
      description: "Fresh romaine with parmesan",
      category: "salads",
    },
    {
      id: "drink",
      name: "Fresh Juice",
      price: 200,
      description: "Seasonal fruit juice",
      category: "drinks",
    },
    {
      id: "dessert",
      name: "Chocolate Cake",
      price: 350,
      description: "Rich chocolate layer cake",
      category: "desserts",
    },
  ]

  const paymentMethods = [
    { id: "mpesa", name: "M-PESA", details: "+254 700 123 456" },
    { id: "card", name: "Visa Card", details: "**** **** **** 1234" },
    { id: "wallet", name: "RideDine Wallet", details: "KSH 2,500 available" },
  ]

  const updateFoodItem = (itemId: string, quantity: number) => {
    setBookingData((prev) => {
      const existingItems = prev.selectedFoodItems.filter((item) => item.id !== itemId)
      if (quantity > 0) {
        return {
          ...prev,
          selectedFoodItems: [...existingItems, { id: itemId, quantity }],
        }
      }
      return {
        ...prev,
        selectedFoodItems: existingItems,
      }
    })
  }

  const getFoodItemQuantity = (itemId: string) => {
    const item = bookingData.selectedFoodItems.find((item) => item.id === itemId)
    return item?.quantity || 0
  }

  const calculateTotal = () => {
    const ridePrice = 1000 // Base ride price
    const foodTotal = bookingData.selectedFoodItems.reduce((total, selectedItem) => {
      const menuItem = menuItems.find((item) => item.id === selectedItem.id)
      return total + (menuItem?.price || 0) * selectedItem.quantity
    }, 0)
    return ridePrice + foodTotal
  }

  const handleSubmit = async () => {
    // Validation
    if (!bookingData.pickup || !bookingData.dropoff || !bookingData.date || !bookingData.time) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!bookingData.paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    // Create booking
    const bookingId = `RD${Date.now().toString().slice(-6)}`
    const booking = {
      id: bookingId,
      ...bookingData,
      totalAmount: calculateTotal(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store booking data for payment page
      sessionStorage.setItem("pendingBooking", JSON.stringify(booking))

      toast.success("Booking created successfully!")
      router.push("/customer/book/payment")
    } catch (error) {
      toast.error("Failed to create booking. Please try again.")
    }
  }

  const isFormValid = () => {
    return (
      bookingData.pickup &&
      bookingData.dropoff &&
      bookingData.date &&
      bookingData.time &&
      bookingData.paymentMethod &&
      bookingData.partySize > 0
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/customer">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Book Your Ride</h1>
          <p className="text-[#7F8C8D] mt-2">Plan your food truck experience</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Route Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">1. Select Your Route</CardTitle>
              <CardDescription className="text-[#7F8C8D]">Choose your pickup and drop-off points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pickup Point *</Label>
                  <Select
                    value={bookingData.pickup}
                    onValueChange={(value) => setBookingData({ ...bookingData, pickup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup point" />
                    </SelectTrigger>
                    <SelectContent>
                      {pickupPoints.map((point) => (
                        <SelectItem key={point} value={point}>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#27AE60]" />
                            {point}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Drop-off Point *</Label>
                  <Select
                    value={bookingData.dropoff}
                    onValueChange={(value) => setBookingData({ ...bookingData, dropoff: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select drop-off point" />
                    </SelectTrigger>
                    <SelectContent>
                      {pickupPoints.map((point) => (
                        <SelectItem key={point} value={point}>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#2980B9]" />
                            {point}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Party Size *</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setBookingData({ ...bookingData, partySize: Math.max(1, bookingData.partySize - 1) })
                    }
                    disabled={bookingData.partySize <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{bookingData.partySize}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setBookingData({ ...bookingData, partySize: Math.min(15, bookingData.partySize + 1) })
                    }
                    disabled={bookingData.partySize >= 15}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-[#7F8C8D]">Maximum 15 people</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Date & Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">2. Select Date & Time</CardTitle>
              <CardDescription className="text-[#7F8C8D]">Booking available up to 7 days in advance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Select Date *</Label>
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => setBookingData({ ...bookingData, date })}
                    disabled={(date) => date < new Date() || date > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Available Time Slots *</Label>
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.time}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        bookingData.time === slot.time
                          ? "border-[#27AE60] bg-green-50"
                          : "border-gray-200 hover:border-[#27AE60]"
                      }`}
                      onClick={() => setBookingData({ ...bookingData, time: slot.time })}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#7F8C8D]" />
                          <span className="font-medium text-[#2C3E50]">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#7F8C8D]" />
                          <span className="text-sm text-[#7F8C8D]">{slot.available}/15 available</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Food Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">3. Pre-order Your Food</CardTitle>
              <CardDescription className="text-[#7F8C8D]">Select items to enjoy during your ride</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {menuItems.map((item) => {
                  const quantity = getFoodItemQuantity(item.id)
                  return (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#2C3E50]">{item.name}</h4>
                          <p className="text-sm text-[#7F8C8D] mb-2">{item.description}</p>
                          <p className="font-bold text-[#27AE60]">KSH {item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#7F8C8D] capitalize">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateFoodItem(item.id, Math.max(0, quantity - 1))}
                            disabled={quantity === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateFoodItem(item.id, quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">4. Additional Details</CardTitle>
              <CardDescription className="text-[#7F8C8D]">Special requests and payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Special Requests</Label>
                <Textarea
                  placeholder="Any special dietary requirements or requests..."
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Method *</Label>
                <Select
                  value={bookingData.paymentMethod}
                  onValueChange={(value) => setBookingData({ ...bookingData, paymentMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-[#7F8C8D]">{method.details}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookingData.pickup && bookingData.dropoff && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-[#27AE60]" />
                    <span className="text-[#7F8C8D]">From:</span>
                    <span className="font-medium text-[#2C3E50]">{bookingData.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-[#2980B9]" />
                    <span className="text-[#7F8C8D]">To:</span>
                    <span className="font-medium text-[#2C3E50]">{bookingData.dropoff}</span>
                  </div>
                </div>
              )}

              {bookingData.date && bookingData.time && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-[#7F8C8D]" />
                  <span className="text-[#7F8C8D]">When:</span>
                  <span className="font-medium text-[#2C3E50]">
                    {bookingData.date.toDateString()} at {bookingData.time}
                  </span>
                </div>
              )}

              {bookingData.partySize > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-[#7F8C8D]" />
                  <span className="text-[#7F8C8D]">Party Size:</span>
                  <span className="font-medium text-[#2C3E50]">{bookingData.partySize} people</span>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7F8C8D]">Ride</span>
                  <span className="text-[#2C3E50]">KSH 1,000</span>
                </div>

                {bookingData.selectedFoodItems.length > 0 && (
                  <>
                    <div className="text-sm font-medium text-[#2C3E50]">Food Items:</div>
                    {bookingData.selectedFoodItems.map((selectedItem) => {
                      const menuItem = menuItems.find((item) => item.id === selectedItem.id)
                      return menuItem ? (
                        <div key={selectedItem.id} className="flex justify-between text-sm">
                          <span className="text-[#7F8C8D]">
                            {menuItem.name} x{selectedItem.quantity}
                          </span>
                          <span className="text-[#2C3E50]">
                            KSH {(menuItem.price * selectedItem.quantity).toLocaleString()}
                          </span>
                        </div>
                      ) : null
                    })}
                  </>
                )}
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span className="text-[#2C3E50]">Total</span>
                <span className="text-[#27AE60]">KSH {calculateTotal().toLocaleString()}</span>
              </div>

              {/* No Refund Policy */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-800 mb-1">No Refund Policy</p>
                    <p className="text-red-700">
                      All bookings are final. No cancellations or refunds are allowed once booking is confirmed.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-[#27AE60] hover:bg-[#229954]"
                disabled={!isFormValid()}
                onClick={handleSubmit}
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
