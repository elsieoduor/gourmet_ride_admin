"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ArrowLeft, Save, X, Plus, Minus } from "lucide-react"

export default function CreateTripPage() {
  const router = useRouter()
  const [tripData, setTripData] = useState({
    route: "",
    date: undefined as Date | undefined,
    time: "",
    maxCapacity: 15,
    duration: "",
    notes: "",
  })

  const routes = [
    "City Center → Business District",
    "University Campus → Residential Area A",
    "Business District → Shopping Mall",
    "Shopping Mall → City Center",
    "Airport → City Center",
    "Residential Area A → University Campus",
  ]

  const timeSlots = ["08:00 AM", "10:30 AM", "12:30 PM", "03:00 PM", "06:00 PM", "08:30 PM"]

  const handleSubmit = async () => {
    // Validation
    if (!tripData.route || !tripData.date || !tripData.time) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newTrip = {
        id: `TRIP${Date.now().toString().slice(-3)}`,
        ...tripData,
        date: tripData.date.toISOString().split("T")[0],
        status: "scheduled",
        passengers: 0,
        earnings: 0,
        createdAt: new Date().toISOString(),
      }

      toast.success("Trip created successfully!")
      router.push("/driver/trips")
    } catch (error) {
      toast.error("Failed to create trip")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/driver/trips">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#2C3E50]">Create New Trip</h1>
            <p className="text-[#7F8C8D] mt-2">Schedule a new trip for passengers</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="bg-[#27AE60] hover:bg-[#229954]">
            <Save className="h-4 w-4 mr-2" />
            Create Trip
          </Button>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/driver/trips">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>Enter the basic trip information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Route</Label>
                <Select value={tripData.route} onValueChange={(value) => setTripData({ ...tripData, route: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route} value={route}>
                        {route}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Calendar
                  mode="single"
                  selected={tripData.date}
                  onSelect={(date) => setTripData({ ...tripData, date })}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <Select value={tripData.time} onValueChange={(value) => setTripData({ ...tripData, time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Capacity & Duration</CardTitle>
              <CardDescription>Set trip capacity and estimated duration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Maximum Capacity</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setTripData({ ...tripData, maxCapacity: Math.max(1, tripData.maxCapacity - 1) })}
                    disabled={tripData.maxCapacity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{tripData.maxCapacity}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setTripData({ ...tripData, maxCapacity: Math.min(20, tripData.maxCapacity + 1) })}
                    disabled={tripData.maxCapacity >= 20}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-[#7F8C8D]">passengers</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Estimated Duration</Label>
                <Input
                  value={tripData.duration}
                  onChange={(e) => setTripData({ ...tripData, duration: e.target.value })}
                  placeholder="e.g., 45 min"
                />
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea
                  value={tripData.notes}
                  onChange={(e) => setTripData({ ...tripData, notes: e.target.value })}
                  placeholder="Any special notes about this trip..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Trip Preview</CardTitle>
            <CardDescription>Review your trip details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#7F8C8D]">Route:</span>
                <span className="font-medium">{tripData.route || "Not selected"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7F8C8D]">Date:</span>
                <span className="font-medium">{tripData.date ? tripData.date.toDateString() : "Not selected"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7F8C8D]">Time:</span>
                <span className="font-medium">{tripData.time || "Not selected"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7F8C8D]">Capacity:</span>
                <span className="font-medium">{tripData.maxCapacity} passengers</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7F8C8D]">Duration:</span>
                <span className="font-medium">{tripData.duration || "Not specified"}</span>
              </div>
            </div>

            {tripData.notes && (
              <div className="space-y-2">
                <Label className="text-sm">Notes:</Label>
                <p className="text-sm bg-gray-50 p-2 rounded">{tripData.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
