"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, Info, Download, ArrowRight, HeartPulse, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Suspense } from "react"

function ResultsContent() {
  const searchParams = useSearchParams()
  const score = Number(searchParams.get("score") || 0)

  // Determine risk level based on a simple threshold (for demo purposes)
  let riskLevel = "Low Risk"
  let riskColor = "text-green-600 bg-green-50 border-green-200"
  let riskIcon = <CheckCircle2 className="h-12 w-12 text-green-600" />
  let description =
    "Based on the responses provided, there are fewer observed indicators commonly associated with Autism Spectrum Disorder (ASD)."

  if (score >= 7) {
    riskLevel = "Higher Likelihood Observed"
    riskColor = "text-red-600 bg-red-50 border-red-200"
    riskIcon = <ShieldAlert className="h-12 w-12 text-red-600" />
    description =
      "The screening results show several indicators that are frequently observed in individuals on the autism spectrum."
  } else if (score >= 4) {
    riskLevel = "Moderate Likelihood Observed"
    riskColor = "text-orange-600 bg-orange-50 border-orange-200"
    riskIcon = <AlertTriangle className="h-12 w-12 text-orange-600" />
    description = "The screening indicates some patterns that may warrant further professional observation."
  }

  // Confidence score simulation
  const confidence = 85 + (score % 10)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Screening Result</h1>

        <Card className={`mb-8 border-2 ${riskColor}`}>
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">{riskIcon}</div>
            <CardTitle className="text-3xl font-bold uppercase tracking-tight">{riskLevel}</CardTitle>
            <CardDescription className="text-foreground/80 font-medium">
              Confidence Score: {confidence}%
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-6">
            <p className="text-lg leading-relaxed">{description}</p>
          </CardContent>
        </Card>

        <Alert className="mb-8 border-primary/20 bg-primary/5">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="font-semibold text-primary">Important Guidance</AlertTitle>
          <AlertDescription className="text-muted-foreground italic">
            This tool is for preliminary screening only and is NOT a clinical diagnosis. Every child develops at their
            own pace.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              Recommended Next Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-2">Consult a Professional</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule an appointment with a pediatrician or a child psychologist for a formal evaluation.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors">
                <h3 className="font-semibold mb-2">Early Intervention</h3>
                <p className="text-sm text-muted-foreground">
                  Research shows that early support can significantly improve developmental outcomes.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-muted/30 p-6 rounded-2xl border border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Need more resources?</h3>
                <p className="text-sm text-muted-foreground">Explore our support services and educational material.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="gap-2 bg-background">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button asChild className="gap-2">
                  <Link href="/services">
                    Support Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <div className="text-center pt-8">
            <Button variant="link" asChild className="text-muted-foreground hover:text-primary">
              <Link href="/screening">Restart Screening</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsContent />
    </Suspense>
  )
}
