"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { CreditCard, Smartphone, Plus, Edit, Trash2, Star, Shield, Wallet } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "mpesa" | "wallet"
  name: string
  details: string
  isDefault: boolean
  lastUsed: string
  expiryDate?: string
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "mpesa",
      name: "M-PESA",
      details: "+254 700 123 456",
      isDefault: true,
      lastUsed: "2024-01-10",
    },
    {
      id: "pm_2",
      type: "card",
      name: "Visa Card",
      details: "**** **** **** 1234",
      isDefault: false,
      lastUsed: "2024-01-05",
      expiryDate: "12/26",
    },
    {
      id: "pm_3",
      type: "wallet",
      name: "RideDine Wallet",
      details: "KSH 2,500 available",
      isDefault: false,
      lastUsed: "2024-01-08",
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [newMethod, setNewMethod] = useState({
    type: "mpesa" as const,
    name: "",
    details: "",
    expiryDate: "",
  })

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "mpesa":
        return <Smartphone className="h-6 w-6 text-[#27AE60]" />
      case "card":
        return <CreditCard className="h-6 w-6 text-[#2980B9]" />
      case "wallet":
        return <Wallet className="h-6 w-6 text-[#F39C12]" />
      default:
        return <CreditCard className="h-6 w-6 text-[#7F8C8D]" />
    }
  }

  const handleAddPaymentMethod = () => {
    const id = `pm_${Date.now()}`
    const method: PaymentMethod = {
      id,
      type: newMethod.type,
      name: newMethod.name,
      details: newMethod.details,
      isDefault: paymentMethods.length === 0,
      lastUsed: new Date().toISOString().split("T")[0],
      expiryDate: newMethod.expiryDate || undefined,
    }

    setPaymentMethods([...paymentMethods, method])
    setNewMethod({ type: "mpesa", name: "", details: "", expiryDate: "" })
    setShowAddDialog(false)
    toast.success("Payment method added successfully!")
  }

  const handleEditPaymentMethod = () => {
    if (!selectedMethod) return

    setPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === selectedMethod.id
          ? { ...method, name: newMethod.name, details: newMethod.details, expiryDate: newMethod.expiryDate }
          : method,
      ),
    )
    setShowEditDialog(false)
    setSelectedMethod(null)
    toast.success("Payment method updated successfully!")
  }

  const handleDeletePaymentMethod = () => {
    if (!selectedMethod) return

    setPaymentMethods((prev) => prev.filter((method) => method.id !== selectedMethod.id))
    setShowDeleteDialog(false)
    setSelectedMethod(null)
    toast.success("Payment method deleted successfully!")
  }

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      })),
    )
    toast.success("Default payment method updated!")
  }

  const openEditDialog = (method: PaymentMethod) => {
    setSelectedMethod(method)
    setNewMethod({
      type: method.type,
      name: method.name,
      details: method.details,
      expiryDate: method.expiryDate || "",
    })
    setShowEditDialog(true)
  }

  const openDeleteDialog = (method: PaymentMethod) => {
    setSelectedMethod(method)
    setShowDeleteDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Payment Methods</h1>
          <p className="text-[#7F8C8D] mt-2">Manage your payment options for bookings</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-[#27AE60] hover:bg-[#229954]">
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-[#2980B9] mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 mb-1">Secure Payment Processing</p>
              <p className="text-blue-700">
                Your payment information is encrypted and secure. We never store sensitive card details on our servers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods List */}
      <div className="grid gap-4">
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <Card key={method.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getPaymentIcon(method.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#2C3E50]">{method.name}</h3>
                        {method.isDefault && (
                          <Badge className="bg-[#27AE60] text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#7F8C8D] text-sm">{method.details}</p>
                      {method.expiryDate && <p className="text-[#7F8C8D] text-xs">Expires: {method.expiryDate}</p>}
                      <p className="text-[#7F8C8D] text-xs">
                        Last used: {new Date(method.lastUsed).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSetDefault(method.id)}
                        className="bg-transparent"
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(method)}
                      className="bg-transparent"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDeleteDialog(method)}
                      className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <CreditCard className="h-16 w-16 text-[#7F8C8D] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">No Payment Methods</h3>
              <p className="text-[#7F8C8D] mb-4">Add a payment method to start booking rides</p>
              <Button onClick={() => setShowAddDialog(true)} className="bg-[#27AE60] hover:bg-[#229954]">
                Add Your First Payment Method
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Payment Method Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new payment method to your account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentType">Payment Type</Label>
              <Select
                value={newMethod.type}
                onValueChange={(value: "mpesa" | "card" | "wallet") => setNewMethod({ ...newMethod, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-PESA</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentName">Name</Label>
              <Input
                id="paymentName"
                value={newMethod.name}
                onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                placeholder={
                  newMethod.type === "mpesa" ? "M-PESA" : newMethod.type === "card" ? "My Visa Card" : "My Wallet"
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDetails">Details</Label>
              <Input
                id="paymentDetails"
                value={newMethod.details}
                onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
                placeholder={
                  newMethod.type === "mpesa"
                    ? "+254 700 000 000"
                    : newMethod.type === "card"
                      ? "1234 5678 9012 3456"
                      : "wallet@example.com"
                }
              />
            </div>

            {newMethod.type === "card" && (
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={newMethod.expiryDate}
                  onChange={(e) => setNewMethod({ ...newMethod, expiryDate: e.target.value })}
                  placeholder="MM/YY"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod} className="bg-[#27AE60] hover:bg-[#229954]">
              Add Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Method Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>Update your payment method details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editPaymentName">Name</Label>
              <Input
                id="editPaymentName"
                value={newMethod.name}
                onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editPaymentDetails">Details</Label>
              <Input
                id="editPaymentDetails"
                value={newMethod.details}
                onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
              />
            </div>

            {newMethod.type === "card" && (
              <div className="space-y-2">
                <Label htmlFor="editExpiryDate">Expiry Date</Label>
                <Input
                  id="editExpiryDate"
                  value={newMethod.expiryDate}
                  onChange={(e) => setNewMethod({ ...newMethod, expiryDate: e.target.value })}
                  placeholder="MM/YY"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleEditPaymentMethod} className="bg-[#27AE60] hover:bg-[#229954]">
              Update Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Payment Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payment method? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="bg-transparent">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePaymentMethod}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
