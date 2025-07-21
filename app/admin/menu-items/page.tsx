"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Filter, ChefHat } from "lucide-react"
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

interface MenuItem {
  id: string
  category_id: string
  name: string
  description?: string
  price: number
  image_url?: string
  ingredients?: string[]
  allergens?: string[]
  is_vegetarian: boolean
  is_vegan: boolean
  is_available: boolean
  preparation_time: number
  sort_order: number
  category: {
    id: string
    name: string
  }
  created_at: string
  updated_at: string
}

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all")

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockMenuItems: MenuItem[] = [
      {
        id: "1",
        category_id: "cat1",
        name: "Gourmet Burger",
        description: "Premium beef patty with artisan toppings",
        price: 800,
        ingredients: ["Beef", "Lettuce", "Tomato", "Cheese", "Bun"],
        allergens: ["Gluten", "Dairy"],
        is_vegetarian: false,
        is_vegan: false,
        is_available: true,
        preparation_time: 15,
        sort_order: 1,
        category: { id: "cat1", name: "Main Course" },
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        category_id: "cat2",
        name: "Truffle Fries",
        description: "Hand-cut fries with truffle oil and parmesan",
        price: 400,
        ingredients: ["Potatoes", "Truffle Oil", "Parmesan", "Salt"],
        allergens: ["Dairy"],
        is_vegetarian: true,
        is_vegan: false,
        is_available: true,
        preparation_time: 10,
        sort_order: 1,
        category: { id: "cat2", name: "Sides" },
        created_at: "2024-01-14T09:00:00Z",
        updated_at: "2024-01-14T09:00:00Z",
      },
      {
        id: "3",
        category_id: "cat3",
        name: "Vegan Salad Bowl",
        description: "Fresh mixed greens with quinoa and tahini dressing",
        price: 600,
        ingredients: ["Mixed Greens", "Quinoa", "Chickpeas", "Tahini"],
        allergens: ["Sesame"],
        is_vegetarian: true,
        is_vegan: true,
        is_available: false,
        preparation_time: 8,
        sort_order: 1,
        category: { id: "cat3", name: "Salads" },
        created_at: "2024-01-13T08:00:00Z",
        updated_at: "2024-01-13T08:00:00Z",
      },
    ]

    setTimeout(() => {
      setMenuItems(mockMenuItems)
      setLoading(false)
    }, 1000)
  }, [])

  const handleDeleteMenuItem = async (itemId: string) => {
    // Mock delete - replace with actual API call
    setMenuItems(menuItems.filter((item) => item.id !== itemId))
  }

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category_id === categoryFilter
    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && item.is_available) ||
      (availabilityFilter === "unavailable" && !item.is_available)

    return matchesSearch && matchesCategory && matchesAvailability
  })

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
          <h1 className="text-3xl font-bold text-[#2C3E50]">Menu Items</h1>
          <p className="text-[#7F8C8D]">Manage food items and their details</p>
        </div>
        <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/admin/menu-items/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
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
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cat1">Main Course</SelectItem>
                  <SelectItem value="cat2">Sides</SelectItem>
                  <SelectItem value="cat3">Salads</SelectItem>
                </SelectContent>
              </Select>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Menu Items ({filteredMenuItems.length})</CardTitle>
          <CardDescription>Manage your food menu items</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Dietary</TableHead>
                <TableHead>Prep Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMenuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F7F9F9] rounded-lg flex items-center justify-center">
                        <ChefHat className="h-5 w-5 text-[#27AE60]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#2C3E50]">{item.name}</div>
                        <div className="text-sm text-[#7F8C8D] line-clamp-1">{item.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">KSH {item.price}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {item.is_vegetarian && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Veg
                        </Badge>
                      )}
                      {item.is_vegan && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Vegan
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-[#7F8C8D]">{item.preparation_time} min</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.is_available ? "default" : "secondary"}>
                      {item.is_available ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/menu-items/${item.id}/edit`}>
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
                            <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{item.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteMenuItem(item.id)}
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

          {filteredMenuItems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#7F8C8D]">No menu items found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
