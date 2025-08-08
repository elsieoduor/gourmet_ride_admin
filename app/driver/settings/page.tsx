"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { User, Bell, Shield, Car, Camera, Save, Eye, EyeOff, Trash2, Edit, X } from "lucide-react"

interface DriverProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
  avatar: string
  driverId: string
  licenseNumber: string
  licenseExpiry: string
  emergencyContact: string
  emergencyName: string
  experience: string
  rating: number
  totalTrips: number
}

interface Vehicle {
  make: string
  model: string
  year: string
  color: string
  plateNumber: string
  capacity: number
  features: string[]
}

interface NotificationSettings {
  tripAssignments: boolean
  paymentUpdates: boolean
  customerReviews: boolean
  scheduleChanges: boolean
  systemUpdates: boolean
  promotions: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
}

interface Preferences {
  language: string
  timezone: string
  currency: string
  distanceUnit: string
  autoAcceptTrips: boolean
  maxTripsPerDay: number
  preferredWorkingHours: {
    start: string
    end: string
  }
}

export default function DriverSettings() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profile, setProfile] = useState<DriverProfile>({
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@email.com",
    phone: "+254 700 123 456",
    bio: "Experienced driver with 5+ years in transportation services. Committed to providing safe and comfortable rides.",
    avatar: "",
    driverId: "DRV001",
    licenseNumber: "DL123456789",
    licenseExpiry: "2025-12-31",
    emergencyContact: "+254 700 654 321",
    emergencyName: "Sarah Johnson",
    experience: "5 years",
    rating: 4.8,
    totalTrips: 156,
  })

  const [vehicle, setVehicle] = useState<Vehicle>({
    make: "Toyota",
    model: "Hiace",
    year: "2022",
    color: "White",
    plateNumber: "KCA 123A",
    capacity: 15,
    features: ["Air Conditioning", "WiFi", "USB Charging", "Sound System", "GPS Navigation"],
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    tripAssignments: true,
    paymentUpdates: true,
    customerReviews: true,
    scheduleChanges: true,
    systemUpdates: false,
    promotions: false,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
  })

  const [preferences, setPreferences] = useState<Preferences>({
    language: "en",
    timezone: "Africa/Nairobi",
    currency: "KES",
    distanceUnit: "kilometers",
    autoAcceptTrips: false,
    maxTripsPerDay: 8,
    preferredWorkingHours: {
      start: "08:00",
      end: "18:00",
    },
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [editingProfile, setEditingProfile] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(false)

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully")
    setEditingProfile(false)
  }

  const handleSaveVehicle = () => {
    toast.success("Vehicle information updated successfully")
    setEditingVehicle(false)
  }

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated successfully")
  }

  const handleSavePreferences = () => {
    toast.success("Preferences updated successfully")
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match!")
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!")
      return
    }
    toast.success("Password changed successfully!")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }
  const [isAddingFeature, setIsAddingFeature] = useState(false)
  const [newFeatureInput, setNewFeatureInput] = useState("")

  const handleSaveNewFeature = () => {
    if (newFeatureInput.trim() && !vehicle.features.includes(newFeatureInput.trim())) {
      setVehicle({ ...vehicle, features: [...vehicle.features, newFeatureInput.trim()] })
    }
    setNewFeatureInput("")
    setIsAddingFeature(false)
  }

  const handleCancelNewFeature = () => {
    setNewFeatureInput("")
    setIsAddingFeature(false)
  }
  const handleAddVehicleFeature = () => {
    const newFeature = prompt("Enter new vehicle feature:")
    if (newFeature && !vehicle.features.includes(newFeature)) {
      setVehicle({ ...vehicle, features: [...vehicle.features, newFeature] })
    }
  }

  const handleRemoveVehicleFeature = (feature: string) => {
    setVehicle({ ...vehicle, features: vehicle.features.filter((f) => f !== feature) })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setProfile({ ...profile, avatar: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#2C3E50]">Driver Settings</h1>
        <p className="text-[#7F8C8D] mt-2">Manage your profile, vehicle, and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="bg-transparent"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingProfile ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      disabled={!editingProfile}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      disabled={!editingProfile}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!editingProfile}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={profile.emergencyName}
                      onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                      disabled={!editingProfile}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyContact"
                      value={profile.emergencyContact}
                      onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                      disabled={!editingProfile}
                    />
                  </div>
                </div>

                {editingProfile && (
                  <Button onClick={handleSaveProfile} className="bg-[#27AE60] hover:bg-[#229954]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Picture & Stats</CardTitle>
                <CardDescription>Update your profile photo and view stats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#27AE60] text-white text-xl">
                      {profile.firstName[0]}
                      {profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {editingProfile && (
                    <label className="cursor-pointer">
                      <Button variant="outline" className="bg-transparent">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Driver ID</Label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">{profile.driverId}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>License Number</Label>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">{profile.licenseNumber}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>License Expiry</Label>
                    <p className="text-sm bg-gray-100 p-2 rounded">{profile.licenseExpiry}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Performance Stats</Label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Total Trips:</span>
                        <span className="font-medium">{profile.totalTrips}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Rating:</span>
                        <span className="font-medium">{profile.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vehicle Tab */}
        <TabsContent value="vehicle">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Vehicle Information
                  </CardTitle>
                  <CardDescription>Manage your vehicle details and features</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setEditingVehicle(!editingVehicle)} className="bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  {editingVehicle ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={vehicle.make}
                    onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                    disabled={!editingVehicle}
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={vehicle.model}
                    onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                    disabled={!editingVehicle}
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={vehicle.year}
                    onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                    disabled={!editingVehicle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={vehicle.color}
                    onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
                    disabled={!editingVehicle}
                  />
                </div>
                <div>
                  <Label htmlFor="plateNumber">Plate Number</Label>
                  <Input
                    id="plateNumber"
                    value={vehicle.plateNumber}
                    onChange={(e) => setVehicle({ ...vehicle, plateNumber: e.target.value })}
                    disabled={!editingVehicle}
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Passenger Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={vehicle.capacity}
                    onChange={(e) => setVehicle({ ...vehicle, capacity: Number.parseInt(e.target.value) })}
                    disabled={!editingVehicle}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Vehicle Features</Label>
                  {editingVehicle && (
                    <Button variant="outline" size="sm" onClick={() => setIsAddingFeature(true)} className="bg-transparent">
                      Add Feature
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{feature}</span>
                      {editingVehicle && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveVehicleFeature(feature)}
                          className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {editingVehicle && (
                <Button onClick={handleSaveVehicle} className="bg-[#27AE60] hover:bg-[#229954]">
                  <Save className="h-4 w-4 mr-2" />
                  Save Vehicle Info
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Add Feature Modal */}
          {isAddingFeature && (
            <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Add Vehicle Feature</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelNewFeature}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="newFeature">Feature Name</Label>
                    <Input
                      id="newFeature"
                      placeholder="Enter vehicle feature..."
                      value={newFeatureInput}
                      onChange={(e) => setNewFeatureInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveNewFeature()
                        }
                        if (e.key === 'Escape') {
                          handleCancelNewFeature()
                        }
                      }}
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={handleCancelNewFeature}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveNewFeature}
                      disabled={!newFeatureInput.trim()}
                      className="bg-[#27AE60] hover:bg-[#229954]"
                    >
                      Add Feature
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Notification Types</h4>
                <div className="space-y-4">
                  {Object.entries(notifications)
                    .slice(0, 6)
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                          <p className="text-sm text-[#7F8C8D]">
                            {key === "tripAssignments" && "Get notified when new trips are assigned to you"}
                            {key === "paymentUpdates" && "Receive updates about your earnings and payments"}
                            {key === "customerReviews" && "Be notified when customers leave reviews"}
                            {key === "scheduleChanges" && "Get alerts about schedule modifications"}
                            {key === "systemUpdates" && "Receive system maintenance and update notifications"}
                            {key === "promotions" && "Get notified about special offers and promotions"}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  {Object.entries(notifications)
                    .slice(6)
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Preferences</CardTitle>
                <CardDescription>Configure your app preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sw">Swahili</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                      <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="distanceUnit">Distance Unit</Label>
                  <Select
                    value={preferences.distanceUnit}
                    onValueChange={(value) => setPreferences({ ...preferences, distanceUnit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kilometers">Kilometers</SelectItem>
                      <SelectItem value="miles">Miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Preferences</CardTitle>
                <CardDescription>Configure your working preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Accept Trips</Label>
                    <p className="text-sm text-[#7F8C8D]">Automatically accept trip assignments</p>
                  </div>
                  <Switch
                    checked={preferences.autoAcceptTrips}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, autoAcceptTrips: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="maxTrips">Maximum Trips Per Day</Label>
                  <Input
                    id="maxTrips"
                    type="number"
                    value={preferences.maxTripsPerDay}
                    onChange={(e) =>
                      setPreferences({ ...preferences, maxTripsPerDay: Number.parseInt(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label>Preferred Working Hours</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="startTime" className="text-sm">
                        Start Time
                      </Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={preferences.preferredWorkingHours.start}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            preferredWorkingHours: { ...preferences.preferredWorkingHours, start: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime" className="text-sm">
                        End Time
                      </Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={preferences.preferredWorkingHours.end}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            preferredWorkingHours: { ...preferences.preferredWorkingHours, end: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Change your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button onClick={handleChangePassword} className="bg-[#E74C3C] hover:bg-[#C0392B]">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 flex justify-end">
              <Button onClick={handleSavePreferences} className="bg-[#27AE60] hover:bg-[#229954]">
                <Save className="h-4 w-4 mr-2" />
                Save All Preferences
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
