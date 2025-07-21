"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Truck, Users, MapPin, Calendar, DollarSign, Plus, Edit, Trash2 } from "lucide-react"

export default function AdminDashboard() {
  const [stats] = useState({
    totalRevenue: 125000,
    totalBookings: 342,
    activeDrivers: 8,
    totalStops: 12,
  })

  const revenueData = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 19000 },
    { month: "May", revenue: 25000 },
    { month: "Jun", revenue: 26000 },
  ]

  const occupancyData = [
    { name: "Full (15/15)", value: 45, color: "#27AE60" },
    { name: "High (10-14)", value: 30, color: "#2980B9" },
    { name: "Medium (5-9)", value: 20, color: "#F39C12" },
    { name: "Low (1-4)", value: 5, color: "#E74C3C" },
  ]

  const [stops] = useState([
    { id: 1, name: "City Center", address: "Main Street, Downtown", status: "active" },
    { id: 2, name: "University Campus", address: "University Ave", status: "active" },
    { id: 3, name: "Shopping Mall", address: "Mall Road", status: "active" },
    { id: 4, name: "Business District", address: "Corporate Plaza", status: "maintenance" },
  ])

  const [menuItems] = useState([
    { id: 1, name: "Gourmet Burger", price: 800, category: "Main", status: "available" },
    { id: 2, name: "Truffle Fries", price: 400, category: "Sides", status: "available" },
    { id: 3, name: "Chicken Wrap", price: 600, category: "Main", status: "available" },
    { id: 4, name: "Caesar Salad", price: 500, category: "Salads", status: "out-of-stock" },
  ])

  const [recentBookings] = useState([
    {
      id: "RD001",
      customer: "John Doe",
      route: "City Center → Business District",
      date: "2024-01-15",
      amount: 1500,
      status: "confirmed",
    },
    {
      id: "RD002",
      customer: "Jane Smith",
      route: "University → Mall",
      date: "2024-01-15",
      amount: 1200,
      status: "completed",
    },
    {
      id: "RD003",
      customer: "Mike Johnson",
      route: "Mall → Residential",
      date: "2024-01-14",
      amount: 1800,
      status: "confirmed",
    },
  ])

  return (
    <div className="min-h-screen bg-[#F7F9F9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-[#27AE60]" />
              <div>
                <h1 className="text-2xl font-bold text-[#2C3E50]">Admin Dashboard</h1>
                <p className="text-sm text-[#7F8C8D]">Gourmet Ride Management Portal</p>
              </div>
            </div>
            <Button className="bg-[#27AE60] hover:bg-[#229954]">
              <Plus className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7F8C8D]">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">KSH {stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#27AE60]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7F8C8D]">Total Bookings</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-[#2980B9]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7F8C8D]">Active Drivers</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{stats.activeDrivers}</p>
                </div>
                <Users className="h-8 w-8 text-[#27AE60]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7F8C8D]">Total Stops</p>
                  <p className="text-2xl font-bold text-[#2C3E50]">{stats.totalStops}</p>
                </div>
                <MapPin className="h-8 w-8 text-[#2980B9]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">Revenue Trend</CardTitle>
              <CardDescription className="text-[#7F8C8D]">Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`KSH ${value.toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#27AE60" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#2C3E50]">Ride Occupancy</CardTitle>
              <CardDescription className="text-[#7F8C8D]">Distribution of ride occupancy rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="stops">Stops</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2C3E50]">Recent Bookings</CardTitle>
                <CardDescription className="text-[#7F8C8D]">Latest customer reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.customer}</TableCell>
                        <TableCell>{booking.route}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>KSH {booking.amount}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              booking.status === "confirmed"
                                ? "bg-[#27AE60] text-white"
                                : booking.status === "completed"
                                  ? "bg-[#2980B9] text-white"
                                  : "bg-gray-500 text-white"
                            }
                          >
                            {booking.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stops">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#2C3E50]">Pickup Stops</CardTitle>
                    <CardDescription className="text-[#7F8C8D]">
                      Manage fixed pickup and drop-off points
                    </CardDescription>
                  </div>
                  <Button className="bg-[#27AE60] hover:bg-[#229954]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stop
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stops.map((stop) => (
                      <TableRow key={stop.id}>
                        <TableCell className="font-medium">{stop.name}</TableCell>
                        <TableCell>{stop.address}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              stop.status === "active" ? "bg-[#27AE60] text-white" : "bg-orange-500 text-white"
                            }
                          >
                            {stop.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#2C3E50]">Menu Management</CardTitle>
                    <CardDescription className="text-[#7F8C8D]">Add, edit, and manage food items</CardDescription>
                  </div>
                  <Button className="bg-[#27AE60] hover:bg-[#229954]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>KSH {item.price}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.status === "available" ? "bg-[#27AE60] text-white" : "bg-red-500 text-white"
                            }
                          >
                            {item.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2C3E50]">User Management</CardTitle>
                <CardDescription className="text-[#7F8C8D]">Manage customers and drivers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-[#7F8C8D] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">User Management</h3>
                  <p className="text-[#7F8C8D] mb-4">View and manage all registered users</p>
                  <Button className="bg-[#27AE60] hover:bg-[#229954]">View All Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
