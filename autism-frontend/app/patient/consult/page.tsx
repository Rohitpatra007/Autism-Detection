"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, MessageCircle, Search } from "lucide-react"
import Link from "next/link"
import { Suspense, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    specialization: "Autism Spectrum Disorder",
    clinic: "Rainbow Care Clinic",
    address: "Baner, Pune 411001",
    whatsapp: "+91 9975761521",
    whatsappConsent: true,
    experience: "15 years",
    qualifications: "MBBS, MD (Psychiatry)",
    about:
      "Specialized in autism spectrum disorder diagnosis and therapy. Passionate about helping children with developmental concerns.",
  },
  {
    id: 2,
    name: "Dr. Priya Kapoor",
    specialization: "Pediatric Neurologist",
    clinic: "Child Development Center",
    address: "Kalyani Nagar, Pune 411006",
    whatsapp: "+91 8765432109",
    whatsappConsent: true,
    experience: "12 years",
    qualifications: "MBBS, MD (Pediatrics)",
    about: "Expert in pediatric neurology with focus on developmental disorders and neurological assessments.",
  },
  {
    id: 3,
    name: "Dr. Amitabh Singh",
    specialization: "Neurologist",
    clinic: "Neural Care Hospital",
    address: "Shivajinagar, Pune 411004",
    whatsapp: "+91 7654321098",
    whatsappConsent: false,
    experience: "20 years",
    qualifications: "MBBS, MD (Neurology)",
    about: "Renowned neurologist with expertise in complex neurological conditions and behavioral assessments.",
  },
]

function DoctorList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("all")
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const filteredDoctors = mockDoctors.filter(
    (doctor) =>
      (filterSpecialization === "all" || doctor.specialization.toLowerCase().includes(filterSpecialization)) &&
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.clinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.address.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by doctor name, clinic, or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {["all", "Autism Spectrum Disorder", "Pediatric", "Neurologist"].map((spec) => (
              <Badge
                key={spec}
                variant={filterSpecialization === spec ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterSpecialization(spec === "all" ? "all" : spec.toLowerCase())}
              >
                {spec === "all" ? "All Specializations" : spec}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doctor Cards */}
      <div className="grid gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>{doctor.name}</CardTitle>
                    <CardDescription className="mt-1">
                      <Badge variant="secondary" className="mt-2">
                        {doctor.specialization}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{doctor.clinic}</p>
                      <p className="text-sm text-muted-foreground">{doctor.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{doctor.whatsapp}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex gap-3">
                  {doctor.whatsappConsent && (
                    <Button className="flex-1" asChild>
                      <a
                        href={`https://wa.me/${doctor.whatsapp.replace(
                          /\D/g,
                          "",
                        )}?text=Hi, I would like to consult about autism screening`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href={`/patient/chat/${doctor.id}`}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSelectedDoctor(doctor)}>
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No doctors found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedDoctor?.name}</DialogTitle>
            <DialogDescription>{selectedDoctor?.specialization}</DialogDescription>
          </DialogHeader>
          {selectedDoctor && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">About</p>
                <p className="text-sm mt-1">{selectedDoctor.about}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="text-sm font-semibold mt-1">{selectedDoctor.experience}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Qualifications</p>
                <p className="text-sm font-semibold mt-1">{selectedDoctor.qualifications}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clinic</p>
                <p className="text-sm font-semibold mt-1">{selectedDoctor.clinic}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-sm font-semibold mt-1">{selectedDoctor.address}</p>
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                {selectedDoctor.whatsappConsent && (
                  <Button className="w-full" asChild>
                    <a
                      href={`https://wa.me/${selectedDoctor.whatsapp.replace(
                        /\D/g,
                        "",
                      )}?text=Hi, I would like to consult about autism screening`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact via WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function ConsultDoctorPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/patient" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">Find a Doctor</h1>
          <p className="text-muted-foreground">Connect with autism specialists in your area</p>
        </div>

        <Suspense fallback={<div>Loading doctors...</div>}>
          <DoctorList />
        </Suspense>
      </div>
    </div>
  )
}
