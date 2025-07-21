"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { CheckCircle, QrCode, MapPin, Clock, Download, Share, Users, Loader2 } from "lucide-react"

interface BookingData {
  id: string
  pickup: string
  dropoff: string
  date: Date
  time: string
  partySize: number
  selectedFoodItems: { id: string; quantity: number }[]
  specialRequests: string
  totalAmount: number
  status: string
  qrCode: string
  paymentId: string
  paidAt: string
}

export default function BookingSuccessPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)

  useEffect(() => {
    // Get confirmed booking data from session storage
    const confirmedBooking = sessionStorage.getItem("confirmedBooking")
    if (confirmedBooking) {
      const booking = JSON.parse(confirmedBooking)
      setBookingData(booking)
      // Clear the session storage
      sessionStorage.removeItem("confirmedBooking")
    } else {
      // Redirect to dashboard if no confirmed booking
      router.push("/customer")
    }
  }, [router])

  const handleDownloadTicket = () => {
    toast.success("Ticket downloaded successfully!")
  }

  const handleShareDetails = () => {
    if (navigator.share && bookingData) {
      navigator.share({
        title: `RideDine Booking #${bookingData.id}`,
        text: `My ride from ${bookingData.pickup} to ${bookingData.dropoff} on ${new Date(bookingData.date).toDateString()} at ${bookingData.time}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `RideDine Booking #${bookingData?.id} - ${bookingData?.pickup} to ${bookingData?.dropoff} on ${new Date(bookingData?.date || "").toDateString()} at ${bookingData?.time}`,
      )
      toast.success("Booking details copied to clipboard!")
    }
  }

  if (!bookingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#27AE60]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F9F9] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Header */}
        <Card className="text-center border-green-200 bg-green-50">
          <CardContent className="pt-8 pb-6">
            <CheckCircle className="h-16 w-16 text-[#27AE60] mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">Booking Confirmed!</h1>
            <p className="text-[#7F8C8D] text-lg">Your ride has been successfully booked and payment processed.</p>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#2C3E50]">Booking #{bookingData.id}</CardTitle>
                <CardDescription className="text-[#7F8C8D]">
                  {new Date(bookingData.date).toDateString()} at {bookingData.time}
                </CardDescription>
              </div>
              <Badge className="bg-[#27AE60] text-white">CONFIRMED</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Route Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#27AE60]" />
                  <div>
                    <p className="text-sm font-medium text-[#2C3E50]">Pickup Point</p>
                    <p className="text-sm text-[#7F8C8D]">{bookingData.pickup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#2980B9]" />
                  <div>
                    <p className="text-sm font-medium text-[#2C3E50]">Drop-off Point</p>
                    <p className="text-sm text-[#7F8C8D]">{bookingData.dropoff}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#7F8C8D]" />
                  <div>
                    <p className="text-sm font-medium text-[#2C3E50]">Party Size</p>
                    <p className="text-sm text-[#7F8C8D]">{bookingData.partySize} people</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#7F8C8D]" />
                  <div>
                    <p className="text-sm font-medium text-[#2C3E50]">Food Items</p>
                    <p className="text-sm text-[#7F8C8D]">{bookingData.selectedFoodItems.length} items ordered</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center p-6 bg-[#F7F9F9] rounded-lg border-2 border-dashed border-[#27AE60]">
                <QrCode className="h-24 w-24 text-[#2C3E50] mb-3" />
                <p className="text-sm font-medium text-[#2C3E50] mb-1">Your Boarding Pass</p>
                <p className="text-xs text-[#7F8C8D] text-center mb-2">Show this QR code to the driver</p>
                <Badge variant="outline" className="font-mono text-xs">
                  {bookingData.qrCode}
                </Badge>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-[#2C3E50] mb-2">Payment Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#7F8C8D]">Payment ID:</p>
                  <p className="font-medium text-[#2C3E50]">{bookingData.paymentId}</p>
                </div>
                <div>
                  <p className="text-[#7F8C8D]">Amount Paid:</p>
                  <p className="font-medium text-[#27AE60]">KSH {bookingData.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#7F8C8D]">Payment Time:</p>
                  <p className="font-medium text-[#2C3E50]">{new Date(bookingData.paidAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#7F8C8D]">Status:</p>
                  <p className="font-medium text-[#27AE60]">Paid</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleDownloadTicket} className="flex-1 bg-[#27AE60] hover:bg-[#229954]">
                <Download className="h-4 w-4 mr-2" />
                Download Ticket
              </Button>
              <Button onClick={handleShareDetails} variant="outline" className="flex-1 bg-transparent">
                <Share className="h-4 w-4 mr-2" />
                Share Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-[#2C3E50] text-lg">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#2980B9] rounded-full mt-2"></div>
              <p className="text-[#2C3E50]">
                <strong>Arrival Time:</strong> Please arrive at the pickup point 10 minutes before departure time.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#2980B9] rounded-full mt-2"></div>
              <p className="text-[#2C3E50]">
                <strong>QR Code:</strong> Keep your QR code ready for scanning by the driver.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#2980B9] rounded-full mt-2"></div>
              <p className="text-[#2C3E50]">
                <strong>Food Service:</strong> Your pre-ordered food will be served during the ride.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <p className="text-[#2C3E50]">
                <strong>No Refunds:</strong> All bookings are final with no cancellation or refund policy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/customer">Back to Dashboard</Link>
          </Button>
          <Button asChild className="flex-1 bg-[#2980B9] hover:bg-[#2471A3]">
            <Link href="/customer/book">Book Another Ride</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
