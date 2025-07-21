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
import { ArrowLeft, Save, Calendar } from "lucide-react"
import { toast } from "sonner"

interface Route {
  id: string
  name: string
}

interface Driver {
  id: string
  first_name: string
  last_name: string
}

interface Trip {
  id: string
  route_id: string
  driver_id: string
  scheduled_date: string
  scheduled_time: string
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  current_capacity: number
  max_capacity: number
  notes?: string
}
interface PageProps {
  params: Promise<{ id: string }>
}


export default function EditTripPage({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [tripId, setTripId] = useState<string>("")
  const [routes, setRoutes] = useState<Route[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [formData, setFormData] = useState<Trip>({
    id: "",
    route_id: "",
    driver_id: "",
    scheduled_date: "",
    scheduled_time: "",
    status: "scheduled",
    current_capacity: 0,
    max_capacity: 15,
    notes: "",
  })

  // Mock fetch routes and drivers - replace with actual API calls
  useEffect(() => {
    const mockRoutes: Route[] = [
      { id: "route1", name: "City Center → Business District" },
      { id: "route2", name: "University → Shopping Mall" },
      { id: "route3", name: "Shopping Mall → Residential Area" },
    ]

    const mockDrivers: Driver[] = [
      { id: "driver1", first_name: "James", last_name: "Mwangi" },
      { id: "driver2", first_name: "Mary", last_name: "Wanjiku" },
    ]

    setRoutes(mockRoutes)
    setDrivers(mockDrivers)
  }, [])

  useEffect(() => {
      const getParams = async () => {
        const resolvedParams = await params
        setTripId(resolvedParams.id)
      }
      getParams()
    }, [params])

  useEffect(() => {
    // Mock API call to fetch trip data - replace with actual implementation
    const fetchTrip = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock trip data
        const mockTrip: Trip = {
          id: tripId,
          route_id: "route1",
          driver_id: "driver1",
          scheduled_date: "2024-01-20",
          scheduled_time: "12:30",
          status: "scheduled",
          current_capacity: 8,
          max_capacity: 15,
          notes: "Regular weekday trip",
        }

        setFormData(mockTrip)
      } catch (error) {
        toast.error("Failed to load trip data")
      } finally {
        setInitialLoading(false)
      }
    }

    fetchTrip()
  }, [tripId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Trip updated successfully")

      router.push("/admin/trips")
    } catch (error) {
      toast.error("Failed to update trip")
    } finally {
      setLoading(false)
    }
  }

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
          <Link href="/admin/trips">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Edit Trip</h1>
          <p className="text-[#7F8C8D]">Update trip information</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#27AE60]" />
            Trip Information
          </CardTitle>
          <CardDescription>Update the details for this trip</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="route_id">Route *</Label>
              <Select
                value={formData.route_id}
                onValueChange={(value) => handleInputChange("route_id", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route.id} value={route.id}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver_id">Driver *</Label>
              <Select
                value={formData.driver_id}
                onValueChange={(value) => handleInputChange("driver_id", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.first_name} {driver.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduled_date">Date *</Label>
                <Input
                  id="scheduled_date"
                  type="date"
                  value={formData.scheduled_date}
                  onChange={(e) => handleInputChange("scheduled_date", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduled_time">Time *</Label>
                <Input
                  id="scheduled_time"
                  type="time"
                  value={formData.scheduled_time}
                  onChange={(e) => handleInputChange("scheduled_time", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current_capacity">Current Capacity</Label>
                <Input
                  id="current_capacity"
                  type="number"
                  min="0"
                  max={formData.max_capacity}
                  value={formData.current_capacity}
                  onChange={(e) => handleInputChange("current_capacity", Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_capacity">Max Capacity *</Label>
                <Input
                  id="max_capacity"
                  type="number"
                  min="1"
                  max="15"
                  value={formData.max_capacity}
                  onChange={(e) => handleInputChange("max_capacity", Number.parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional information about this trip"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Updating..." : "Update Trip"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/trips">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
