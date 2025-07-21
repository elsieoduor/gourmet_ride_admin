"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Phone, MessageSquare, QrCode, MapPin, Star, Eye, Filter } from "lucide-react"
import { toast } from "sonner"
type Passenger = {
  id: string
  name: string
  email: string
  phone: string
  pickup: string
  destination: string
  tripId: string
  status: string
  qrCode: string
  foodItems: string[]
  rating: number
  totalTrips: number
  joinDate: string
}

export default function DriverPassengers() {
  const [passengers, setPassengers] = useState([
    {
      id: "P001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1234567890",
      pickup: "City Center",
      destination: "Business District",
      tripId: "TRIP001",
      status: "boarded",
      qrCode: "QR123456",
      foodItems: ["Gourmet Burger", "Truffle Fries"],
      rating: 4.8,
      totalTrips: 15,
      joinDate: "2023-06-15",
    },
    {
      id: "P002",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1234567891",
      pickup: "City Center",
      destination: "Business District",
      tripId: "TRIP001",
      status: "waiting",
      qrCode: "QR789012",
      foodItems: ["Chicken Wrap"],
      rating: 4.9,
      totalTrips: 23,
      joinDate: "2023-04-20",
    },
    {
      id: "P003",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1234567892",
      pickup: "Shopping Mall",
      destination: "Business District",
      tripId: "TRIP001",
      status: "no_show",
      qrCode: "QR345678",
      foodItems: ["Caesar Salad", "Fresh Juice"],
      rating: 4.5,
      totalTrips: 8,
      joinDate: "2023-08-10",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredPassengers = passengers.filter((passenger) => {
    const matchesSearch =
      passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || passenger.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-500"
      case "boarded":
        return "bg-[#27AE60]"
      case "completed":
        return "bg-blue-500"
      case "no_show":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleUpdateStatus = (passengerId: string, newStatus: string) => {
    setPassengers((prev) =>
      prev.map((passenger) => (passenger.id === passengerId ? { ...passenger, status: newStatus } : passenger)),
    )
    toast.success(`Passenger status updated to ${newStatus.replace("_", " ")}`)
  }

  const handleViewPassenger = (passenger: any) => {
    setSelectedPassenger(passenger)
    setIsViewDialogOpen(true)
  }

  const handleContactPassenger = (passenger: any, method: string) => {
    if (method === "phone") {
      window.open(`tel:${passenger.phone}`)
    } else if (method === "sms") {
      window.open(`sms:${passenger.phone}`)
    }
    toast.success(`Contacting ${passenger.name} via ${method}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">Passengers</h1>
          <p className="text-[#7F8C8D]">Manage passengers for your current and upcoming trips</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Total Passengers</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{passengers.length}</p>
              </div>
              <div className="h-8 w-8 bg-[#27AE60] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{passengers.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Boarded</p>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {passengers.filter((p) => p.status === "boarded").length}
                </p>
              </div>
              <div className="h-8 w-8 bg-[#27AE60] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {passengers.filter((p) => p.status === "boarded").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Waiting</p>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {passengers.filter((p) => p.status === "waiting").length}
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {passengers.filter((p) => p.status === "waiting").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">No Show</p>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {passengers.filter((p) => p.status === "no_show").length}
                </p>
              </div>
              <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {passengers.filter((p) => p.status === "no_show").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search Passengers</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7F8C8D]" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="boarded">Boarded</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passengers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Passengers ({filteredPassengers.length})</CardTitle>
          <CardDescription>Current trip passengers and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Pickup Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Food Order</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPassengers.map((passenger) => (
                  <TableRow key={passenger.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback className="bg-[#27AE60] text-white">
                            {passenger.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{passenger.name}</p>
                          <p className="text-sm text-[#7F8C8D]">{passenger.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleContactPassenger(passenger, "phone")}>
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleContactPassenger(passenger, "sms")}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-[#7F8C8D]" />
                        {passenger.pickup}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(passenger.status)}>{passenger.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-32">
                        <p className="text-sm truncate">{passenger.foodItems.join(", ")}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        {passenger.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewPassenger(passenger)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <QrCode className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Passenger QR Code</DialogTitle>
                              <DialogDescription>Scan to verify passenger boarding</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center py-6">
                              <QrCode className="h-32 w-32 text-[#2C3E50] mb-4" />
                              <p className="text-lg font-mono">{passenger.qrCode}</p>
                              <p className="text-sm text-[#7F8C8D] mt-2">{passenger.name}</p>
                              <div className="flex gap-2 mt-4">
                                <Button
                                  onClick={() => handleUpdateStatus(passenger.id, "boarded")}
                                  className="bg-[#27AE60] hover:bg-[#229954]"
                                >
                                  Mark as Boarded
                                </Button>
                                <Button variant="outline" onClick={() => handleUpdateStatus(passenger.id, "no_show")}>
                                  Mark as No Show
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Select onValueChange={(value) => handleUpdateStatus(passenger.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Update" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="waiting">Waiting</SelectItem>
                            <SelectItem value="boarded">Boarded</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="no_show">No Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Passenger Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Passenger Details</DialogTitle>
            <DialogDescription>Complete information about this passenger</DialogDescription>
          </DialogHeader>
          {selectedPassenger && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/placeholder.svg?height=64&width=64`} />
                  <AvatarFallback className="bg-[#27AE60] text-white text-lg">
                    {selectedPassenger.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedPassenger.name}</h3>
                  <p className="text-[#7F8C8D]">{selectedPassenger.email}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{selectedPassenger.rating}</span>
                    <span className="text-[#7F8C8D]">({selectedPassenger.totalTrips} trips)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <p className="font-medium">{selectedPassenger.phone}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedPassenger.status)}>
                    {selectedPassenger.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <Label>Pickup Location</Label>
                  <p className="font-medium">{selectedPassenger.pickup}</p>
                </div>
                <div>
                  <Label>Destination</Label>
                  <p className="font-medium">{selectedPassenger.destination}</p>
                </div>
                <div>
                  <Label>Trip ID</Label>
                  <p className="font-medium">{selectedPassenger.tripId}</p>
                </div>
                <div>
                  <Label>QR Code</Label>
                  <p className="font-medium font-mono">{selectedPassenger.qrCode}</p>
                </div>
                <div className="col-span-2">
                  <Label>Food Order</Label>
                  <p className="font-medium">{selectedPassenger.foodItems.join(", ")}</p>
                </div>
                <div>
                  <Label>Member Since</Label>
                  <p className="font-medium">{selectedPassenger.joinDate}</p>
                </div>
                <div>
                  <Label>Total Trips</Label>
                  <p className="font-medium">{selectedPassenger.totalTrips}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
