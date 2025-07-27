"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, RouteIcon } from "lucide-react"
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
import { toast } from "sonner"

interface Route {
  id: string
  name: string
  pickup_location: {
    id: string
    name: string
  }
  dropoff_location: {
    id: string
    name: string
  }
  duration_minutes: number
  price_per_person: number
  max_capacity: number
  is_active: boolean
  created_at: string
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - replace with actual API calls
  // useEffect(() => {
  //   const mockRoutes: Route[] = [
  //     {
  //       id: "1",
  //       name: "City Center to Business District",
  //       pickup_location: {
  //         id: "loc1",
  //         name: "City Center",
  //       },
  //       dropoff_location: {
  //         id: "loc2",
  //         name: "Business District",
  //       },
  //       duration_minutes: 30,
  //       price_per_person: 1000,
  //       max_capacity: 15,
  //       is_active: true,
  //       created_at: "2024-01-15T10:00:00Z",
  //     },
  //     {
  //       id: "2",
  //       name: "University to Shopping Mall",
  //       pickup_location: {
  //         id: "loc3",
  //         name: "University Campus",
  //       },
  //       dropoff_location: {
  //         id: "loc4",
  //         name: "Shopping Mall",
  //       },
  //       duration_minutes: 25,
  //       price_per_person: 800,
  //       max_capacity: 15,
  //       is_active: true,
  //       created_at: "2024-01-14T09:00:00Z",
  //     },
  //     {
  //       id: "3",
  //       name: "Shopping Mall to Residential Area",
  //       pickup_location: {
  //         id: "loc4",
  //         name: "Shopping Mall",
  //       },
  //       dropoff_location: {
  //         id: "loc5",
  //         name: "Residential Area A",
  //       },
  //       duration_minutes: 35,
  //       price_per_person: 1200,
  //       max_capacity: 15,
  //       is_active: false,
  //       created_at: "2024-01-13T08:00:00Z",
  //     },
  //   ]

  //   setTimeout(() => {
  //     setRoutes(mockRoutes)
  //     setLoading(false)
  //   }, 1000)
  // }, [])
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:5000/api/routes", {
          credentials: "include", // 🔑 Important if cookie-based auth is used
        })

        if (!res.ok) {
          console.error("❌ Failed to fetch routes:", res.statusText)
          return
        }

        const data = await res.json()
        console.log("✅ Routes fetched:", data)
        setRoutes(data.data)
      } catch (err) {
        console.error("❌ Error fetching routes:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])


  // const handleDeleteRoute = async (routeId: string) => {
  //   try {
  //     // Mock delete - replace with actual API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     setRoutes(routes.filter((route) => route.id !== routeId))
  //     toast.success("Route deleted successfully")
  //   } catch (error) {
  //     toast.error("Failed to delete route")
  //   }
  // }
  const handleDeleteRoute = async (routeId: string) => {
  console.log("🗑️ Deleting route:", routeId);

  try {
    const res = await fetch(`http://localhost:5000/api/routes/${routeId}`, {
      method: "DELETE",
      credentials: "include", // 👈 to send cookies (auth)
    });

    const data = await res.json();
    console.log("✅ Delete response:", data);

    if (res.ok) {
      setRoutes(routes.filter((route) => route.id !== routeId)); // ✅ Update UI
    } else {
      alert(data.error || "Failed to delete route.");
    }
  } catch (error) {
    console.error("❌ Delete failed:", error);
    alert("Something went wrong.");
  }
};

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.pickup_location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.dropoff_location.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h1 className="text-3xl font-bold text-[#2C3E50]">Routes</h1>
          <p className="text-[#7F8C8D]">Manage pickup and drop-off routes</p>
        </div>
        <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/admin/routes/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Route
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Routes Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Routes ({filteredRoutes.length})</CardTitle>
          <CardDescription>Manage pickup and drop-off routes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route Name</TableHead>
                <TableHead>Pickup</TableHead>
                <TableHead>Drop-off</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoutes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <RouteIcon className="h-4 w-4 text-[#27AE60]" />
                      <span className="font-medium text-[#2C3E50]">{route.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{route.pickup_location.name}</TableCell>
                  <TableCell>{route.dropoff_location.name}</TableCell>
                  <TableCell>{route.duration_minutes} min</TableCell>
                  <TableCell>
                    <span className="font-medium">KSH {route.price_per_person}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={route.is_active ? "default" : "secondary"}>
                      {route.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/routes/${route.id}/edit`}>
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
                            <AlertDialogTitle>Delete Route</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{route.name}"? This action cannot be undone and may
                              affect existing trips and bookings.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteRoute(route.id)}
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

          {filteredRoutes.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#7F8C8D]">No routes found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
