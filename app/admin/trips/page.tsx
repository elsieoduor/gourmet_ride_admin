"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Filter, Calendar, MapPin, Users } from "lucide-react"
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

interface Trip {
  id: string
  route: {
    id: string
    name: string
    pickup_location: { name: string }
    dropoff_location: { name: string }
  }
  driver: {
    id: string
    first_name: string
    last_name: string
  }
  scheduled_date: string
  scheduled_time: string
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  current_capacity: number
  max_capacity: number
  created_at: string
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("")

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTrips: Trip[] = [
      {
        id: "1",
        route: {
          id: "route1",
          name: "City Center → Business District",
          pickup_location: { name: "City Center" },
          dropoff_location: { name: "Business District" },
        },
        driver: {
          id: "driver1",
          first_name: "James",
          last_name: "Mwangi",
        },
        scheduled_date: "2024-01-20",
        scheduled_time: "12:30",
        status: "scheduled",
        current_capacity: 8,
        max_capacity: 15,
        created_at: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        route: {
          id: "route2",
          name: "University → Shopping Mall",
          pickup_location: { name: "University Campus" },
          dropoff_location: { name: "Shopping Mall" },
        },
        driver: {
          id: "driver2",
          first_name: "Mary",
          last_name: "Wanjiku",
        },
        scheduled_date: "2024-01-21",
        scheduled_time: "18:00",
        status: "in_progress",
        current_capacity: 12,
        max_capacity: 15,
        created_at: "2024-01-16T09:00:00Z",
      },
    ]

    setTimeout(() => {
      setTrips(mockTrips)
      setLoading(false)
    }, 1000)
  }, [])

  const handleDeleteTrip = async (tripId: string) => {
    // Mock delete - replace with actual API call
    setTrips(trips.filter((trip) => trip.id !== tripId))
  }

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.last_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || trip.status === statusFilter
    const matchesDate = !dateFilter || trip.scheduled_date === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500 text-white"
      case "in_progress":
        return "bg-[#27AE60] text-white"
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
          <h1 className="text-3xl font-bold text-[#2C3E50]">Trips</h1>
          <p className="text-[#7F8C8D]">Manage scheduled food truck trips</p>
        </div>
        <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/admin/trips/create">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Trip
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search trips..."
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
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-40" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trips Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Trips ({filteredTrips.length})</CardTitle>
          <CardDescription>Scheduled food truck trips and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-[#2C3E50]">{trip.route.name}</div>
                      <div className="flex items-center gap-1 text-sm text-[#7F8C8D]">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {trip.route.pickup_location.name} → {trip.route.dropoff_location.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-[#2C3E50]">
                      {trip.driver.first_name} {trip.driver.last_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-[#7F8C8D]" />
                        <span>{trip.scheduled_date}</span>
                      </div>
                      <div className="text-sm text-[#7F8C8D]">{trip.scheduled_time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-[#7F8C8D]" />
                      <span className="font-medium">
                        {trip.current_capacity}/{trip.max_capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-[#27AE60] h-2 rounded-full"
                        style={{ width: `${(trip.current_capacity / trip.max_capacity) * 100}%` }}
                      ></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(trip.status)}>
                      {trip.status.replace("_", " ").charAt(0).toUpperCase() + trip.status.replace("_", " ").slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/trips/${trip.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 bg-transparent">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this trip? This action cannot be undone and will affect
                              existing bookings.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTrip(trip.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredTrips.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#7F8C8D]">No trips found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
