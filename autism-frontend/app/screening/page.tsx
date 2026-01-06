"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"

// Define the screening questions (based on standard ASD screening tools like Q-CHAT or M-CHAT)
const questions = [
  {
    id: "q1",
    text: "Does the child look at you when you call his/her name?",
    description: "Observation of eye contact and response to auditory social stimuli.",
  },
  {
    id: "q2",
    text: "How easy is it for you to get eye contact with the child?",
    description: "Assessment of non-verbal social communication.",
  },
  {
    id: "q3",
    text: "Does the child point to indicate that s/he wants something?",
    description: "Assessment of proto-imperative pointing (e.g., pointing to a toy).",
  },
  {
    id: "q4",
    text: "Does the child point to share interest with you?",
    description: "Assessment of proto-declarative pointing (e.g., pointing to a bird in the sky).",
  },
  {
    id: "q5",
    text: "Does the child pretend? (e.g., care for a doll, talk on a toy phone)",
    description: "Assessment of imaginative and symbolic play.",
  },
  {
    id: "q6",
    text: "Does the child follow where you are looking?",
    description: "Assessment of joint attention.",
  },
  {
    id: "q7",
    text: "If you or someone else in the family is visibly upset, does the child show signs of wanting to comfort them?",
    description: "Assessment of early empathy and social awareness.",
  },
  {
    id: "q8",
    text: "Would you describe the child's first words as being unusual?",
    description: "Assessment of early language development patterns.",
  },
  {
    id: "q9",
    text: "Does the child use simple gestures? (e.g., wave goodbye)",
    description: "Assessment of non-verbal communication skills.",
  },
  {
    id: "q10",
    text: "Does the child stare at nothing with no apparent purpose?",
    description: "Observation of potentially repetitive or unusual behavioral patterns.",
  },
]

export default function ScreeningPage() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border shadow-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <LogIn className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl">Login Required</CardTitle>
              <CardDescription className="text-base">
                You need to be logged in to access the autism screening tool.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                The autism screening assessment is available only for registered users. Please log in to your account to
                proceed with the screening.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <a href="/">Back to Home</a>
              </Button>
              <Button asChild>
                <a href="/auth">Go to Login</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setTimeout(() => {
      const score = Object.values(answers).filter((v) => v === "no" || v === "unusual").length
      router.push(`/results?score=${score}`)
    }, 2000)
  }

  const isCurrentQuestionAnswered = !!answers[questions[currentStep].id]
  const isLastStep = currentStep === questions.length - 1

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
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
            <RadioGroup value={answers[questions[currentStep].id]} onValueChange={handleAnswer} className="space-y-3">
              {["yes", "no"].map((option) => (
                <Label
                  key={option}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-accent/50 ${
                    answers[questions[currentStep].id] === option ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <span className="font-medium capitalize">{option}</span>
                  <RadioGroupItem value={option} className="sr-only" />
                  {answers[questions[currentStep].id] === option && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </Label>
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

            {isLastStep ? (
              <Button
                onClick={handleSubmit}
                disabled={!isCurrentQuestionAnswered || isSubmitting}
                className="gap-2 min-w-[140px]"
              >
                {isSubmitting ? "Analyzing..." : "Get Results"}
                {!isSubmitting && <ChevronRight className="h-4 w-4" />}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!isCurrentQuestionAnswered} className="gap-2 min-w-[120px]">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
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
  )
}
