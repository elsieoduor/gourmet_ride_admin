"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { ArrowLeft, Save, X, CreditCard, Smartphone, Wallet } from "lucide-react"

export default function CreatePaymentMethodPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState({
    type: "mpesa" as "mpesa" | "card" | "wallet",
    name: "",
    details: "",
    expiryDate: "",
    isDefault: false,
  })

  const handleSubmit = async () => {
    // Validation
    if (!paymentMethod.name || !paymentMethod.details) {
      toast.error("Please fill in all required fields")
      return
    }

    if (paymentMethod.type === "card" && !paymentMethod.expiryDate) {
      toast.error("Please enter the expiry date for your card")
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Payment method added successfully!")
      router.push("/customer/payments")
    } catch (error) {
      toast.error("Failed to add payment method")
    }
  }

  const getIcon = () => {
    switch (paymentMethod.type) {
      case "mpesa":
        return <Smartphone className="h-6 w-6 text-[#27AE60]" />
      case "card":
        return <CreditCard className="h-6 w-6 text-[#2980B9]" />
      case "wallet":
        return <Wallet className="h-6 w-6 text-[#F39C12]" />
    }
  }

  const getPlaceholder = () => {
    switch (paymentMethod.type) {
      case "mpesa":
        return "+254 700 000 000"
      case "card":
        return "1234 5678 9012 3456"
      case "wallet":
        return "wallet@example.com"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/customer/payments">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#2C3E50]">Add Payment Method</h1>
            <p className="text-[#7F8C8D] mt-2">Add a new payment method to your account</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="bg-[#27AE60] hover:bg-[#229954]">
            <Save className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/customer/payments">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method Details</CardTitle>
              <CardDescription>Enter your payment method information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Type</Label>
                <Select
                  value={paymentMethod.type}
                  onValueChange={(value: "mpesa" | "card" | "wallet") =>
                    setPaymentMethod({ ...paymentMethod, type: value, details: "", expiryDate: "" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpesa">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        M-PESA
                      </div>
                    </SelectItem>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </div>
                    </SelectItem>
                    <SelectItem value="wallet">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        Digital Wallet
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={paymentMethod.name}
                  onChange={(e) => setPaymentMethod({ ...paymentMethod, name: e.target.value })}
                  placeholder={
                    paymentMethod.type === "mpesa"
                      ? "My M-PESA"
                      : paymentMethod.type === "card"
                        ? "My Visa Card"
                        : "My Wallet"
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>
                  {paymentMethod.type === "mpesa"
                    ? "Phone Number"
                    : paymentMethod.type === "card"
                      ? "Card Number"
                      : "Wallet Details"}
                </Label>
                <Input
                  value={paymentMethod.details}
                  onChange={(e) => setPaymentMethod({ ...paymentMethod, details: e.target.value })}
                  placeholder={getPlaceholder()}
                />
              </div>

              {paymentMethod.type === "card" && (
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input
                    value={paymentMethod.expiryDate}
                    onChange={(e) => setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How your payment method will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                {getIcon()}
                <div className="flex-1">
                  <h4 className="font-medium text-[#2C3E50]">
                    {paymentMethod.name ||
                      `New ${paymentMethod.type === "mpesa" ? "M-PESA" : paymentMethod.type === "card" ? "Card" : "Wallet"}`}
                  </h4>
                  <p className="text-sm text-[#7F8C8D]">{paymentMethod.details || getPlaceholder()}</p>
                  {paymentMethod.type === "card" && paymentMethod.expiryDate && (
                    <p className="text-xs text-[#7F8C8D]">Expires: {paymentMethod.expiryDate}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
