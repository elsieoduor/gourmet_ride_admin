"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ArrowLeft, CreditCard, Smartphone, Shield, AlertTriangle, Loader2 } from "lucide-react"

interface BookingData {
  id: string
  pickup: string
  dropoff: string
  date: Date
  time: string
  partySize: number
  selectedFoodItems: { id: string; quantity: number }[]
  specialRequests: string
  paymentMethod: string
  totalAmount: number
  status: string
  createdAt: string
}

export default function PaymentPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    mpesaPhone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  useEffect(() => {
    // Get booking data from session storage
    const pendingBooking = sessionStorage.getItem("pendingBooking")
    if (pendingBooking) {
      const booking = JSON.parse(pendingBooking)
      setBookingData(booking)
      setPaymentMethod(booking.paymentMethod || "mpesa")
    } else {
      // Redirect to booking page if no pending booking
      router.push("/customer/book")
    }
  }, [router])

  const handlePayment = async () => {
    if (!bookingData) return

    // Validate payment details
    if (paymentMethod === "mpesa" && !paymentDetails.mpesaPhone) {
      toast.error("Please enter your M-PESA phone number")
      return
    }

    if (paymentMethod === "card") {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.cardName) {
        toast.error("Please fill in all card details")
        return
      }
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Update booking status
      const confirmedBooking = {
        ...bookingData,
        status: "confirmed",
        qrCode: `QR${Date.now().toString().slice(-6)}`,
        paymentId: `PAY${Date.now().toString().slice(-6)}`,
        paidAt: new Date().toISOString(),
      }

      // Store confirmed booking
      sessionStorage.setItem("confirmedBooking", JSON.stringify(confirmedBooking))
      sessionStorage.removeItem("pendingBooking")

      toast.success("Payment processed successfully!")
      router.push("/customer/book/book-success")
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/customer/book">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Complete Payment</h1>
          <p className="text-[#7F8C8D] mt-2">Secure payment for booking #{bookingData.id}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">Payment Method</CardTitle>
              <CardDescription className="text-[#7F8C8D]">Choose your preferred payment option</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Smartphone className="h-6 w-6 text-[#27AE60]" />
                    <div>
                      <div className="font-medium text-[#2C3E50]">M-PESA</div>
                      <div className="text-sm text-[#7F8C8D]">Pay with your mobile money</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard className="h-6 w-6 text-[#2980B9]" />
                    <div>
                      <div className="font-medium text-[#2C3E50]">Credit/Debit Card</div>
                      <div className="text-sm text-[#7F8C8D]">Visa, Mastercard accepted</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethod === "mpesa" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">M-PESA Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={paymentDetails.mpesaPhone}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, mpesaPhone: e.target.value })}
                      className="border-gray-300 focus:border-[#27AE60]"
                    />
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Smartphone className="h-5 w-5 text-[#27AE60] mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-green-800 mb-1">M-PESA Payment Instructions</p>
                        <ol className="text-green-700 space-y-1 list-decimal list-inside">
                          <li>You will receive an STK push notification</li>
                          <li>Enter your M-PESA PIN to complete payment</li>
                          <li>You'll receive a confirmation SMS</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      className="border-gray-300 focus:border-[#2980B9]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                        className="border-gray-300 focus:border-[#2980B9]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                        className="border-gray-300 focus:border-[#2980B9]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={paymentDetails.cardName}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                      className="border-gray-300 focus:border-[#2980B9]"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-[#2980B9] mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-1">Secure Payment</p>
                  <p className="text-blue-700">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-[#2C3E50]">Booking Details</h4>
                <div className="text-sm text-[#7F8C8D] space-y-1">
                  <p>
                    <strong>Route:</strong> {bookingData.pickup} → {bookingData.dropoff}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(bookingData.date).toDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {bookingData.time}
                  </p>
                  <p>
                    <strong>Party Size:</strong> {bookingData.partySize} people
                  </p>
                  <p>
                    <strong>Booking ID:</strong> {bookingData.id}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7F8C8D]">Ride</span>
                  <span className="text-[#2C3E50]">KSH 1,000</span>
                </div>

                {bookingData.selectedFoodItems.length > 0 && (
                  <>
                    <div className="text-sm font-medium text-[#2C3E50]">Food Items:</div>
                    {bookingData.selectedFoodItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-[#7F8C8D]">Item {index + 1}</span>
                        <span className="text-[#2C3E50]">
                          KSH {((bookingData.totalAmount - 1000) / bookingData.selectedFoodItems.length).toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span className="text-[#2C3E50]">Total</span>
                <span className="text-[#27AE60]">KSH {bookingData.totalAmount.toLocaleString()}</span>
              </div>

              {/* No Refund Policy */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-800 mb-1">No Refund Policy</p>
                    <p className="text-red-700">All payments are final. No cancellations or refunds allowed.</p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-[#27AE60] hover:bg-[#229954]"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay KSH ${bookingData.totalAmount.toLocaleString()}`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
