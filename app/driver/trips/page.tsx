"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Plus,
  Calendar,
  Clock,
  Users,
  MapPin,
  Navigation,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"

export default function DriverTrips() {
  const [trips, setTrips] = useState([
    {
      id: "TRIP001",
      route: "City Center → Business District",
      date: "2024-01-15",
      time: "12:30 PM",
      status: "in_progress",
      passengers: 8,
      maxCapacity: 15,
      earnings: 120.0,
      duration: "45 min",
    },
    {
      id: "TRIP002",
      route: "University Campus → Residential Area A",
      date: "2024-01-15",
      time: "06:00 PM",
      status: "scheduled",
      passengers: 12,
      maxCapacity: 15,
      earnings: 180.0,
      duration: "30 min",
    },
    {
      id: "TRIP003",
      route: "Business District → Shopping Mall",
      date: "2024-01-14",
      time: "08:30 PM",
      status: "completed",
      passengers: 15,
      maxCapacity: 15,
      earnings: 225.0,
      duration: "35 min",
    },
    {
      id: "TRIP004",
      route: "Shopping Mall → City Center",
      date: "2024-01-14",
      time: "02:15 PM",
      status: "cancelled",
      passengers: 0,
      maxCapacity: 15,
      earnings: 0,
      duration: "40 min",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || trip.status === statusFilter
    const matchesDate = !dateFilter || trip.date === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500"
      case "in_progress":
        return "bg-[#27AE60]"
      case "completed":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="h-4 w-4" />
      case "in_progress":
        return <Navigation className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleUpdateStatus = (tripId: string, newStatus: string) => {
    setTrips((prev) => prev.map((trip) => (trip.id === tripId ? { ...trip, status: newStatus } : trip)))
    toast.success(`Trip status updated to ${newStatus}`)
  }

  const handleDeleteTrip = (tripId: string) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== tripId))
    toast.success("Trip deleted successfully")
  }

  const handleViewTrip = (trip: any) => {
    setSelectedTrip(trip)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">My Trips</h1>
          <p className="text-[#7F8C8D]">Manage your scheduled and completed trips</p>
        </div>
        <Button className="bg-[#27AE60] hover:bg-[#229954]">
          <Plus className="h-4 w-4 mr-2" />
          Request New Trip
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Trips</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7F8C8D]" />
                <Input
                  id="search"
                  placeholder="Search by route or ID..."
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
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setDateFilter("")
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trips Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trips ({filteredTrips.length})</CardTitle>
          <CardDescription>Your trip history and upcoming schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trip ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Passengers</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">{trip.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#7F8C8D]" />
                        {trip.route}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{trip.date}</p>
                        <p className="text-sm text-[#7F8C8D]">{trip.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(trip.status)}>
                        {getStatusIcon(trip.status)}
                        <span className="ml-1">{trip.status.replace("_", " ")}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-[#7F8C8D]" />
                        {trip.passengers}/{trip.maxCapacity}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${trip.earnings.toFixed(2)}</TableCell>
                    <TableCell>{trip.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewTrip(trip)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {trip.status === "scheduled" && (
                          <Select onValueChange={(value) => handleUpdateStatus(trip.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Update" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="in_progress">Start Trip</SelectItem>
                              <SelectItem value="cancelled">Cancel</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        {trip.status === "in_progress" && (
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(trip.id, "completed")}
                            className="bg-[#27AE60] hover:bg-[#229954]"
                          >
                            Complete
                          </Button>
                        )}
                        {trip.status === "scheduled" && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Trip</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this trip? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteTrip(trip.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Trip Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Trip Details</DialogTitle>
            <DialogDescription>Complete information about this trip</DialogDescription>
          </DialogHeader>
          {selectedTrip && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Trip ID</Label>
                  <p className="font-medium">{selectedTrip.id}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedTrip.status)}>{selectedTrip.status.replace("_", " ")}</Badge>
                </div>
                <div>
                  <Label>Route</Label>
                  <p className="font-medium">{selectedTrip.route}</p>
                </div>
                <div>
                  <Label>Date & Time</Label>
                  <p className="font-medium">
                    {selectedTrip.date} at {selectedTrip.time}
                  </p>
                </div>
                <div>
                  <Label>Passengers</Label>
                  <p className="font-medium">
                    {selectedTrip.passengers}/{selectedTrip.maxCapacity}
                  </p>
                </div>
                <div>
                  <Label>Earnings</Label>
                  <p className="font-medium">${selectedTrip.earnings.toFixed(2)}</p>
                </div>
                <div>
                  <Label>Duration</Label>
                  <p className="font-medium">{selectedTrip.duration}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
