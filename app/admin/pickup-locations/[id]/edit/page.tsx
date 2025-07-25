"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, MapPin } from "lucide-react"
import { toast } from "sonner"

interface PickupLocation {
  id: string
  name: string
  address: string
  latitude?: number
  longitude?: number
  is_active: boolean
}
interface PageProps {
  params: Promise<{ id: string }>
}


export default function EditPickupLocationPage({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [pickupId, setPickupId] = useState<string>("")
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState<PickupLocation>({
    id: "",
    name: "",
    address: "",
    latitude: undefined,
    longitude: undefined,
    is_active: true,
  })

  useEffect(() => {
        const getParams = async () => {
          const resolvedParams = await params
          setPickupId(resolvedParams.id)
        }
        getParams()
      }, [params])

  useEffect(() => {
    // Mock API call to fetch location data - replace with actual implementation
    const fetchLocation = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pickup-locations/${pickupId}`, {
          credentials: "include",
        })
        const data = await res.json()

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to fetch pickup location")
        }

        setFormData(data.data)
      } catch (error) {
        toast.error("Failed to load location data")
      } finally {
        setInitialLoading(false)
      }
    }

    fetchLocation()
  }, [pickupId])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    const res = await fetch(`http://localhost:5000/api/pickup-locations/${pickupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Optional: if your API uses cookies
      body: JSON.stringify({
        name: formData.name,
        address: formData.address,
        latitude: formData.latitude ,
        longitude: formData.longitude,
        is_active: formData.is_active,
      }),
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to update location")
    }

    toast.success("Location updated successfully")
    router.push("/admin/pickup-locations")
  } catch (error: any) {
    toast.error(error.message || "Failed to update location")
  } finally {
    setLoading(false)
  }
}


  const handleInputChange = (field: string, value: string | number | boolean | undefined) => {
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
          <Link href="/admin/pickup-locations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Edit Pickup Location</h1>
          <p className="text-[#7F8C8D]">Update pickup or drop-off location details</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#27AE60]" />
            Location Information
          </CardTitle>
          <CardDescription>Update the details for this pickup location</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., City Center, University Campus"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Full address of the location"
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude || ""}
                  onChange={(e) =>
                    handleInputChange("latitude", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                  }
                  placeholder="-1.2864"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude || ""}
                  onChange={(e) =>
                    handleInputChange("longitude", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                  }
                  placeholder="36.8172"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={!!formData.is_active} // ensure it's boolean
                onCheckedChange={(checked) => handleInputChange("is_active", checked)}
              />

              <Label htmlFor="is_active">Active Location</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Updating..." : "Update Location"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/pickup-locations">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
