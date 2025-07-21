"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, MapPin } from "lucide-react"
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

interface PickupLocation {
  id: string
  name: string
  address: string
  latitude?: number
  longitude?: number
  is_active: boolean
  created_at: string
}

export default function PickupLocationsPage() {
  const [locations, setLocations] = useState<PickupLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockLocations: PickupLocation[] = [
      {
        id: "1",
        name: "City Center",
        address: "Main Street, Downtown Nairobi",
        latitude: -1.2864,
        longitude: 36.8172,
        is_active: true,
        created_at: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        name: "University Campus",
        address: "University Way, Nairobi",
        latitude: -1.2966,
        longitude: 36.8083,
        is_active: true,
        created_at: "2024-01-14T09:00:00Z",
      },
      {
        id: "3",
        name: "Shopping Mall",
        address: "Westlands Mall, Westlands",
        latitude: -1.263,
        longitude: 36.8063,
        is_active: false,
        created_at: "2024-01-13T08:00:00Z",
      },
    ]

    setTimeout(() => {
      setLocations(mockLocations)
      setLoading(false)
    }, 1000)
  }, [])

  const handleDeleteLocation = async (locationId: string) => {
    // Mock delete - replace with actual API call
    setLocations(locations.filter((location) => location.id !== locationId))
  }

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <h1 className="text-3xl font-bold text-[#2C3E50]">Pickup Locations</h1>
          <p className="text-[#7F8C8D]">Manage pickup and drop-off points</p>
        </div>
        <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/admin/pickup-locations/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Locations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Locations ({filteredLocations.length})</CardTitle>
          <CardDescription>Manage pickup and drop-off locations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Coordinates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#27AE60]" />
                      <span className="font-medium text-[#2C3E50]">{location.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>
                    {location.latitude && location.longitude ? (
                      <span className="text-sm text-[#7F8C8D]">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </span>
                    ) : (
                      <span className="text-sm text-[#7F8C8D]">Not set</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={location.is_active ? "default" : "secondary"}>
                      {location.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(location.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/pickup-locations/${location.id}/edit`}>
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
                            <AlertDialogTitle>Delete Location</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{location.name}"? This action cannot be undone and may
                              affect existing routes.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteLocation(location.id)}
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

          {filteredLocations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#7F8C8D]">No locations found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
