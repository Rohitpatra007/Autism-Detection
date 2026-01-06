"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Users } from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back, John!</h2>
        <p className="text-muted-foreground">Here's your autism screening dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Completed screenings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Latest Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">Moderate</div>
            <p className="text-xs text-muted-foreground mt-1">Risk level - 2 weeks ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Doctor Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled upcoming</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scan Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scan Summary</CardTitle>
          <CardDescription>Your latest fMRI analysis results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Risk Assessment</span>
              <span className="text-sm font-bold text-accent">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              The AI model detected certain neural patterns that may correlate with ASD. This result is intended for
              screening support only and should be discussed with a medical professional.
            </p>
          </div>

          <Button asChild className="w-full">
            <Link href="/patient/consult">Consult a Doctor</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Start New Screening
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Upload a new fMRI scan for analysis</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/patient/detect">Begin Screening</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Find a Specialist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Connect with autism specialists in your area</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/patient/consult">Browse Doctors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
