"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Bell, Shield, Globe, Moon, Sun, Lock, Eye, EyeOff, Save } from "lucide-react"

interface Settings {
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    bookingUpdates: boolean
    promotions: boolean
    systemAlerts: boolean
  }
  privacy: {
    shareLocation: boolean
    shareRideHistory: boolean
    allowDataCollection: boolean
  }
  preferences: {
    language: string
    currency: string
    theme: string
    defaultPayment: string
  }
  security: {
    twoFactorAuth: boolean
    loginAlerts: boolean
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      sms: true,
      push: true,
      bookingUpdates: true,
      promotions: false,
      systemAlerts: true,
    },
    privacy: {
      shareLocation: true,
      shareRideHistory: false,
      allowDataCollection: true,
    },
    preferences: {
      language: "en",
      currency: "KES",
      theme: "light",
      defaultPayment: "mpesa",
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
    },
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSettingChange = (category: keyof Settings, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    // Here you would typically save to your backend
    toast.success("Settings saved successfully!")
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
    // Here you would typically validate current password and update
    toast.success("Password changed successfully!")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Settings</h1>
          <p className="text-[#7F8C8D] mt-2">Manage your account preferences and security</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-[#27AE60] hover:bg-[#229954]">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-[#7F8C8D]">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "email", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-[#7F8C8D]">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "sms", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-[#7F8C8D]">Receive push notifications</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "push", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="booking-updates">Booking Updates</Label>
                  <p className="text-sm text-[#7F8C8D]">Updates about your bookings</p>
                </div>
                <Switch
                  id="booking-updates"
                  checked={settings.notifications.bookingUpdates}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "bookingUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotions">Promotions & Offers</Label>
                  <p className="text-sm text-[#7F8C8D]">Special offers and promotions</p>
                </div>
                <Switch
                  id="promotions"
                  checked={settings.notifications.promotions}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "promotions", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-alerts">System Alerts</Label>
                  <p className="text-sm text-[#7F8C8D]">Important system notifications</p>
                </div>
                <Switch
                  id="system-alerts"
                  checked={settings.notifications.systemAlerts}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "systemAlerts", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
              <Shield className="h-5 w-5" />
              Privacy
            </CardTitle>
            <CardDescription>Control your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-location">Share Location</Label>
                <p className="text-sm text-[#7F8C8D]">Allow location sharing for better service</p>
              </div>
              <Switch
                id="share-location"
                checked={settings.privacy.shareLocation}
                onCheckedChange={(checked) => handleSettingChange("privacy", "shareLocation", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-ride-history">Share Ride History</Label>
                <p className="text-sm text-[#7F8C8D]">Allow sharing ride history for recommendations</p>
              </div>
              <Switch
                id="share-ride-history"
                checked={settings.privacy.shareRideHistory}
                onCheckedChange={(checked) => handleSettingChange("privacy", "shareRideHistory", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-collection">Data Collection</Label>
                <p className="text-sm text-[#7F8C8D]">Allow data collection for service improvement</p>
              </div>
              <Switch
                id="data-collection"
                checked={settings.privacy.allowDataCollection}
                onCheckedChange={(checked) => handleSettingChange("privacy", "allowDataCollection", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
              <Globe className="h-5 w-5" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.preferences.language}
                onValueChange={(value) => handleSettingChange("preferences", "language", value)}
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

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={settings.preferences.currency}
                onValueChange={(value) => handleSettingChange("preferences", "currency", value)}
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

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.preferences.theme}
                onValueChange={(value) => handleSettingChange("preferences", "theme", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-payment">Default Payment Method</Label>
              <Select
                value={settings.preferences.defaultPayment}
                onValueChange={(value) => handleSettingChange("preferences", "defaultPayment", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-PESA</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
              <Lock className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-[#7F8C8D]">Add an extra layer of security</p>
              </div>
              <Switch
                id="two-factor"
                checked={settings.security.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange("security", "twoFactorAuth", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="login-alerts">Login Alerts</Label>
                <p className="text-sm text-[#7F8C8D]">Get notified of new logins</p>
              </div>
              <Switch
                id="login-alerts"
                checked={settings.security.loginAlerts}
                onCheckedChange={(checked) => handleSettingChange("security", "loginAlerts", checked)}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium text-[#2C3E50]">Change Password</h4>

              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
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

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
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

              <Button
                onClick={handleChangePassword}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                className="bg-[#2980B9] hover:bg-[#2471A3]"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
