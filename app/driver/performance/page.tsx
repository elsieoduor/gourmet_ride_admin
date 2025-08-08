"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, TrendingUp, TrendingDown, DollarSign, Clock, Route, Award, Target, BarChart3 } from "lucide-react"

export default function DriverPerformance() {
  const [timeRange, setTimeRange] = useState("week") // week, month, year

  const [performanceData] = useState({
    overall: {
      rating: 4.8,
      totalTrips: 156,
      totalEarnings: 3420.5,
      totalHours: 234,
      completionRate: 96.2,
      onTimeRate: 94.5,
      customerSatisfaction: 4.7,
    },
    weekly: {
      trips: 12,
      earnings: 285.0,
      hours: 18,
      rating: 4.9,
      trend: "up",
    },
    monthly: {
      trips: 48,
      earnings: 1140.0,
      hours: 72,
      rating: 4.8,
      trend: "stable",
    },
    achievements: [
      {
        id: "A001",
        title: "5-Star Driver",
        description: "Maintained 4.8+ rating for 30 days",
        icon: "star",
        earned: true,
        date: "2024-01-10",
      },
      {
        id: "A002",
        title: "Perfect Week",
        description: "Completed all scheduled trips in a week",
        icon: "target",
        earned: true,
        date: "2024-01-08",
      },
      {
        id: "A003",
        title: "Customer Favorite",
        description: "Received 10+ positive reviews",
        icon: "award",
        earned: true,
        date: "2024-01-05",
      },
      {
        id: "A004",
        title: "Speed Demon",
        description: "Complete 100 trips",
        icon: "route",
        earned: false,
        progress: 78,
      },
    ],
    recentReviews: [
      {
        id: "R001",
        passenger: "John Doe",
        rating: 5,
        comment: "Excellent driver! Very professional and the food truck experience was amazing.",
        date: "2024-01-14",
        trip: "City Center → Business District",
      },
      {
        id: "R002",
        passenger: "Jane Smith",
        rating: 5,
        comment: "Great service, on time and friendly. Will definitely book again!",
        date: "2024-01-13",
        trip: "University → Residential Area",
      },
      {
        id: "R003",
        passenger: "Mike Johnson",
        rating: 4,
        comment: "Good experience overall. Driver was helpful and food was great.",
        date: "2024-01-12",
        trip: "Shopping Mall → City Center",
      },
    ],
    goals: [
      {
        id: "G001",
        title: "Weekly Earnings",
        target: 300,
        current: 285,
        unit: "$",
        progress: 95,
      },
      {
        id: "G002",
        title: "Customer Rating",
        target: 4.9,
        current: 4.8,
        unit: "★",
        progress: 98,
      },
      {
        id: "G003",
        title: "Trip Completion",
        target: 15,
        current: 12,
        unit: "trips",
        progress: 80,
      },
    ],
  })

  const getTimeRangeData = () => {
    switch (timeRange) {
      case "week":
        return performanceData.weekly
      case "month":
        return performanceData.monthly
      default:
        return performanceData.weekly
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-[#27AE60]" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-slate-600" />
    }
  }

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case "star":
        return <Star className="h-6 w-6 text-yellow-500" />
      case "target":
        return <Target className="h-6 w-6 text-[#27AE60]" />
      case "award":
        return <Award className="h-6 w-6 text-purple-500" />
      case "route":
        return <Route className="h-6 w-6 text-blue-500" />
      default:
        return <Award className="h-6 w-6 text-slate-500" />
    }
  }

  const currentData = getTimeRangeData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Performance Dashboard</h1>
            <p className="text-slate-600 text-lg">Track your driving performance and achievements</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48 h-11 bg-white border-2 border-slate-200 shadow-sm hover:border-[#27AE60] focus:border-[#27AE60] transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-slate-100 shadow-xl">
              <SelectItem value="week" className="hover:bg-slate-50 focus:bg-[#27AE60]/10 focus:text-[#27AE60]">This Week</SelectItem>
              <SelectItem value="month" className="hover:bg-slate-50 focus:bg-[#27AE60]/10 focus:text-[#27AE60]">This Month</SelectItem>
              <SelectItem value="year" className="hover:bg-slate-50 focus:bg-[#27AE60]/10 focus:text-[#27AE60]">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-slate-200 hover:ring-[#27AE60]/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Trips Completed</p>
                  <p className="text-3xl font-bold text-slate-900">{currentData.trips}</p>
                  <div className="flex items-center gap-2 text-sm">
                    {getTrendIcon(currentData.trend)}
                    <span className="font-medium text-slate-700">
                      {currentData.trend === 'up' ? '+12%' : currentData.trend === 'down' ? '-5%' : 'Steady'}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#27AE60] to-[#229954] rounded-2xl shadow-lg">
                  <Route className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-slate-200 hover:ring-[#27AE60]/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Earnings</p>
                  <p className="text-3xl font-bold text-slate-900">${currentData.earnings}</p>
                  <div className="flex items-center gap-2 text-sm">
                    {getTrendIcon(currentData.trend)}
                    <span className="font-medium text-slate-700">
                      {currentData.trend === 'up' ? '+8%' : currentData.trend === 'down' ? '-3%' : 'Steady'}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-slate-200 hover:ring-[#27AE60]/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Hours Worked</p>
                  <p className="text-3xl font-bold text-slate-900">{currentData.hours}h</p>
                  <div className="flex items-center gap-2 text-sm">
                    {getTrendIcon(currentData.trend)}
                    <span className="font-medium text-slate-700">
                      {currentData.trend === 'up' ? '+5%' : currentData.trend === 'down' ? '-2%' : 'Steady'}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-slate-200 hover:ring-[#27AE60]/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Rating</p>
                  <p className="text-3xl font-bold text-slate-900">{currentData.rating}</p>
                  <div className="flex items-center gap-2 text-sm">
                    {getTrendIcon(currentData.trend)}
                    <span className="font-medium text-slate-700">Excellent</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border-0 shadow-lg ring-1 ring-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-slate-900">Overall Performance</CardTitle>
              <CardDescription className="text-slate-600">Your lifetime statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-[#27AE60]/10 to-[#229954]/5 rounded-2xl border border-[#27AE60]/20">
                  <p className="text-3xl font-bold text-[#27AE60] mb-1">{performanceData.overall.rating}</p>
                  <p className="text-sm font-medium text-slate-700">Overall Rating</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20">
                  <p className="text-3xl font-bold text-blue-600 mb-1">{performanceData.overall.totalTrips}</p>
                  <p className="text-sm font-medium text-slate-700">Total Trips</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700">Completion Rate</span>
                    <span className="text-slate-900 font-semibold">{performanceData.overall.completionRate}%</span>
                  </div>
                  <Progress
                    value={performanceData.overall.completionRate}
                    className="h-3 bg-slate-200"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700">On-Time Rate</span>
                    <span className="text-slate-900 font-semibold">{performanceData.overall.onTimeRate}%</span>
                  </div>
                  <Progress
                    value={performanceData.overall.onTimeRate}
                    className="h-3 bg-slate-200"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700">Customer Satisfaction</span>
                    <span className="text-slate-900 font-semibold">{performanceData.overall.customerSatisfaction}/5.0</span>
                  </div>
                  <Progress
                    value={(performanceData.overall.customerSatisfaction / 5) * 100}
                    className="h-3 bg-slate-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg ring-1 ring-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-slate-900">Goals Progress</CardTitle>
              <CardDescription className="text-slate-600">Track your current goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceData.goals.map((goal) => (
                <div key={goal.id} className="space-y-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">{goal.title}</span>
                    <span className="text-sm font-medium text-slate-700 bg-white px-3 py-1 rounded-full border">
                      {goal.current}{goal.unit} / {goal.target}{goal.unit}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-3 bg-slate-200" />
                  <div className="text-sm font-medium text-slate-600">{goal.progress}% complete</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="bg-white border-0 shadow-lg ring-1 ring-slate-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900">Achievements</CardTitle>
            <CardDescription className="text-slate-600">Your earned badges and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${achievement.earned
                      ? "border-[#27AE60] bg-gradient-to-br from-[#27AE60]/5 to-[#229954]/5 shadow-lg hover:shadow-xl"
                      : "border-slate-200 bg-slate-50/50 hover:shadow-md"
                    }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-2xl ${achievement.earned ? 'bg-white shadow-sm' : 'bg-slate-100'}`}>
                      {getAchievementIcon(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-2">{achievement.title}</h4>
                      {achievement.earned ? (
                        <Badge className="bg-gradient-to-r from-[#27AE60] to-[#229954] text-white border-0 shadow-sm">
                          ✓ Earned
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-slate-300 text-slate-600 bg-white">
                          In Progress
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">{achievement.description}</p>
                  {achievement.earned ? (
                    <p className="text-xs font-medium text-[#27AE60] bg-[#27AE60]/10 px-3 py-1 rounded-full inline-block">
                      Earned on {achievement.date}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <Progress value={achievement.progress} className="h-2 bg-slate-200" />
                      <p className="text-xs font-medium text-slate-600">{achievement.progress}% complete</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="bg-white border-0 shadow-lg ring-1 ring-slate-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900">Recent Reviews</CardTitle>
            <CardDescription className="text-slate-600">Latest passenger feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-slate-50 border-slate-200">
                    <TableHead className="font-semibold text-slate-900">Passenger</TableHead>
                    <TableHead className="font-semibold text-slate-900">Rating</TableHead>
                    <TableHead className="font-semibold text-slate-900">Trip</TableHead>
                    <TableHead className="font-semibold text-slate-900">Comment</TableHead>
                    <TableHead className="font-semibold text-slate-900">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.recentReviews.map((review) => (
                    <TableRow key={review.id} className="hover:bg-slate-50/70 border-slate-100">
                      <TableCell className="font-semibold text-slate-900">{review.passenger}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-slate-900">{review.rating}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-700">{review.trip}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-slate-600 truncate font-medium">{review.comment}</p>
                      </TableCell>
                      <TableCell className="font-medium text-slate-700">{review.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}