"use client"

import { useState } from "react"
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
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false)
  const [deleteNotificationId, setDeleteNotificationId] = useState("")

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
        return <Route className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
      case "payment":
        return <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
      case "review":
        return <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
      case "schedule":
        return <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
      case "system":
        return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
      case "achievement":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trip":
        return "bg-green-600"
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

  const formatDate = (dateString: string | number | Date) => {
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
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
    setDeleteNotificationId("")
  }

  const handleDeleteAll = () => {
    setNotifications([])
    setShowDeleteAllDialog(false)
  }

  return (
    <>
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Notifications</h1>
            <p className="text-sm sm:text-base text-slate-600">Stay updated with your trips, earnings, and important announcements</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center justify-center px-3 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Mark All Read</span>
              <span className="xs:hidden">Mark All</span>
            </button>
            <button
              onClick={() => setShowDeleteAllDialog(true)}
              disabled={notifications.length === 0}
              className="flex items-center justify-center px-3 py-1.5 sm:py-2 bg-red-600 text-white rounded-md text-xs sm:text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Clear All</span>
              <span className="xs:hidden">Clear</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-white rounded-lg border p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-600">Total</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800">{notifications.length}</p>
              </div>
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-600">Unread</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800">{unreadCount}</p>
              </div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">{unreadCount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-600">Trips</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800">
                  {notifications.filter((n) => n.type === "trip").length}
                </p>
              </div>
              <Route className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-slate-600">Reviews</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800">
                  {notifications.filter((n) => n.type === "review").length}
                </p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border">
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="sm:col-span-2 lg:col-span-1">
                <label htmlFor="search" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  id="type"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="trip">Trips</option>
                  <option value="payment">Payments</option>
                  <option value="review">Reviews</option>
                  <option value="schedule">Schedule</option>
                  <option value="system">System</option>
                  <option value="achievement">Achievements</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setTypeFilter("all")
                    setStatusFilter("all")
                  }}
                  className="w-full sm:w-auto flex items-center justify-center px-3 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg border">
          <div className="p-3 sm:p-6 border-b">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">Notifications ({filteredNotifications.length})</h2>
            <p className="text-xs sm:text-sm text-slate-600">Your recent notifications and updates</p>
          </div>
          <div className="p-3 sm:p-6">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Bell className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-2 sm:mb-4" />
                <p className="text-sm sm:text-base text-slate-600">No notifications found</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 sm:p-4 border rounded-lg ${!notification.isRead ? "bg-blue-50 border-blue-200" : "bg-white"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                        {getTypeIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                            <h4 className="font-medium text-slate-800 text-sm sm:text-base truncate">{notification.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs text-white ${getTypeColor(notification.type)}`}>
                              {notification.type}
                            </span>
                            {!notification.isRead && (
                              <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm mb-2 break-words">{notification.message}</p>
                          <div className="flex items-center gap-1 sm:gap-2 text-xs text-slate-500">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            {formatDate(notification.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-shrink-0">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
                          >
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteNotificationId(notification.id)}
                          className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete All Dialog */}
      {showDeleteAllDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-sm sm:max-w-lg w-full p-4 sm:p-6">
            <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-2">Clear All Notifications</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Are you sure you want to delete all notifications? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                onClick={() => setShowDeleteAllDialog(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-xs sm:text-sm font-medium hover:bg-red-700"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Notification Dialog */}
      {deleteNotificationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-sm sm:max-w-lg w-full p-4 sm:p-6">
            <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-2">Delete Notification</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Are you sure you want to delete this notification? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                onClick={() => setDeleteNotificationId("")}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteNotification(deleteNotificationId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-xs sm:text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}