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
import { ArrowLeft, Save, ChefHat } from "lucide-react"
import { toast } from "sonner"

interface FoodCategory {
  id: string
  name: string
  description?: string
  image_url?: string
  sort_order: number
  is_active: boolean
}
interface PageProps {
  params: Promise<{ id: string }>
}


export default function EditFoodCategoryPage({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState<FoodCategory>({
    id: "",
    name: "",
    description: "",
    image_url: "",
    sort_order: 0,
    is_active: true,
  })

  useEffect(() => {
    // Mock API call to fetch category data - replace with actual implementation
    const fetchCategory = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock category data
        const mockCategory: FoodCategory = {
          id: params.id,
          name: "Main Course",
          description: "Primary dishes for a complete meal",
          image_url: "",
          sort_order: 1,
          is_active: true,
        }

        setFormData(mockCategory)
      } catch (error) {
        toast.error("Failed to load category data")
      } finally {
        setInitialLoading(false)
      }
    }

    fetchCategory()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Food category updated successfully")

      router.push("/admin/food-categories")
    } catch (error) {
      toast.error("Failed to update food category")
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
          <Link href="/admin/food-categories">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Edit Food Category</h1>
          <p className="text-[#7F8C8D]">Update food category information</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-[#27AE60]" />
            Category Information
          </CardTitle>
          <CardDescription>Update the details for this food category</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Main Course, Desserts, Beverages"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of this category"
                rows={3}
              />
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
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                min="0"
                value={formData.sort_order}
                onChange={(e) => handleInputChange("sort_order", Number.parseInt(e.target.value))}
                placeholder="Display order (lower numbers appear first)"
              />
              <p className="text-sm text-[#7F8C8D]">Lower numbers will appear first in the menu</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange("is_active", checked)}
              />
              <Label htmlFor="is_active">Active Category</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Updating..." : "Update Category"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/food-categories">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
