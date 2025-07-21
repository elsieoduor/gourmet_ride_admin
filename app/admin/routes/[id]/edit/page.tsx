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
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, RouteIcon } from "lucide-react"
import { toast } from "sonner"

interface PickupLocation {
  id: string
  name: string
}

interface Route {
  id: string
  name: string
  pickup_location_id: string
  dropoff_location_id: string
  duration_minutes: number
  price_per_person: number
  max_capacity: number
  is_active: boolean
}
interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditRoutePage({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [routeId, setRouteId] = useState<string>("")
  const [locations, setLocations] = useState<PickupLocation[]>([])
  const [formData, setFormData] = useState<Route>({
    id: "",
    name: "",
    pickup_location_id: "",
    dropoff_location_id: "",
    duration_minutes: 30,
    price_per_person: 1000,
    max_capacity: 15,
    is_active: true,
  })

  // Mock fetch locations - replace with actual API call
  useEffect(() => {
    const mockLocations: PickupLocation[] = [
      { id: "loc1", name: "City Center" },
      { id: "loc2", name: "Business District" },
      { id: "loc3", name: "University Campus" },
      { id: "loc4", name: "Shopping Mall" },
      { id: "loc5", name: "Residential Area A" },
    ]

    setLocations(mockLocations)
  }, [])
  useEffect(() => {
      const getParams = async () => {
        const resolvedParams = await params
        setRouteId(resolvedParams.id)
      }
      getParams()
    }, [params])

  useEffect(() => {
    // Mock API call to fetch route data - replace with actual implementation
    const fetchRoute = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock route data
        const mockRoute: Route = {
          id: routeId,
          name: "City Center to Business District",
          pickup_location_id: "loc1",
          dropoff_location_id: "loc2",
          duration_minutes: 30,
          price_per_person: 1000,
          max_capacity: 15,
          is_active: true,
        }

        setFormData(mockRoute)
      } catch (error) {
        toast.error("Failed to load route data")
      } finally {
        setInitialLoading(false)
      }
    }

    fetchRoute()
  }, [routeId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate that pickup and dropoff are different
      if (formData.pickup_location_id === formData.dropoff_location_id) {
        toast.error("Pickup and drop-off locations cannot be the same")
        setLoading(false)
        return
      }

      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Route updated successfully")

      router.push("/admin/routes")
    } catch (error) {
      toast.error("Failed to update route")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number | boolean) => {
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
          <Link href="/admin/routes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Edit Route</h1>
          <p className="text-[#7F8C8D]">Update route information</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RouteIcon className="h-5 w-5 text-[#27AE60]" />
            Route Information
          </CardTitle>
          <CardDescription>Update the details for this route</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Route Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., City Center to Business District"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup_location_id">Pickup Location *</Label>
                <Select
                  value={formData.pickup_location_id}
                  onValueChange={(value) => handleInputChange("pickup_location_id", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff_location_id">Drop-off Location *</Label>
                <Select
                  value={formData.dropoff_location_id}
                  onValueChange={(value) => handleInputChange("dropoff_location_id", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select drop-off location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration_minutes">Duration (minutes) *</Label>
                <Input
                  id="duration_minutes"
                  type="number"
                  min="1"
                  value={formData.duration_minutes}
                  onChange={(e) => handleInputChange("duration_minutes", Number.parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_per_person">Price (KSH) *</Label>
                <Input
                  id="price_per_person"
                  type="number"
                  min="0"
                  step="50"
                  value={formData.price_per_person}
                  onChange={(e) => handleInputChange("price_per_person", Number.parseInt(e.target.value))}
                  required
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

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange("is_active", checked)}
              />
              <Label htmlFor="is_active">Active Route</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Updating..." : "Update Route"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/routes">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
