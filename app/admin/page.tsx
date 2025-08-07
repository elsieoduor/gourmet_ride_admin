"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Simple table components
const Table = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <table className={`w-full border-collapse ${className}`}>{children}</table>
)
const TableHeader = ({ children }: { children: React.ReactNode }) => <thead className="bg-gray-50">{children}</thead>
const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>
const TableRow = ({ children }: { children: React.ReactNode }) => <tr className="border-b hover:bg-gray-50">{children}</tr>
const TableHead = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`text-left p-2 sm:p-3 font-medium text-gray-600 ${className}`}>{children}</th>
)
const TableCell = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`p-2 sm:p-3 ${className}`}>{children}</td>
)
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
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-[#27AE60]" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-[#2C3E50]">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-[#7F8C8D]">Gourmet Ride Management Portal</p>
              </div>
            </div>
            <Button className="bg-[#27AE60] hover:bg-[#229954] w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#7F8C8D]">Total Revenue</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#2C3E50]">KSH {stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-[#27AE60]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#7F8C8D]">Total Bookings</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#2C3E50]">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-[#2980B9]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#7F8C8D]">Active Drivers</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#2C3E50]">{stats.activeDrivers}</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#27AE60]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#7F8C8D]">Total Stops</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#2C3E50]">{stats.totalStops}</p>
                </div>
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-[#2980B9]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">Revenue Trend</CardTitle>
              <CardDescription className="text-[#7F8C8D] text-sm">Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [`KSH ${value.toLocaleString()}`, "Revenue"]}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="revenue" fill="#27AE60" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">Ride Occupancy</CardTitle>
              <CardDescription className="text-[#7F8C8D] text-sm">Distribution of ride occupancy rates</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="bookings" className="text-xs sm:text-sm px-2 py-2">Bookings</TabsTrigger>
            <TabsTrigger value="stops" className="text-xs sm:text-sm px-2 py-2">Stops</TabsTrigger>
            <TabsTrigger value="menu" className="text-xs sm:text-sm px-2 py-2">Menu</TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm px-2 py-2">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">Recent Bookings</CardTitle>
                <CardDescription className="text-[#7F8C8D] text-sm">Latest customer reservations</CardDescription>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">ID</TableHead>
                        <TableHead className="text-xs sm:text-sm">Customer</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Route</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium text-xs sm:text-sm">{booking.id}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{booking.customer}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{booking.route}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden md:table-cell">{booking.date}</TableCell>
                          <TableCell className="text-xs sm:text-sm">KSH {booking.amount}</TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${booking.status === "confirmed"
                                  ? "bg-[#27AE60] text-white"
                                  : booking.status === "completed"
                                    ? "bg-[#2980B9] text-white"
                                    : "bg-gray-500 text-white"
                                }`}
                            >
                              {booking.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stops">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">Pickup Stops</CardTitle>
                    <CardDescription className="text-[#7F8C8D] text-sm">
                      Manage fixed pickup and drop-off points
                    </CardDescription>
                  </div>
                  <Button className="bg-[#27AE60] hover:bg-[#229954] w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stop
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Name</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Address</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stops.map((stop) => (
                        <TableRow key={stop.id}>
                          <TableCell className="font-medium text-xs sm:text-sm">{stop.name}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{stop.address}</TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${stop.status === "active" ? "bg-[#27AE60] text-white" : "bg-orange-500 text-white"
                                }`}
                            >
                              {stop.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 sm:gap-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent h-8 w-8 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">Menu Management</CardTitle>
                    <CardDescription className="text-[#7F8C8D] text-sm">Add, edit, and manage food items</CardDescription>
                  </div>
                  <Button className="bg-[#27AE60] hover:bg-[#229954] w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Name</TableHead>
                        <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Category</TableHead>
                        <TableHead className="text-xs sm:text-sm">Price</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menuItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium text-xs sm:text-sm">{item.name}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{item.category}</TableCell>
                          <TableCell className="text-xs sm:text-sm">KSH {item.price}</TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${item.status === "available" ? "bg-[#27AE60] text-white" : "bg-red-500 text-white"
                                }`}
                            >
                              {item.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 sm:gap-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent h-8 w-8 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">User Management</CardTitle>
                <CardDescription className="text-[#7F8C8D] text-sm">Manage customers and drivers</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="text-center py-8 sm:py-12">
                  <Users className="h-12 w-12 sm:h-16 sm:w-16 text-[#7F8C8D] mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#2C3E50] mb-2">User Management</h3>
                  <p className="text-[#7F8C8D] mb-4 text-sm">View and manage all registered users</p>
                  <Button className="bg-[#27AE60] hover:bg-[#229954] w-full sm:w-auto">View All Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}