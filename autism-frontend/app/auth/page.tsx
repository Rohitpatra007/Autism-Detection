"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [role, setRole] = useState<"patient">("patient")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    age: "",
    pincode: "",
    city: "",
    clinic: "",
    area: "",
    specialization: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (role) {
        login(role, formData)
        router.push("/patient")
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Auth Form */}
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle>{authMode === "login" ? "Welcome Back" : "Create Account"}</CardTitle>
            <CardDescription>
              {authMode === "login" ? "Sign in to your account" : `Register as a Patient`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Common Fields */}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Patient Registration Fields */}
              {authMode === "register" && (
                <>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+91 9975761521"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        placeholder="12"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        placeholder="411001"
                        type="text"
                        value={formData.pincode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Pune"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}

              {/* Common Auth Fields */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Loading..." : authMode === "login" ? `Login` : `Create Account`}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
            >
              {authMode === "login" ? "Create New Account" : "Sign In"}
            </Button>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By continuing, you agree to our{" "}
          <Link href="#" className="underline hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
