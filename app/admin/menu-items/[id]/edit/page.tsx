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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, ChefHat } from "lucide-react"
import { toast } from "sonner"

interface FoodCategory {
  id: string
  name: string
}

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
}
interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditMenuItemPage({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [menuId, setMenuId] = useState<string>("")
  const [initialLoading, setInitialLoading] = useState(true)
  const [categories, setCategories] = useState<FoodCategory[]>([])
  const [formData, setFormData] = useState<MenuItem>({
    id: "",
    category_id: "",
    name: "",
    description: "",
    price: 0,
    image_url: "",
    ingredients: [],
    allergens: [],
    is_vegetarian: false,
    is_vegan: false,
    is_available: true,
    preparation_time: 0,
    sort_order: 0,
  })

  // Mock fetch categories - replace with actual API call
  // useEffect(() => {
  //   const mockCategories: FoodCategory[] = [
  //     { id: "cat1", name: "Main Course" },
  //     { id: "cat2", name: "Sides" },
  //     { id: "cat3", name: "Salads" },
  //     { id: "cat4", name: "Desserts" },
  //   ]

  //   setCategories(mockCategories)
  // }, [])
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/food-categories", {
        credentials: "include",
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch food categories")
      }

      setCategories(data.data) // adjust if your API returns differently
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      toast.error("Failed to load categories")
    }
  }

  fetchCategories()
}, [])

  useEffect(() => {
      const getParams = async () => {
        const resolvedParams = await params
        setMenuId(resolvedParams.id)
      }
      getParams()
    }, [params])

  // useEffect(() => {
  //   // Mock API call to fetch menu item data - replace with actual implementation
  //   const fetchMenuItem = async () => {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       // Mock menu item data
  //       const mockMenuItem: MenuItem = {
  //         id: menuId,
  //         category_id: "cat1",
  //         name: "Gourmet Burger",
  //         description: "Premium beef patty with artisan toppings",
  //         price: 800,
  //         image_url: "",
  //         ingredients: ["Beef", "Lettuce", "Tomato", "Cheese", "Bun"],
  //         allergens: ["Gluten", "Dairy"],
  //         is_vegetarian: false,
  //         is_vegan: false,
  //         is_available: true,
  //         preparation_time: 15,
  //         sort_order: 1,
  //       }

  //       setFormData(mockMenuItem)
  //     } catch (error) {
  //       toast.error("Failed to load menu item data")
  //     } finally {
  //       setInitialLoading(false)
  //     }
  //   }

  //   fetchMenuItem()
  // }, [menuId])

    useEffect(() => {
  const fetchMenuItem = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${menuId}`, {
        credentials: "include",
      })

      const data = await res.json()
      console.log(data.data)

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch menu item")
      }

      const rawItem = data.data

      const normalizedItem: MenuItem = {
        ...rawItem,
        category_id: rawItem.food_category_id, // Fix mapping
      }

      setFormData(normalizedItem)
 // data.data must match your MenuItem type
    } catch (error) {
      console.error("Failed to fetch menu item:", error)
      toast.error("Failed to load menu item")
    } finally {
      setInitialLoading(false)
    }
  }

  if (menuId) fetchMenuItem()
}, [menuId])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    const res = await fetch(`http://localhost:5000/api/menu/${menuId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to update menu item")
    }

    toast.success("Menu item updated successfully")
    router.push("/admin/menu-items")
  } catch (error) {
    console.error("Update failed:", error)
    toast.error("Failed to update menu item")
  } finally {
    setLoading(false)
  }
}

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (initialLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/menu-items">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Edit Menu Item</h1>
          <p className="text-[#7F8C8D]">Update menu item information</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-[#27AE60]" />
            Menu Item Information
          </CardTitle>
          <CardDescription>Update the details for this menu item</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Gourmet Burger, Caesar Salad"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_id">Category *</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => handleInputChange("category_id", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of this menu item"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (KSH) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="50"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preparation_time">Preparation Time (minutes)</Label>
                <Input
                  id="preparation_time"
                  type="number"
                  min="0"
                  value={formData.preparation_time}
                  onChange={(e) => handleInputChange("preparation_time", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url || ""}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Input
                id="ingredients"
                value={formData.ingredients?.join(", ") || ""}
                onChange={(e) => handleInputChange("ingredients", e.target.value.split(", ").filter(Boolean))}
                placeholder="Comma-separated list of ingredients"
              />
              <p className="text-sm text-[#7F8C8D]">Enter ingredients separated by commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergens">Allergens</Label>
              <Input
                id="allergens"
                value={formData.allergens?.join(", ") || ""}
                onChange={(e) => handleInputChange("allergens", e.target.value.split(", ").filter(Boolean))}
                placeholder="Comma-separated list of allergens"
              />
              <p className="text-sm text-[#7F8C8D]">Enter allergens separated by commas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_vegetarian"
                  checked={formData.is_vegetarian}
                  onCheckedChange={(checked) => handleInputChange("is_vegetarian", checked)}
                />
                <Label htmlFor="is_vegetarian">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_vegan"
                  checked={formData.is_vegan}
                  onCheckedChange={(checked) => handleInputChange("is_vegan", checked)}
                />
                <Label htmlFor="is_vegan">Vegan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_available"
                  checked={formData.is_available}
                  onCheckedChange={(checked) => handleInputChange("is_available", checked)}
                />
                <Label htmlFor="is_available">Available</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                min="0"
                value={formData.sort_order}
                onChange={(e) => handleInputChange("sort_order", Number.parseInt(e.target.value))}
                placeholder="Display order within category"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Updating..." : "Update Menu Item"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/menu-items">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
