"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Users, Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"

export default function DriverSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("week") // week, month

  const [schedule, setSchedule] = useState([
    {
      id: "S001",
      date: "2024-01-15",
      time: "08:00 AM",
      endTime: "09:00 AM",
      route: "City Center → Business District",
      status: "confirmed",
      passengers: 12,
      maxCapacity: 15,
      earnings: 180.0,
      type: "regular",
    },
    {
      id: "S002",
      date: "2024-01-15",
      time: "12:30 PM",
      endTime: "01:30 PM",
      route: "Business District → Shopping Mall",
      status: "confirmed",
      passengers: 8,
      maxCapacity: 15,
      earnings: 120.0,
      type: "regular",
    },
    {
      id: "S003",
      date: "2024-01-15",
      time: "06:00 PM",
      endTime: "07:00 PM",
      route: "University Campus → Residential Area",
      status: "pending",
      passengers: 15,
      maxCapacity: 15,
      earnings: 225.0,
      type: "premium",
    },
    {
      id: "S004",
      date: "2024-01-16",
      time: "09:00 AM",
      endTime: "10:00 AM",
      route: "City Center → Airport",
      status: "confirmed",
      passengers: 6,
      maxCapacity: 15,
      earnings: 150.0,
      type: "express",
    },
    {
      id: "S005",
      date: "2024-01-16",
      time: "02:00 PM",
      endTime: "03:00 PM",
      route: "Shopping Mall → City Center",
      status: "available",
      passengers: 0,
      maxCapacity: 15,
      earnings: 0,
      type: "regular",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-[#27AE60]"
      case "pending":
        return "bg-yellow-500"
      case "available":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "premium":
        return "bg-purple-500"
      case "express":
        return "bg-orange-500"
      case "regular":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getScheduleForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return schedule.filter((item) => item.date === dateString)
  }

  const handleStatusUpdate = (scheduleId: string, newStatus: string) => {
    setSchedule((prev) => prev.map((item) => (item.id === scheduleId ? { ...item, status: newStatus } : item)))
    toast.success(`Schedule updated to ${newStatus}`)
  }

  const handleDeleteSchedule = (scheduleId: string) => {
    setSchedule((prev) => prev.filter((item) => item.id !== scheduleId))
    toast.success("Schedule item deleted")
  }

  const todaySchedule = getScheduleForDate(new Date())
  const selectedDateSchedule = getScheduleForDate(selectedDate)

  const weeklyStats = {
    totalTrips: schedule.filter((s) => s.status === "confirmed").length,
    totalEarnings: schedule.filter((s) => s.status === "confirmed").reduce((sum, s) => sum + s.earnings, 0),
    totalHours: schedule.filter((s) => s.status === "confirmed").length * 1, // Assuming 1 hour per trip
    availableSlots: schedule.filter((s) => s.status === "available").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">My Schedule</h1>
          <p className="text-[#7F8C8D]">Manage your driving schedule and availability</p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#27AE60] hover:bg-[#229954]">
            <Plus className="h-4 w-4 mr-2" />
            Add Availability
          </Button>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">This Week</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{weeklyStats.totalTrips}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-[#27AE60]" />
            </div>
            <p className="text-xs text-[#7F8C8D] mt-1">Confirmed Trips</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Earnings</p>
                <p className="text-2xl font-bold text-[#2C3E50]">${weeklyStats.totalEarnings}</p>
              </div>
              <div className="h-8 w-8 bg-[#27AE60] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">$</span>
              </div>
            </div>
            <p className="text-xs text-[#7F8C8D] mt-1">This Week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Hours</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{weeklyStats.totalHours}h</p>
              </div>
              <Clock className="h-8 w-8 text-[#27AE60]" />
            </div>
            <p className="text-xs text-[#7F8C8D] mt-1">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Available</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{weeklyStats.availableSlots}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-[#7F8C8D] mt-1">Open Slots</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>

        {/* Schedule for Selected Date */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedDate ? formatDate(selectedDate) : "Today's Schedule"}</CardTitle>
            <CardDescription>{selectedDateSchedule.length} scheduled items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDateSchedule.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-[#7F8C8D] mx-auto mb-4" />
                  <p className="text-[#7F8C8D]">No schedule items for this date</p>
                  <Button className="mt-4 bg-[#27AE60] hover:bg-[#229954]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Availability
                  </Button>
                </div>
              ) : (
                selectedDateSchedule.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        <Badge className={getTypeColor(item.type)} variant="outline">
                          {item.type}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-[#2C3E50]">{item.route}</h4>
                      <div className="flex items-center gap-4 text-sm text-[#7F8C8D] mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.time} - {item.endTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.passengers}/{item.maxCapacity}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[#27AE60] font-medium">${item.earnings}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(item.id, "confirmed")}
                            className="bg-[#27AE60] hover:bg-[#229954]"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusUpdate(item.id, "cancelled")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {item.status === "available" && (
                        <Button size="sm" variant="outline" onClick={() => handleDeleteSchedule(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Quick View */}
      {todaySchedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Quick overview of today's trips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todaySchedule.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    <span className="text-sm font-medium text-[#27AE60]">${item.earnings}</span>
                  </div>
                  <h4 className="font-medium text-[#2C3E50] mb-1">{item.route}</h4>
                  <div className="flex items-center gap-2 text-sm text-[#7F8C8D]">
                    <Clock className="h-3 w-3" />
                    {item.time}
                    <Users className="h-3 w-3 ml-2" />
                    {item.passengers}/{item.maxCapacity}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
