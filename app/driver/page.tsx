"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MapPin,
  Clock,
  QrCode,
  AlertCircle,
  CheckCircle,
  Navigation,
  Phone,
  MessageSquare,
  Star,
  DollarSign,
  Route,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function DriverDashboard() {
  const [currentTrip, setCurrentTrip] = useState({
    id: "TRIP001",
    route: "City Center → Business District",
    departureTime: "12:30 PM",
    estimatedArrival: "1:15 PM",
    status: "ready",
    progress: 0,
    passengers: [
      {
        id: "P001",
        name: "John Doe",
        pickup: "City Center",
        phone: "+1234567890",
        qrCode: "QR123456",
        foodItems: ["Gourmet Burger", "Truffle Fries"],
        status: "waiting",
      },
      {
        id: "P002",
        name: "Jane Smith",
        pickup: "City Center",
        phone: "+1234567891",
        qrCode: "QR789012",
        foodItems: ["Chicken Wrap"],
        status: "boarded",
      },
      {
        id: "P003",
        name: "Mike Johnson",
        pickup: "Shopping Mall",
        phone: "+1234567892",
        qrCode: "QR345678",
        foodItems: ["Caesar Salad", "Fresh Juice"],
        status: "waiting",
      },
    ],
  })

  const [upcomingTrips] = useState([
    {
      id: "TRIP002",
      route: "University Campus → Residential Area A",
      departureTime: "06:00 PM",
      passengerCount: 8,
      estimatedDuration: "45 min",
    },
    {
      id: "TRIP003",
      route: "Business District → Shopping Mall",
      departureTime: "08:30 PM",
      passengerCount: 12,
      estimatedDuration: "30 min",
    },
  ])

  const [tripStatus, setTripStatus] = useState("ready")
  const [dailyStats] = useState({
    tripsCompleted: 3,
    totalEarnings: 245.5,
    totalPassengers: 28,
    rating: 4.8,
    hoursWorked: 6.5,
  })

  const handleStartTrip = () => {
    setTripStatus("departed")
    setCurrentTrip((prev) => ({ ...prev, progress: 25 }))
    toast.success("Trip started! Safe driving!")
  }

  const handleArriveDestination = () => {
    setTripStatus("arrived")
    setCurrentTrip((prev) => ({ ...prev, progress: 100 }))
    toast.success("Trip completed successfully!")
  }

  const handlePassengerAction = (passengerId: string, action: string) => {
    setCurrentTrip((prev) => ({
      ...prev,
      passengers: prev.passengers.map((p) =>
        p.id === passengerId ? { ...p, status: action === "board" ? "boarded" : "waiting" } : p,
      ),
    }))
    toast.success(`Passenger ${action === "board" ? "boarded" : "marked as waiting"}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-blue-500"
      case "departed":
        return "bg-[#27AE60]"
      case "arrived":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPassengerStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-500"
      case "boarded":
        return "bg-[#27AE60]"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Trips Today</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{dailyStats.tripsCompleted}</p>
              </div>
              <Route className="h-8 w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Earnings</p>
                <p className="text-2xl font-bold text-[#2C3E50]">${dailyStats.totalEarnings}</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Passengers</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{dailyStats.totalPassengers}</p>
              </div>
              <Users className="h-8 w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Rating</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{dailyStats.rating}</p>
              </div>
              <Star className="h-8 w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7F8C8D]">Hours</p>
                <p className="text-2xl font-bold text-[#2C3E50]">{dailyStats.hoursWorked}h</p>
              </div>
              <Clock className="h-8 w-8 text-[#27AE60]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Trip */}
      <Card className="border-l-4 border-l-[#27AE60]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#2C3E50]">{currentTrip.route}</CardTitle>
              <CardDescription className="text-[#7F8C8D]">
                Departure: {currentTrip.departureTime} • ETA: {currentTrip.estimatedArrival} •{" "}
                {currentTrip.passengers.length} passengers
              </CardDescription>
            </div>
            <Badge className={getStatusColor(tripStatus)}>{tripStatus.toUpperCase()}</Badge>
          </div>
          {tripStatus === "departed" && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-[#7F8C8D] mb-2">
                <span>Trip Progress</span>
                <span>{currentTrip.progress}%</span>
              </div>
              <Progress value={currentTrip.progress} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Trip Controls */}
            <div className="flex flex-wrap gap-2">
              {tripStatus === "ready" && (
                <Button onClick={handleStartTrip} className="bg-[#27AE60] hover:bg-[#229954]">
                  <Navigation className="h-4 w-4 mr-2" />
                  Start Trip
                </Button>
              )}
              {tripStatus === "departed" && (
                <Button onClick={handleArriveDestination} className="bg-[#2980B9] hover:bg-[#2471A3]">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Arrived
                </Button>
              )}
              <Button variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />
                Send Delay Alert
              </Button>
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                View Route
              </Button>
            </div>

            {/* Passenger List */}
            <div>
              <h4 className="font-medium text-[#2C3E50] mb-3">
                Passengers ({currentTrip.passengers.filter((p) => p.status === "boarded").length}/
                {currentTrip.passengers.length})
              </h4>
              <div className="space-y-3">
                {currentTrip.passengers.map((passenger) => (
                  <div key={passenger.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-[#27AE60] text-white">
                          {passenger.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#2C3E50]">{passenger.name}</p>
                        <div className="flex items-center gap-1 text-sm text-[#7F8C8D]">
                          <MapPin className="h-3 w-3" />
                          {passenger.pickup}
                        </div>
                        <p className="text-xs text-[#7F8C8D]">Food: {passenger.foodItems.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPassengerStatusColor(passenger.status)}>{passenger.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Passenger QR Code</DialogTitle>
                            <DialogDescription>Scan this code to verify passenger boarding</DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col items-center py-6">
                            <QrCode className="h-32 w-32 text-[#2C3E50] mb-4" />
                            <p className="text-lg font-mono">{passenger.qrCode}</p>
                            <p className="text-sm text-[#7F8C8D] mt-2">{passenger.name}</p>
                            <div className="flex gap-2 mt-4">
                              <Button
                                onClick={() => handlePassengerAction(passenger.id, "board")}
                                className="bg-[#27AE60] hover:bg-[#229954]"
                              >
                                Mark as Boarded
                              </Button>
                              <Button variant="outline" onClick={() => handlePassengerAction(passenger.id, "waiting")}>
                                Mark as Waiting
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Trips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#2C3E50]">Upcoming Trips</CardTitle>
          <CardDescription>Your scheduled trips for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-[#2C3E50]">{trip.route}</h4>
                  <div className="flex items-center gap-4 text-sm text-[#7F8C8D] mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {trip.departureTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {trip.passengerCount} passengers
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      {trip.estimatedDuration}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Scheduled</Badge>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
