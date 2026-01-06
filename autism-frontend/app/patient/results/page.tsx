"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/patient" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">Screening Results</h1>
          <p className="text-muted-foreground">Analysis completed on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          {/* Risk Level Badge */}
          <Card className="border-2 border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-accent" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 border-4 border-accent">
                    <span className="text-4xl font-bold text-accent">65%</span>
                  </div>
                  <p className="text-lg font-semibold mt-4">Moderate Likelihood</p>
                  <p className="text-sm text-muted-foreground">of ASD traits detected</p>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold">Analysis Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Neural Pattern Detection</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "65%" }} />
                  </div>

                  <div className="flex justify-between mt-4">
                    <span className="text-muted-foreground">Behavioral Indicators</span>
                    <span className="font-medium">58%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "58%" }} />
                  </div>

                  <div className="flex justify-between mt-4">
                    <span className="text-muted-foreground">Confidence Score</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                What This Means
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                The AI model detected certain neural patterns that may correlate with Autism Spectrum Disorder (ASD).
                Based on the fMRI scan analysis, the system suggests a moderate likelihood of autism-related traits.
              </p>
              <p className="text-sm text-muted-foreground">
                This result is intended for screening support only and should not be considered a medical diagnosis.
                Please consult with a qualified healthcare professional for accurate diagnosis and treatment
                recommendations.
              </p>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>Consult with an autism specialist or neurologist for professional evaluation</li>
                <li>Share these results with your healthcare provider</li>
                <li>Discuss potential interventions and support strategies</li>
                <li>Schedule follow-up assessments as recommended by your doctor</li>
              </ol>
            </CardContent>
          </Card>

          {/* CTA */}
          <Button asChild size="lg" className="w-full">
            <Link href="/patient/consult">Consult a Doctor Now</Link>
          </Button>

          <div className="flex gap-4">
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/patient/detect">New Screening</Link>
            </Button>
            <Button asChild variant="ghost" className="flex-1">
              <Link href="/patient">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
