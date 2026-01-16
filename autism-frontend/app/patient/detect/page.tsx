"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle2, X } from "lucide-react"
import { useState } from "react"

export default function DetectAutismPage() {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleAnalyze = () => {
    if (files.length > 0) {
      // Simulate analysis
      setTimeout(() => {
        window.location.href = "/patient/results"
      }, 2000)
    }
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">fMRI Scans for Autism Classification</h1>
        <p className="text-muted-foreground text-lg mb-2">
          Upload preprocessed brain MRI or fMRI images to be analyzed by our 12-layer CNN model.
        </p>
        <p className="text-muted-foreground">
          Get immediate preliminary insights to share with your healthcare provider.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <Card className="border-2 border-dashed border-border">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Upload className="w-12 h-12 text-primary" />
              </div>

              <h2 className="text-xl font-bold text-foreground mb-2">Preprocessed MRI / fMRI</h2>
              <p className="text-sm text-muted-foreground mb-6">Supported formats: JPG, PNG, DICOM</p>

              <label className="w-full">
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".jpg,.jpeg,.png,.dcm" 
                  onChange={handleFileChange}
                  multiple
                />
                <span className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:opacity-90 transition-opacity font-medium">
                  Choose Files
                </span>
              </label>

              {files.length > 0 && (
                <div className="mt-6 w-full space-y-2">
                  <p className="text-xs font-semibold text-foreground mb-3">
                    {files.length} file{files.length !== 1 ? 's' : ''} selected
                  </p>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {files.map((file, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between gap-2 p-2 bg-muted rounded text-left"
                      >
                        <span className="text-xs text-foreground truncate flex-1">
                          {file.name}
                        </span>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                          aria-label="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {files.length === 0 && (
                <p className="text-xs text-muted-foreground mt-6">No files chosen</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How it Works & Privacy Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* How it Works */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  🧠
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-4">How it Works</h3>
                </div>
              </div>

              <div className="space-y-4 ml-12">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our model analyzes complex neural patterns in the 2D slices of fMRI scans.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The CNN (Convolutional Neural Network) is trained on the ABIDE clinical dataset.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Predictions are generated with a validated accuracy of 92.5%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy First */}
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white mb-2">Privacy First</h3>
                  <p className="text-sm text-slate-300">
                    Your medical images are processed locally and are never stored on our servers without your explicit
                    permission for doctor review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button onClick={handleAnalyze} disabled={files.length === 0} size="lg" className="w-full bg-primary hover:bg-primary/90">
        Analyze {files.length > 0 ? `${files.length} Scan${files.length !== 1 ? 's' : ''}` : 'Scan'}
      </Button>
    </div>
  )
}
