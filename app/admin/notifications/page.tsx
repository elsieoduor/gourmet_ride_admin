"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Bell, Filter, CheckCircle } from "lucide-react"
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

interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  is_read: boolean
  user: {
    first_name: string
    last_name: string
    email: string
  }
  created_at: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [readFilter, setReadFilter] = useState<string>("all")

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        user_id: "user1",
        title: "Booking Confirmation",
        message: "Your booking #RD001 has been confirmed",
        type: "booking_confirmation",
        is_read: true,
        user: {
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
        },
        created_at: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        user_id: "user2",
        title: "Trip Update",
        message: "Your trip scheduled for today will be delayed by 10 minutes",
        type: "delay_alert",
        is_read: false,
        user: {
          first_name: "Jane",
          last_name: "Smith",
          email: "jane@example.com",
        },
        created_at: "2024-01-16T09:00:00Z",
      },
      {
        id: "3",
        user_id: "user3",
        title: "New Promotion",
        message: "Enjoy 20% off on your next booking with code RIDE20",
        type: "announcement",
        is_read: false,
        user: {
          first_name: "Mike",
          last_name: "Johnson",
          email: "mike@example.com",
        },
        created_at: "2024-01-17T08:00:00Z",
      },
    ]

    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      // Mock delete - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setNotifications(notifications.filter((notification) => notification.id !== notificationId))
      toast.success("Notification deleted successfully")
    } catch (error) {
      toast.error("Failed to delete notification")
    }
  }

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      // Mock update - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId ? { ...notification, is_read: true } : notification,
        ),
      )
      toast.success("Notification marked as read")
    } catch (error) {
      toast.error("Failed to update notification")
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${notification.user.first_name} ${notification.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesRead =
      readFilter === "all" ||
      (readFilter === "read" && notification.is_read) ||
      (readFilter === "unread" && !notification.is_read)

    return matchesSearch && matchesType && matchesRead
  })

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "booking_confirmation":
        return "bg-[#27AE60] text-white"
      case "delay_alert":
        return "bg-yellow-500 text-white"
      case "announcement":
        return "bg-[#2980B9] text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

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
          <h1 className="text-3xl font-bold text-[#2C3E50]">Notifications</h1>
          <p className="text-[#7F8C8D]">Manage system notifications</p>
        </div>
        <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
          <Link href="/admin/notifications/create">
            <Plus className="h-4 w-4 mr-2" />
            Send Notification
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
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="booking_confirmation">Booking</SelectItem>
                  <SelectItem value="delay_alert">Delay Alert</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
              <Select value={readFilter} onValueChange={setReadFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications ({filteredNotifications.length})</CardTitle>
          <CardDescription>System notifications sent to users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-[#27AE60]" />
                        <span className="font-medium text-[#2C3E50]">{notification.title}</span>
                      </div>
                      <div className="text-sm text-[#7F8C8D] line-clamp-2">{notification.message}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-[#2C3E50]">
                      {notification.user.first_name} {notification.user.last_name}
                    </div>
                    <div className="text-sm text-[#7F8C8D]">{notification.user.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeBadgeColor(notification.type)}>
                      {notification.type.replace("_", " ").charAt(0).toUpperCase() +
                        notification.type.replace("_", " ").slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={notification.is_read ? "outline" : "default"}>
                      {notification.is_read ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(notification.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {!notification.is_read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-[#27AE60] hover:bg-green-50 bg-transparent"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/notifications/${notification.id}/edit`}>
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
                            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this notification? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteNotification(notification.id)}
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

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#7F8C8D]">No notifications found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
