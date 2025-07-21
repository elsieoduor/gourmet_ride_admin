"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  Bell,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  Users,
  DollarSign,
  Route,
  Clock,
} from "lucide-react"
import { toast } from "sonner"

export default function DriverNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "N001",
      title: "New Trip Assignment",
      message: "You have been assigned to Trip #TRIP004 scheduled for tomorrow at 9:00 AM",
      type: "trip",
      isRead: false,
      createdAt: "2024-01-15T10:30:00Z",
      data: {
        tripId: "TRIP004",
        route: "City Center → Airport",
        time: "09:00 AM",
      },
    },
    {
      id: "N002",
      title: "Payment Processed",
      message: "Your weekly earnings of $285.00 have been processed and will be deposited within 2 business days",
      type: "payment",
      isRead: false,
      createdAt: "2024-01-15T09:15:00Z",
      data: {
        amount: 285.0,
        period: "Week of Jan 8-14",
      },
    },
    {
      id: "N003",
      title: "Customer Review",
      message:
        "John Doe left you a 5-star review: 'Excellent driver! Very professional and the food truck experience was amazing.'",
      type: "review",
      isRead: true,
      createdAt: "2024-01-14T16:45:00Z",
      data: {
        rating: 5,
        customer: "John Doe",
        tripId: "TRIP001",
      },
    },
    {
      id: "N004",
      title: "Schedule Update",
      message: "Your schedule for tomorrow has been updated. Please check your calendar for changes.",
      type: "schedule",
      isRead: true,
      createdAt: "2024-01-14T14:20:00Z",
      data: {
        date: "2024-01-16",
        changes: 2,
      },
    },
    {
      id: "N005",
      title: "System Maintenance",
      message:
        "Scheduled system maintenance will occur tonight from 2:00 AM to 4:00 AM. The app may be temporarily unavailable.",
      type: "system",
      isRead: false,
      createdAt: "2024-01-14T12:00:00Z",
      data: {
        startTime: "2:00 AM",
        endTime: "4:00 AM",
        date: "2024-01-15",
      },
    },
    {
      id: "N006",
      title: "Achievement Unlocked",
      message:
        "Congratulations! You've earned the '5-Star Driver' achievement for maintaining a 4.8+ rating for 30 days.",
      type: "achievement",
      isRead: true,
      createdAt: "2024-01-10T11:30:00Z",
      data: {
        achievement: "5-Star Driver",
        rating: 4.8,
      },
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "read" && notification.isRead) ||
      (statusFilter === "unread" && !notification.isRead)

    return matchesSearch && matchesType && matchesStatus
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trip":
        return <Route className="h-5 w-5 text-[#27AE60]" />
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-500" />
      case "review":
        return <Users className="h-5 w-5 text-blue-500" />
      case "schedule":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "system":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "achievement":
        return <CheckCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trip":
        return "bg-[#27AE60]"
      case "payment":
        return "bg-green-500"
      case "review":
        return "bg-blue-500"
      case "schedule":
        return "bg-purple-500"
      case "system":
        return "bg-orange-500"
      case "achievement":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
    toast.success("Notification marked as read")
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
    toast.success("All notifications marked as read")
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
    toast.success("Notification deleted")
  }

  const handleDeleteAll = () => {
    setNotifications([])
    toast.success("All notifications deleted")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">Notifications</h1>
          <p className="text-[#7F8C8D]">Stay updated with your trips, earnings, and important announcements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={notifications.length === 0}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Notifications</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete all notifications? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAll} className="bg-red-500 hover:bg-red-600">
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Total</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Unread</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{unreadCount}</p>
              </div>
              <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{unreadCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Trip Updates</p>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {notifications.filter((n) => n.type === "trip").length}
                </p>
              </div>
              <Route className="h-8 w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Reviews</p>
                <p className="text-2xl font-bold text-[#2C3E50]">
                  {notifications.filter((n) => n.type === "review").length}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Notifications</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7F8C8D]" />
                <Input
                  id="search"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="trip">Trip Updates</SelectItem>
                  <SelectItem value="payment">Payments</SelectItem>
                  <SelectItem value="review">Reviews</SelectItem>
                  <SelectItem value="schedule">Schedule</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="achievement">Achievements</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setTypeFilter("all")
                  setStatusFilter("all")
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
          <CardDescription>Your recent notifications and updates</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-[#7F8C8D] mx-auto mb-4" />
              <p className="text-[#7F8C8D]">No notifications found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${
                    !notification.isRead ? "bg-blue-50 border-blue-200" : "bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getTypeIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-[#2C3E50]">{notification.title}</h4>
                          <Badge className={getTypeColor(notification.type)}>{notification.type}</Badge>
                          {!notification.isRead && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-[#7F8C8D] text-sm mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-[#7F8C8D]">
                          <Clock className="h-3 w-3" />
                          {formatDate(notification.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(notification.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
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
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
