"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  Bell,
  Search,
  Filter,
  Check,
  CheckCheck,
  Trash2,
  Calendar,
  CreditCard,
  Star,
  AlertTriangle,
  Info,
  Gift,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "booking" | "payment" | "promotion" | "system" | "review" | "alert"
  isRead: boolean
  createdAt: string
  data?: any
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif_1",
      title: "Booking Confirmed",
      message: "Your ride for Jan 15 at 12:30 PM has been confirmed. Driver: Michael Johnson",
      type: "booking",
      isRead: false,
      createdAt: "2024-01-10T10:30:00Z",
      data: { bookingId: "RD001" },
    },
    {
      id: "notif_2",
      title: "Payment Processed",
      message: "Payment of KSH 2,200 has been successfully processed for booking #RD001",
      type: "payment",
      isRead: false,
      createdAt: "2024-01-10T10:25:00Z",
      data: { amount: 2200, bookingId: "RD001" },
    },
    {
      id: "notif_3",
      title: "Special Offer!",
      message: "Get 20% off your next ride! Use code SAVE20. Valid until Jan 31st.",
      type: "promotion",
      isRead: false,
      createdAt: "2024-01-09T09:00:00Z",
      data: { promoCode: "SAVE20", discount: 20 },
    },
    {
      id: "notif_4",
      title: "Trip Completed",
      message: "Your trip to Business District has been completed. Please rate your experience.",
      type: "review",
      isRead: true,
      createdAt: "2024-01-08T18:45:00Z",
      data: { bookingId: "RD002" },
    },
    {
      id: "notif_5",
      title: "System Maintenance",
      message: "Scheduled maintenance on Jan 20th from 2:00 AM to 4:00 AM. Service may be temporarily unavailable.",
      type: "system",
      isRead: true,
      createdAt: "2024-01-07T12:00:00Z",
    },
    {
      id: "notif_6",
      title: "Loyalty Points Earned",
      message: "You've earned 50 loyalty points from your recent trip! Total points: 1,250",
      type: "promotion",
      isRead: true,
      createdAt: "2024-01-06T19:30:00Z",
      data: { pointsEarned: 50, totalPoints: 1250 },
    },
  ])

  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(notifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  useEffect(() => {
    let filtered = notifications

    if (searchTerm) {
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((notification) => notification.type === typeFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((notification) =>
        statusFilter === "read" ? notification.isRead : !notification.isRead,
      )
    }

    setFilteredNotifications(filtered)
  }, [notifications, searchTerm, typeFilter, statusFilter])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-5 w-5 text-[#27AE60]" />
      case "payment":
        return <CreditCard className="h-5 w-5 text-[#2980B9]" />
      case "promotion":
        return <Gift className="h-5 w-5 text-[#F39C12]" />
      case "system":
        return <Info className="h-5 w-5 text-[#7F8C8D]" />
      case "review":
        return <Star className="h-5 w-5 text-[#F39C12]" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-[#E74C3C]" />
      default:
        return <Bell className="h-5 w-5 text-[#7F8C8D]" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "booking":
        return "bg-green-100 text-green-800"
      case "payment":
        return "bg-blue-100 text-blue-800"
      case "promotion":
        return "bg-orange-100 text-orange-800"
      case "system":
        return "bg-gray-100 text-gray-800"
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "alert":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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

  const handleDeleteAllRead = () => {
    setNotifications((prev) => prev.filter((notification) => !notification.isRead))
    toast.success("All read notifications deleted")
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Notifications</h1>
          <p className="text-[#7F8C8D] mt-2">
            Stay updated with your bookings and account activity
            {unreadCount > 0 && <Badge className="ml-2 bg-red-500 text-white">{unreadCount} unread</Badge>}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} variant="outline" className="bg-transparent">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button onClick={handleDeleteAllRead} variant="outline" className="bg-transparent">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7F8C8D] h-4 w-4" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="booking">Bookings</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="promotion">Promotions</SelectItem>
                <SelectItem value="review">Reviews</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="alert">Alerts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                !notification.isRead ? "border-l-4 border-l-[#27AE60] bg-green-50" : ""
              }`}
              onClick={() => setSelectedNotification(notification)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!notification.isRead ? "text-[#2C3E50]" : "text-[#7F8C8D]"}`}>
                            {notification.title}
                          </h3>
                          <Badge className={getTypeColor(notification.type)}>{notification.type}</Badge>
                          {!notification.isRead && <div className="w-2 h-2 bg-[#27AE60] rounded-full"></div>}
                        </div>
                        <p className={`text-sm ${!notification.isRead ? "text-[#2C3E50]" : "text-[#7F8C8D]"}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-[#7F8C8D] mt-2">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(notification.id)
                            }}
                            className="bg-transparent"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteNotification(notification.id)
                          }}
                          className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Bell className="h-16 w-16 text-[#7F8C8D] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">No notifications found</h3>
              <p className="text-[#7F8C8D]">
                {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You're all caught up! New notifications will appear here"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notification Details Dialog */}
      {selectedNotification && (
        <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center gap-3">
                {getNotificationIcon(selectedNotification.type)}
                <div>
                  <DialogTitle>{selectedNotification.title}</DialogTitle>
                  <DialogDescription>{new Date(selectedNotification.createdAt).toLocaleString()}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Badge className={getTypeColor(selectedNotification.type)}>{selectedNotification.type}</Badge>
              </div>
              <p className="text-[#2C3E50]">{selectedNotification.message}</p>
              {selectedNotification.data && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-[#2C3E50] mb-2">Additional Details:</h4>
                  <pre className="text-sm text-[#7F8C8D]">{JSON.stringify(selectedNotification.data, null, 2)}</pre>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedNotification(null)} className="bg-transparent">
                Close
              </Button>
              {!selectedNotification.isRead && (
                <Button
                  onClick={() => {
                    handleMarkAsRead(selectedNotification.id)
                    setSelectedNotification(null)
                  }}
                  className="bg-[#27AE60] hover:bg-[#229954]"
                >
                  Mark as Read
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
