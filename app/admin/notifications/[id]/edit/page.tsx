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
import { ArrowLeft, Save, Bell } from "lucide-react"
import { toast } from "sonner"

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}

// interface Notification {
//   id: string
//   user_id: string
//   title: string
//   message: string
//   type: string
//   is_read: boolean
// }

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  user_id: string;
  data?: any;
  created_at?: string;
  users?: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
};

interface PageProps {
  params: Promise<{ id: string }>
}


export default function EditNotificationPage({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [notiId, setNotiId] = useState<string>("")
  const [initialLoading, setInitialLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState<Notification>({
    id: "",
    user_id: "",
    title: "",
    message: "",
    type: "announcement",
    is_read: false,
    created_at:""
  })

  // Mock fetch users - replace with actual API call
  // useEffect(() => {
  //   const mockUsers: User[] = [
  //     { id: "user1", first_name: "John", last_name: "Doe", email: "john@example.com" },
  //     { id: "user2", first_name: "Jane", last_name: "Smith", email: "jane@example.com" },
  //     { id: "user3", first_name: "Mike", last_name: "Johnson", email: "mike@example.com" },
  //   ]

  //   setUsers(mockUsers)
  // }, [])
  useEffect(() => {
    const getParams = async () => {
    const resolvedParams = await params
      setNotiId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true)
        try {
          const res = await fetch("http://localhost:5000/api/users", {
            credentials: "include", // 🔑 Important if cookie-based auth is used
          })
  
          if (!res.ok) {
            console.error("❌ Failed to fetch users:", res.statusText)
            return
          }
  
          const data = await res.json()
          console.log("✅ Users fetched:", data)
          setUsers(data.data)
        } catch (err) {
          console.error("❌ Error fetching users:", err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchUsers()
    }, [])

  useEffect(() => {
  const fetchNotification = async () => {
    try {
      setInitialLoading(true);

      const res = await fetch(`http://localhost:5000/api/notifications/${notiId}`, {
        credentials: "include", // ensures cookies (auth) are sent
      });

      if (!res.ok) {
        throw new Error("Failed to fetch notification");
      }

      const notification = await res.json();
      console.log(notification.data)
      setFormData(notification.data); // notification should match Notification type
    } catch (error) {
      console.error("Error fetching notification:", error);
      toast.error("Failed to load notification data");
    } finally {
      setInitialLoading(false);
    }
  };

  if (notiId) {
    fetchNotification();
  }
}, [notiId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || "Failed to create notification")

      toast.success("Notification created successfully")
      router.push("/admin/notifications")
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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
          <Link href="/admin/notifications">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Edit Notification</h1>
          <p className="text-[#7F8C8D]">Update notification information</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#27AE60]" />
            Notification Details
          </CardTitle>
          <CardDescription>Update the details for this notification</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user_id">Recipient *</Label>
              <Select value={formData.user_id} onValueChange={(value) => handleInputChange("user_id", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Notification Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="booking_confirmation">Booking Confirmation</SelectItem>
                  <SelectItem value="delay_alert">Delay Alert</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Notification title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Notification message"
                rows={4}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_read"
                checked={formData.is_read}
                onCheckedChange={(checked) => handleInputChange("is_read", checked)}
              />
              <Label htmlFor="is_read">Mark as Read</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Updating..." : "Update Notification"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/notifications">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
