"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, ChefHat, ArrowUpDown } from "lucide-react"
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

interface FoodCategory {
  id: string
  name: string
  description?: string
  image_url?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export default function FoodCategoriesPage() {
  const [categories, setCategories] = useState<FoodCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - replace with actual API calls
  useEffect(() => {
  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/food-categories", {
        credentials: "include",
      }) 
      if (!res.ok) throw new Error("Failed to fetch categories")
      const json = await res.json()
      setCategories(json.data) // 👈 Assumes response is { data: [...] }
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  fetchCategories()
}, [])


  // const handleDeleteCategory = async (categoryId: string) => {
  //   try {
  //     // Mock delete - replace with actual API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     setCategories(categories.filter((category) => category.id !== categoryId))
  //     toast.success("Category deleted successfully")
  //   } catch (error) {
  //     toast.error("Failed to delete category")
  //   }
  // }
  const handleDeleteCategory = async (categoryId: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/food-categories/${categoryId}`, {
      method: "DELETE",
      credentials: "include",
    })
    if (!res.ok) throw new Error("Failed to delete")
    setCategories(categories.filter((cat) => cat.id !== categoryId))
    toast.success("Category deleted successfully")
  } catch (err) {
    toast.error("Failed to delete category")
  }
}

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h1 className="text-3xl font-bold text-[#2C3E50]">Food Categories</h1>
          <p className="text-[#7F8C8D]">Manage menu categories</p>
        </div>
        <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/admin/food-categories/create">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories ({filteredCategories.length})</CardTitle>
          <CardDescription>Manage food menu categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Sort Order
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ChefHat className="h-4 w-4 text-[#27AE60]" />
                      <span className="font-medium text-[#2C3E50]">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{category.description || "No description"}</TableCell>
                  <TableCell>{category.sort_order}</TableCell>
                  <TableCell>
                    <Badge variant={category.is_active ? "default" : "secondary"}>
                      {category.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(category.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/food-categories/${category.id}/edit`}>
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
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{category.name}"? This action cannot be undone and will
                              affect all menu items in this category.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCategory(category.id)}
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

          {filteredCategories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#7F8C8D]">No categories found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
