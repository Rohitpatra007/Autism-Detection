"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Info, Download, ArrowRight, HeartPulse, ShieldAlert, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Suspense } from "react"

function ResultsContent() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem("screeningResults")
    if (stored) {
      setResults(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded mx-auto mb-4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!results || !results.predictions) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <Button asChild>
            <Link href="/screening">Go Back to Screening</Link>
          </Button>
        </div>
      </div>
    )
  }

  const predictions = results.predictions || []
  const randomForestPrediction = predictions.find((p: any) => p.modelKey === "random_forest")
  const gradientBoostingPrediction = predictions.find((p: any) => p.modelKey === "gradient_boosting")

  const getModelResult = (prediction: any) => {
    if (!prediction)
      return { label: "No Data", color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200" }

    const result = prediction.result || prediction.prediction
    if (result === 1 || result === "1" || result === true || result === "positive" || result === "YES") {
      return {
        label: "Likely Positive",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: <ShieldAlert className="h-8 w-8" />,
      }
    }
    return {
      label: "Likely Negative",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: <CheckCircle2 className="h-8 w-8" />,
    }
  }

  const rfResult = getModelResult(randomForestPrediction)
  const gbResult = getModelResult(gradientBoostingPrediction)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Your Screening Results</h1>
        <p className="text-center text-muted-foreground mb-8">Predictions from multiple AI models</p>

        <Alert className="mb-8 border-primary/20 bg-primary/5">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="font-semibold text-primary">Important Guidance</AlertTitle>
          <AlertDescription className="text-muted-foreground italic">
            This tool is for preliminary screening only and is NOT a clinical diagnosis. Results from multiple models
            are shown for reference. Please consult a healthcare professional for proper evaluation.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {randomForestPrediction && (
            <Card className={`border-2 ${rfResult.borderColor}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Random Forest Model</CardTitle>
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-6 rounded-xl ${rfResult.bgColor} flex flex-col items-center justify-center gap-3`}>
                  <div className={rfResult.color}>{rfResult.icon}</div>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${rfResult.color}`}>{rfResult.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence:{" "}
                      {randomForestPrediction.probability
                        ? `${Math.round(randomForestPrediction.probability * 100)}% `
                        : "N/A "}
                      ({randomForestPrediction.confidence})
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {gradientBoostingPrediction && (
            <Card className={`border-2 ${gbResult.borderColor}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Gradient Boosting Model</CardTitle>
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-6 rounded-xl ${gbResult.bgColor} flex flex-col items-center justify-center gap-3`}>
                  <div className={gbResult.color}>{gbResult.icon}</div>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${gbResult.color}`}>{gbResult.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence:{" "}
                      {gradientBoostingPrediction.probability
                        ? `${Math.round(gradientBoostingPrediction.probability * 100)}% `
                        : "N/A "}
                      ({gradientBoostingPrediction.confidence})
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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
                  Schedule an appointment with a pediatrician or child psychologist for a formal evaluation.
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
              <Link href="/screening">Take Screening Again</Link>
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
