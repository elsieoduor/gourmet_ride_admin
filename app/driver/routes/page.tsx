"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Clock, Users, DollarSign, Navigation, Search, Filter, Eye, Star } from "lucide-react"

type Route = {
  id: string
  name: string
  pickup: string
  dropoff: string
  distance: string
  duration: string
  pricePerPerson: number
  maxCapacity: number
  difficulty: "easy" | "moderate" | "hard"
  rating: number
  totalTrips: number
  description: string
  landmarks: string[]
  trafficPatterns: Record<string, string>
  estimatedEarnings: {
    perTrip: number
    perDay: number
  }
}

export default function DriverRoutes() {
  const [routes, setRoutes] = useState([
    {
      id: "R001",
      name: "City Center Express",
      pickup: "City Center Station",
      dropoff: "Business District Hub",
      distance: "8.5 km",
      duration: "25-30 min",
      pricePerPerson: 15.0,
      maxCapacity: 15,
      difficulty: "easy",
      rating: 4.8,
      totalTrips: 156,
      description: "Popular route connecting downtown to business district with minimal traffic",
      landmarks: ["Central Park", "City Hall", "Financial Tower"],
      trafficPatterns: {
        morning: "Heavy",
        afternoon: "Moderate",
        evening: "Heavy",
        night: "Light",
      },
      estimatedEarnings: {
        perTrip: 225.0,
        perDay: 675.0,
      },
    },
    {
      id: "R002",
      name: "University Campus Loop",
      pickup: "University Main Gate",
      dropoff: "Student Housing Complex",
      distance: "12.3 km",
      duration: "35-40 min",
      pricePerPerson: 18.0,
      maxCapacity: 15,
      difficulty: "moderate",
      rating: 4.6,
      totalTrips: 89,
      description: "Scenic route through campus area with multiple student pickup points",
      landmarks: ["University Library", "Sports Complex", "Student Center"],
      trafficPatterns: {
        morning: "Moderate",
        afternoon: "Heavy",
        evening: "Moderate",
        night: "Light",
      },
      estimatedEarnings: {
        perTrip: 270.0,
        perDay: 540.0,
      },
    },
    {
      id: "R003",
      name: "Shopping District Tour",
      pickup: "Mall Entrance",
      dropoff: "Entertainment Complex",
      distance: "15.7 km",
      duration: "45-50 min",
      pricePerPerson: 22.0,
      maxCapacity: 15,
      difficulty: "hard",
      rating: 4.9,
      totalTrips: 234,
      description: "Premium route with shopping and entertainment stops, higher earnings",
      landmarks: ["Grand Mall", "Theater District", "Luxury Hotels"],
      trafficPatterns: {
        morning: "Light",
        afternoon: "Heavy",
        evening: "Very Heavy",
        night: "Moderate",
      },
      estimatedEarnings: {
        perTrip: 330.0,
        perDay: 990.0,
      },
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.dropoff.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || route.difficulty === difficultyFilter

    return matchesSearch && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-[#27AE60]"
      case "moderate":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTrafficColor = (level: string) => {
    switch (level) {
      case "Light":
        return "text-[#27AE60]"
      case "Moderate":
        return "text-yellow-500"
      case "Heavy":
        return "text-orange-500"
      case "Very Heavy":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const handleViewRoute = (route: any) => {
    setSelectedRoute(route)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">Available Routes</h1>
          <p className="text-[#7F8C8D]">Explore and learn about your available driving routes</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search Routes</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7F8C8D]" />
                <Input
                  id="search"
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setDifficultyFilter("all")
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRoutes.map((route) => (
          <Card key={route.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-[#2C3E50]">{route.name}</CardTitle>
                  <CardDescription className="text-[#7F8C8D]">{route.description}</CardDescription>
                </div>
                <Badge className={getDifficultyColor(route.difficulty)}>{route.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Route Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-[#27AE60]" />
                  <span className="font-medium">From:</span> {route.pickup}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="h-4 w-4 text-[#27AE60]" />
                  <span className="font-medium">To:</span> {route.dropoff}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-[#7F8C8D]" />
                  <span>
                    {route.duration} • {route.distance}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="h-4 w-4 text-[#27AE60]" />
                    <span className="font-bold text-[#2C3E50]">${route.pricePerPerson}</span>
                  </div>
                  <p className="text-xs text-[#7F8C8D]">per person</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4 text-[#27AE60]" />
                    <span className="font-bold text-[#2C3E50]">{route.maxCapacity}</span>
                  </div>
                  <p className="text-xs text-[#7F8C8D]">max capacity</p>
                </div>
              </div>

              {/* Rating and Earnings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{route.rating}</span>
                  <span className="text-sm text-[#7F8C8D]">({route.totalTrips} trips)</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#27AE60]">${route.estimatedEarnings.perTrip}</p>
                  <p className="text-xs text-[#7F8C8D]">per trip</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => handleViewRoute(route)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button className="flex-1 bg-[#27AE60] hover:bg-[#229954]">
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Navigation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Route Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Route Details</DialogTitle>
            <DialogDescription>Complete information about this route</DialogDescription>
          </DialogHeader>
          {selectedRoute && (
            <div className="space-y-6">
              {/* Route Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">{selectedRoute.name}</h3>
                    <p className="text-[#7F8C8D]">{selectedRoute.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#27AE60]" />
                      <span className="font-medium">Pickup:</span> {selectedRoute.pickup}
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-[#27AE60]" />
                      <span className="font-medium">Dropoff:</span> {selectedRoute.dropoff}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#7F8C8D]" />
                      <span className="font-medium">Duration:</span> {selectedRoute.duration}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className={getDifficultyColor(selectedRoute.difficulty)}>
                      {selectedRoute.difficulty} difficulty
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{selectedRoute.rating}</span>
                      <span className="text-[#7F8C8D]">({selectedRoute.totalTrips} trips)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-2">Earnings Potential</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-[#27AE60] bg-opacity-10 rounded">
                        <p className="text-2xl font-bold text-[#27AE60]">${selectedRoute.estimatedEarnings.perTrip}</p>
                        <p className="text-sm text-[#7F8C8D]">Per Trip</p>
                      </div>
                      <div className="text-center p-3 bg-[#27AE60] bg-opacity-10 rounded">
                        <p className="text-2xl font-bold text-[#27AE60]">${selectedRoute.estimatedEarnings.perDay}</p>
                        <p className="text-sm text-[#7F8C8D]">Per Day</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#2C3E50] mb-2">Route Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-xl font-bold text-[#2C3E50]">${selectedRoute.pricePerPerson}</p>
                        <p className="text-sm text-[#7F8C8D]">Price per Person</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-xl font-bold text-[#2C3E50]">{selectedRoute.maxCapacity}</p>
                        <p className="text-sm text-[#7F8C8D]">Max Capacity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traffic Patterns */}
              <div>
                <h4 className="font-semibold text-[#2C3E50] mb-3">Traffic Patterns</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedRoute.trafficPatterns).map(([time, level]) => (
                    <div key={time} className="text-center p-3 bg-gray-50 rounded">
                      <p className="font-medium capitalize">{time}</p>
                      <p className={`font-bold ${getTrafficColor(level)}`}>{level}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landmarks */}
              <div>
                <h4 className="font-semibold text-[#2C3E50] mb-3">Key Landmarks</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRoute.landmarks.map((landmark, index) => (
                    <Badge key={index} variant="outline" className="text-[#2C3E50]">
                      <MapPin className="h-3 w-3 mr-1" />
                      {landmark}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t">
                <Button className="flex-1 bg-[#27AE60] hover:bg-[#229954]">
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Navigation
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
