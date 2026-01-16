"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, ChevronRight, ChevronLeft, HelpCircle, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"

// Define the screening questions with API-compatible IDs
const questions = [
  {
    id: "A1_Score",
    text: "Does the child look at you when you call his/her name?",
    description: "Observation of eye contact and response to auditory social stimuli.",
  },
  {
    id: "A2_Score",
    text: "How easy is it for you to get eye contact with the child?",
    description: "Assessment of non-verbal social communication.",
  },
  {
    id: "A3_Score",
    text: "Does the child point to indicate that s/he wants something?",
    description: "Assessment of proto-imperative pointing (e.g., pointing to a toy).",
  },
  {
    id: "A4_Score",
    text: "Does the child point to share interest with you?",
    description: "Assessment of proto-declarative pointing (e.g., pointing to a bird in the sky).",
  },
  {
    id: "A5_Score",
    text: "Does the child pretend? (e.g., care for a doll, talk on a toy phone)",
    description: "Assessment of imaginative and symbolic play.",
  },
  {
    id: "A6_Score",
    text: "Does the child follow where you are looking?",
    description: "Assessment of joint attention.",
  },
  {
    id: "A7_Score",
    text: "If you or someone else in the family is visibly upset, does the child show signs of wanting to comfort them?",
    description: "Assessment of early empathy and social awareness.",
  },
  {
    id: "A8_Score",
    text: "Would you describe the child's first words as being unusual?",
    description: "Assessment of early language development patterns.",
  },
  {
    id: "A9_Score",
    text: "Does the child use simple gestures? (e.g., wave goodbye)",
    description: "Assessment of non-verbal communication skills.",
  },
  {
    id: "A10_Score",
    text: "Does the child stare at nothing with no apparent purpose?",
    description: "Observation of potentially repetitive or unusual behavioral patterns.",
  },
]

interface DemographicData {
  age: string
  gender: string
  ethnicity: string
  jundice: string
  austim: string
  contry_of_res: string
  used_app_before: string
  age_desc: string
  relation: string
}

export default function ScreeningPage() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [demographicData, setDemographicData] = useState<DemographicData>({
    age: "",
    gender: "",
    ethnicity: "",
    jundice: "",
    austim: "",
    contry_of_res: "",
    used_app_before: "",
    age_desc: "",
    relation: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDemographics, setShowDemographics] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth")
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-muted rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null // This won't render because useEffect redirects to /auth
  }

  const totalSteps = questions.length + 1 // Questions + Demographics
  const progress = showDemographics 
    ? ((questions.length + 1) / totalSteps) * 100 
    : ((currentStep + 1) / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else if (currentStep === questions.length - 1) {
      // Move to demographics section
      setShowDemographics(true)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (showDemographics) {
      setShowDemographics(false)
      setCurrentStep(questions.length - 1)
      window.scrollTo(0, 0)
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleAnswer = (value: string) => {
  // Convert yes/no to 1/0 for API (not 1/-1)
  const scoreValue = value === "yes" ? 1 : 0
  setAnswers({ ...answers, [questions[currentStep].id]: scoreValue })
  }

  const handleDemographicChange = (field: keyof DemographicData, value: string) => {
    setDemographicData({ ...demographicData, [field]: value })
  }

  const isDemographicsComplete = () => {
    return Object.values(demographicData).every(value => value !== "")
  }

const handleSubmit = async () => {
  if (!isDemographicsComplete()) {
    setError("Please fill in all demographic information")
    return
  }

  setIsSubmitting(true)
  setError(null)
  
  try {
    // Prepare the request body - with detailed logging
    const requestBody = {
      ...answers,
      age: parseInt(demographicData.age),
      gender: demographicData.gender,
      ethnicity: demographicData.ethnicity,
      jundice: demographicData.jundice,
      austim: demographicData.austim,
      contry_of_res: demographicData.contry_of_res,
      used_app_before: demographicData.used_app_before,
      age_desc: demographicData.age_desc,
      relation: demographicData.relation,
    }

    console.log('=== FULL REQUEST BODY ===')
    console.log(JSON.stringify(requestBody, null, 2))

    // Use the correct model names as expected by the API
    const models = ['Random Forest', 'Gradient Boosting']
    const predictions = await Promise.allSettled(
      models.map(async (model) => {
        try {
          console.log(`\n=== Calling ${model} ===`)
          
          const response = await fetch
          (`https://autism-detection-multi-model-api.onrender.com/predict/${encodeURIComponent(model)}`,
              {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          })

          console.log(`Response status for ${model}:`, response.status)

          if (!response.ok) {
            const errorData = await response.json()
            console.error(`${model} API Error Response:`, errorData)
            throw new Error(`${model} failed: ${JSON.stringify(errorData)}`)
          }

          const data = await response.json()
          console.log(`Success for ${model}:`, data)
          return {
            model: model,
            modelKey: model.toLowerCase().replace(' ', '_'), // 'random_forest' or 'gradient_boosting'
            ...data
          }
        } catch (err: any) {
          console.error(`Error calling ${model}:`, err)
          throw err
        }
      })
    )

    // Check if at least one prediction succeeded
    const successfulPredictions = predictions
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value)

    console.log('Successful predictions:', successfulPredictions)

    if (successfulPredictions.length === 0) {
      const failedReasons = predictions
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map(result => result.reason.message)
      
      console.error('All models failed. Reasons:', failedReasons)
      throw new Error(`All prediction models failed: ${failedReasons.join(', ')}`)
    }

    // Show warning if only partial results
    if (successfulPredictions.length < models.length) {
      console.warn('Only partial predictions available')
    }

    // Store results and navigate to results page
    sessionStorage.setItem('screeningResults', JSON.stringify({
      predictions: successfulPredictions,
      answers,
      demographicData,
      timestamp: new Date().toISOString(),
      partialResults: successfulPredictions.length < models.length
    }))
    
    router.push('/results')
  } catch (error: any) {
    console.error('Error submitting screening:', error)
    
    // Provide specific error messages
    if (error.message?.includes('Failed to fetch')) {
      setError('Network error: Unable to connect to the prediction service. Please check your internet connection and try again.')
    } else if (error.message?.includes('404')) {
      setError('Model not found: The requested prediction model is not available. Please contact support.')
    } else {
      setError(error.message || 'Failed to get predictions. Please try again.')
    }
  } finally {
    setIsSubmitting(false)
  }
}

  const isCurrentQuestionAnswered = answers[questions[currentStep]?.id] !== undefined
  const isLastQuestionStep = currentStep === questions.length - 1

  // Demographics Form
  if (showDemographics) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push('/patient')}
            className="flex items-center gap-2 mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              <span>Demographic Information</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Final Step</AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground">
              Please provide demographic information to complete your screening assessment.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert className="mb-6 border-red-500/20 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-600 font-semibold">Error</AlertTitle>
              <AlertDescription className="text-xs text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Demographic Information</CardTitle>
              <CardDescription>This information helps improve prediction accuracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={demographicData.age}
                    onChange={(e) => handleDemographicChange("age", e.target.value)}
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={demographicData.gender} onValueChange={(value) => handleDemographicChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">Male</SelectItem>
                      <SelectItem value="f">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Ethnicity */}
                <div className="space-y-2">
                  <Label htmlFor="ethnicity">Ethnicity *</Label>
                  <Input
                    id="ethnicity"
                    placeholder="Enter ethnicity"
                    value={demographicData.ethnicity}
                    onChange={(e) => handleDemographicChange("ethnicity", e.target.value)}
                  />
                </div>

                {/* Jaundice */}
                <div className="space-y-2">
                  <Label htmlFor="jundice">Born with Jaundice *</Label>
                  <Select value={demographicData.jundice} onValueChange={(value) => handleDemographicChange("jundice", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Family History of Autism */}
                <div className="space-y-2">
                  <Label htmlFor="austim">Family History of Autism *</Label>
                  <Select value={demographicData.austim} onValueChange={(value) => handleDemographicChange("austim", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Country of Residence */}
                <div className="space-y-2">
                  <Label htmlFor="contry_of_res">Country of Residence *</Label>
                  <Input
                    id="contry_of_res"
                    placeholder="Enter country"
                    value={demographicData.contry_of_res}
                    onChange={(e) => handleDemographicChange("contry_of_res", e.target.value)}
                  />
                </div>

                {/* Used App Before */}
                <div className="space-y-2">
                  <Label htmlFor="used_app_before">Used Screening App Before *</Label>
                  <Select value={demographicData.used_app_before} onValueChange={(value) => handleDemographicChange("used_app_before", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Description */}
                <div className="space-y-2">
                  <Label htmlFor="age_desc">Age Group *</Label>
                  <Select value={demographicData.age_desc} onValueChange={(value) => handleDemographicChange("age_desc", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toddler">Toddler (1-3 years)</SelectItem>
                      <SelectItem value="child">Child (4-11 years)</SelectItem>
                      <SelectItem value="adolescent">Adolescent (12-17 years)</SelectItem>
                      <SelectItem value="adult">Adult (18+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Relation */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="relation">Your Relation to the Child *</Label>
                  <Select value={demographicData.relation} onValueChange={(value) => handleDemographicChange("relation", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Self">Self</SelectItem>
                      <SelectItem value="Relative">Relative</SelectItem>
                      <SelectItem value="Health care professional">Health Care Professional</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-6 mt-6">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={isSubmitting}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={!isDemographicsComplete() || isSubmitting}
                className="gap-2 min-w-[140px]"
              >
                {isSubmitting ? "Analyzing..." : "Get Results"}
                {!isSubmitting && <ChevronRight className="h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // Questions Form
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push('/patient')}
            className="flex items-center gap-2 mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              <span>
                Question {currentStep + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Important Disclaimer</AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground">
              This tool provides a preliminary screening based on behavioral patterns and is NOT a medical diagnosis.
              Results should be discussed with a qualified healthcare professional.
            </AlertDescription>
          </Alert>

          <Card className="border-border shadow-sm">
            <CardHeader className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <HelpCircle className="h-4 w-4" />
                Behavioral Screening
              </div>
              <CardTitle className="text-2xl leading-tight text-foreground">{questions[currentStep].text}</CardTitle>
              <CardDescription className="text-sm italic">{questions[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <RadioGroup 
                value={answers[questions[currentStep].id] === 1 ? "yes" : answers[questions[currentStep].id] === 0 ? "no" : ""} 
                onValueChange={handleAnswer} 
                className="space-y-3"
              >
                {["yes", "no"].map((option) => (
                  <div
                    key={option}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-accent/50 ${
                      (answers[questions[currentStep].id] === 1 && option === "yes") || 
                      (answers[questions[currentStep].id] === -1 && option === "no")
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    <RadioGroupItem value={option} id={`option-${option}`} className="h-5 w-5" />
                    <Label htmlFor={`option-${option}`} className="font-medium capitalize cursor-pointer flex-1 m-0">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-6 mt-6">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentStep === 0 || isSubmitting}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button 
                onClick={handleNext} 
                disabled={!isCurrentQuestionAnswered} 
                className="gap-2 min-w-[120px]"
              >
                {isLastQuestionStep ? "Continue to Demographics" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Quick Assessment</p>
                <p className="text-xs text-muted-foreground">
                  Takes approximately 5-8 minutes to complete the full questionnaire.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <ShieldCheck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Data Privacy</p>
                <p className="text-xs text-muted-foreground">
                  Your responses are used only for calculation and are not stored permanently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
