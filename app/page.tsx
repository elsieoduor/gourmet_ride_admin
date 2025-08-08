"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChefHat, MapPin, Smartphone, Truck, Menu, MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-[#27AE60]" />
            <span className="text-xl sm:text-2xl font-bold text-[#2C3E50]">Gourmet Ride</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button className="bg-[#27AE60] hover:bg-[#229954]" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col gap-4 mt-8 px-2">
                  <div className="text-lg font-semibold text-[#2C3E50] mb-2">Get Started</div>
                  <Button
                    variant="outline"
                    className="w-full h-12 border-[#27AE60] text-[#27AE60] hover:bg-[#27AE60] hover:text-white"
                    asChild
                  >
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    className="bg-[#27AE60] hover:bg-[#229954] w-full h-12 font-medium"
                    asChild
                  >
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[500px] flex items-center py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4 sm:mb-6">
            Ride, Dine & Arrive in Style
          </h1>
          <p className="text-base sm:text-xl text-[#7F8C8D] mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Experience the ultimate food truck journey. Book your ride, enjoy curated cuisine onboard, and arrive at
            your destination satisfied.
          </p>
          <Button size="lg" className="bg-[#27AE60] hover:bg-[#229954] text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3" asChild>
            <Link href="/auth/signup">Book Your Ride</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="min-h-[600px] flex items-center py-12 sm:py-16 px-4 bg-[#F7F9F9]">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2C3E50] mb-8 sm:mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center">
              <CardHeader>
                <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-[#27AE60] mx-auto mb-4" />
                <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">Book & Order</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#7F8C8D] text-sm sm:text-base">
                  Reserve your spot and pre-order your favorite dishes through our mobile app
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <ChefHat className="h-10 w-10 sm:h-12 sm:w-12 text-[#2980B9] mx-auto mb-4" />
                <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">Dine Onboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#7F8C8D] text-sm sm:text-base">
                  Enjoy freshly prepared, curated cuisine while traveling to your destination
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-[#27AE60] mx-auto mb-4" />
                <CardTitle className="text-[#2C3E50] text-lg sm:text-xl">Arrive Satisfied</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#7F8C8D] text-sm sm:text-base">
                  Get dropped off at your destination having enjoyed a unique dining experience
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="min-h-[400px] flex items-center py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#27AE60] mb-2">15</div>
              <div className="text-[#7F8C8D] text-sm sm:text-base">Max Passengers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#2980B9] mb-2">7</div>
              <div className="text-[#7F8C8D] text-sm sm:text-base">Days Advance Booking</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#27AE60] mb-2">24/7</div>
              <div className="text-[#7F8C8D] text-sm sm:text-base">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#2980B9] mb-2">100%</div>
              <div className="text-[#7F8C8D] text-sm sm:text-base">Fresh Ingredients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-8 sm:py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-[#27AE60]" />
            <span className="text-xl sm:text-2xl font-bold">Gourmet Ride</span>
          </div>
          <p className="text-gray-300 mb-4 text-sm sm:text-base">The future of mobile dining experiences</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
            <span className="text-gray-300 hover:text-white cursor-pointer text-sm sm:text-base">
              Privacy Policy
            </span>
            <div className="hidden sm:block w-px h-4 bg-gray-500 mx-4"></div>
            <span className="text-gray-300 hover:text-white cursor-pointer text-sm sm:text-base">
              Terms of Service
            </span>
            <div className="hidden sm:block w-px h-4 bg-gray-500 mx-4"></div>
            <span className="text-gray-300 hover:text-white cursor-pointer text-sm sm:text-base">
              Investors
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-[#27AE60] hover:bg-[#229954] shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mr-4 mb-2" align="end">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#27AE60] flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2C3E50]">Need Help?</h3>
                  <p className="text-sm text-[#7F8C8D]">We're here to assist you</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 hover:bg-[#F7F9F9]"
                  onClick={() => setIsChatOpen(false)}
                >
                  <MessageCircle className="h-4 w-4 mr-3 text-[#27AE60]" />
                  Start Live Chat
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 hover:bg-[#F7F9F9]"
                  onClick={() => setIsChatOpen(false)}
                >
                  <Phone className="h-4 w-4 mr-3 text-[#2980B9]" />
                  Call Support
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 hover:bg-[#F7F9F9]"
                  onClick={() => setIsChatOpen(false)}
                >
                  <Mail className="h-4 w-4 mr-3 text-[#E67E22]" />
                  Email Us
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 hover:bg-[#F7F9F9]"
                  onClick={() => setIsChatOpen(false)}
                >
                  <HelpCircle className="h-4 w-4 mr-3 text-[#9B59B6]" />
                  FAQ
                </Button>
              </div>

              <Separator />

              <div className="text-center">
                <p className="text-xs text-[#7F8C8D]">
                  Available 24/7 • Response within 5 minutes
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}