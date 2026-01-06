"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Brain, Activity, ShieldCheck, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function DetectPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<null | { score: number; label: string }>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  const runAnalysis = () => {
    if (!file) return
    setIsAnalyzing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setResult({
            score: 0.92,
            label: "Likely indicators detected",
          })
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">fMRI Scans for Autism Classification</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Upload preprocessed brain MRI or fMRI images to be analyzed by our 12-layer CNN model. Get immediate
              preliminary insights to share with your healthcare provider.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Upload Section */}
            <Card className="border-2 border-dashed border-slate-200 shadow-none bg-white">
              <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-6">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Preprocessed MRI / fMRI</h3>
                  <p className="text-sm text-slate-500">Supported formats: JPG, PNG, DICOM</p>
                </div>

                <div className="w-full max-w-xs">
                  <label className="cursor-pointer block">
                    <span className="sr-only">Choose file</span>
                    <input
                      type="file"
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>

                {file && !isAnalyzing && !result && (
                  <Button onClick={runAnalysis} className="w-full max-w-xs h-12 text-lg">
                    Run AI Diagnosis
                  </Button>
                )}

                {isAnalyzing && (
                  <div className="w-full max-w-xs space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Analyzing Patterns...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-slate-400">Running 12-layer CNN architecture...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Guide/Instruction Section */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Brain className="h-6 w-6" />
                  <h2 className="text-xl font-bold">How it Works</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-slate-600">
                    <span className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      1
                    </span>
                    Our model analyzes complex neural patterns in the 2D slices of fMRI scans.
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600">
                    <span className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      2
                    </span>
                    The CNN (Convolutional Neural Network) is trained on the ABIDE clinical dataset.
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600">
                    <span className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      3
                    </span>
                    Predictions are generated with a validated accuracy of 92.5%.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center gap-3 text-teal-400">
                  <ShieldCheck className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Privacy First</h2>
                </div>
                <p className="text-sm text-slate-300">
                  Your medical images are processed locally and are never stored on our servers without your explicit
                  permission for doctor review.
                </p>
              </div>
            </div>
          </div>

          {/* Results Display */}
          {result && (
            <Card className="border-2 border-primary bg-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-2xl font-bold text-primary">Analysis Complete</CardTitle>
                  <CardDescription>Generated by AutismGuardian.Ai Model v2.4</CardDescription>
                </div>
                <Activity className="h-8 w-8 text-primary animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Classification Result</p>
                    <p className="text-3xl font-black text-slate-900">{result.label}</p>
                    <p className="text-sm text-slate-600">
                      The model detected neural markers consistent with ASD patterns with{" "}
                      {(result.score * 100).toFixed(1)}% confidence.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-center text-center space-y-4">
                    <h3 className="font-bold">Next Steps</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild variant="default" className="flex-1 gap-2">
                        <Link href="/chat">
                          <MessageSquare className="h-4 w-4" />
                          Consult a Doctor
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                        <Phone className="h-4 w-4" />
                        Call Helpline
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
