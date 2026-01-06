"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export default function PatientProfilePage() {
  const { userData, login } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    age: userData?.age || "",
    phone: userData?.phone || "",
    city: userData?.city || "",
    pincode: userData?.pincode || "",
    email: userData?.email || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    login("patient", formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">My Profile</h2>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </div>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div>
              <Label>Age</Label>
              <Input name="age" type="number" value={formData.age} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input name="city" value={formData.city} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div>
              <Label>Pincode</Label>
              <Input name="pincode" value={formData.pincode} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
