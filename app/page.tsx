import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, MapPin, Smartphone, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-[#27AE60]" />
            <span className="text-2xl font-bold text-[#2C3E50]">Gourmet Ride</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild className="bg-[#27AE60] hover:bg-[#229954]">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#2C3E50] mb-6">Ride, Dine & Arrive in Style</h1>
          <p className="text-xl text-[#7F8C8D] mb-8 max-w-2xl mx-auto">
            Experience the ultimate food truck journey. Book your ride, enjoy curated cuisine onboard, and arrive at
            your destination satisfied.
          </p>
          <Button size="lg" className="bg-[#27AE60] hover:bg-[#229954] text-lg px-8 py-3" asChild>
            <Link href="/auth/signup">Book Your Ride</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-[#F7F9F9]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-[#27AE60] mx-auto mb-4" />
                <CardTitle className="text-[#2C3E50]">Book & Order</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#7F8C8D]">
                  Reserve your spot and pre-order your favorite dishes through our mobile app
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <ChefHat className="h-12 w-12 text-[#2980B9] mx-auto mb-4" />
                <CardTitle className="text-[#2C3E50]">Dine Onboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#7F8C8D]">
                  Enjoy freshly prepared, curated cuisine while traveling to your destination
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-[#27AE60] mx-auto mb-4" />
                <CardTitle className="text-[#2C3E50]">Arrive Satisfied</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#7F8C8D]">
                  Get dropped off at your destination having enjoyed a unique dining experience
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#27AE60] mb-2">15</div>
              <div className="text-[#7F8C8D]">Max Passengers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#2980B9] mb-2">7</div>
              <div className="text-[#7F8C8D]">Days Advance Booking</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#27AE60] mb-2">24/7</div>
              <div className="text-[#7F8C8D]">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#2980B9] mb-2">100%</div>
              <div className="text-[#7F8C8D]">Fresh Ingredients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Truck className="h-8 w-8 text-[#27AE60]" />
            <span className="text-2xl font-bold">Gourmet Ride</span>
          </div>
          <p className="text-gray-300 mb-4">The future of mobile dining experiences</p>
          <div className="flex justify-center gap-6">
            <Link href="/privacy" className="text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
