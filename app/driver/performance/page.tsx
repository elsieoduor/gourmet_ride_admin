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
        return <BarChart3 className="h-4 w-4 text-[#7F8C8D]" />
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
        return <Award className="h-6 w-6 text-gray-500" />
    }
  }

  const currentData = getTimeRangeData()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">Performance Dashboard</h1>
          <p className="text-[#7F8C8D]">Track your driving performance and achievements</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Trips Completed</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{currentData.trips}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(currentData.trend)}
                <Route className="h-8 w-8 text-[#27AE60]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Earnings</p>
                <p className="text-2xl font-bold text-[#2C3E50]">${currentData.earnings}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(currentData.trend)}
                <DollarSign className="h-8 w-8 text-[#27AE60]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Hours Worked</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{currentData.hours}h</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(currentData.trend)}
                <Clock className="h-8 w-8 text-[#27AE60]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Rating</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{currentData.rating}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(currentData.trend)}
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
            <CardDescription>Your lifetime statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-[#27AE60] bg-opacity-10 rounded">
                <p className="text-2xl font-bold text-[#27AE60]">{performanceData.overall.rating}</p>
                <p className="text-sm text-[#7F8C8D]">Overall Rating</p>
              </div>
              <div className="text-center p-3 bg-[#27AE60] bg-opacity-10 rounded">
                <p className="text-2xl font-bold text-[#27AE60]">{performanceData.overall.totalTrips}</p>
                <p className="text-sm text-[#7F8C8D]">Total Trips</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completion Rate</span>
                  <span>{performanceData.overall.completionRate}%</span>
                </div>
                <Progress value={performanceData.overall.completionRate} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>On-Time Rate</span>
                  <span>{performanceData.overall.onTimeRate}%</span>
                </div>
                <Progress value={performanceData.overall.onTimeRate} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Customer Satisfaction</span>
                  <span>{performanceData.overall.customerSatisfaction}/5.0</span>
                </div>
                <Progress value={(performanceData.overall.customerSatisfaction / 5) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals Progress</CardTitle>
            <CardDescription>Track your current goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceData.goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.title}</span>
                  <span className="text-sm text-[#7F8C8D]">
                    {goal.current}
                    {goal.unit} / {goal.target}
                    {goal.unit}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="text-xs text-[#7F8C8D]">{goal.progress}% complete</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your earned badges and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.earned ? "border-[#27AE60] bg-[#27AE60] bg-opacity-10" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {getAchievementIcon(achievement.icon)}
                  <div className="flex-1">
                    <h4 className="font-medium text-[#2C3E50]">{achievement.title}</h4>
                    {achievement.earned ? (
                      <Badge className="bg-[#27AE60] text-white mt-1">Earned</Badge>
                    ) : (
                      <Badge variant="outline" className="mt-1">
                        In Progress
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[#7F8C8D] mb-2">{achievement.description}</p>
                {achievement.earned ? (
                  <p className="text-xs text-[#27AE60] font-medium">Earned on {achievement.date}</p>
                ) : (
                  <div className="space-y-1">
                    <Progress value={achievement.progress} className="h-1" />
                    <p className="text-xs text-[#7F8C8D]">{achievement.progress}% complete</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Latest passenger feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Trip</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.recentReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.passenger}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        {review.rating}
                      </div>
                    </TableCell>
                    <TableCell>{review.trip}</TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate">{review.comment}</p>
                    </TableCell>
                    <TableCell>{review.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
