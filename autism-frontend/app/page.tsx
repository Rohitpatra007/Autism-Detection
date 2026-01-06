import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, Users, FileText, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <Brain className="h-4 w-4" />
                <span>AI-Powered Early Detection</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6 text-balance">
                Early Autism Detection Using AI
              </h1>
              <p className="text-lg text-muted-foreground mb-10 text-pretty max-w-2xl mx-auto lg:mx-0">
                A smart screening tool to assist early identification of Autism Spectrum Disorder. Our research-backed
                ML model provides a preliminary risk analysis in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="/screening">
                    Start Screening
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent" asChild>
                  <Link href="/about-autism">Learn About Autism</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img
                  src="/kind-child-interacting-with-simple-colorful-shapes.jpg"
                  alt="Child interacting with educational tools"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative background elements */}
              <div className="absolute -top-6 -right-6 h-32 w-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-48 w-48 bg-accent/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Early Detection Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Early Detection Matters</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Early intervention is crucial for improving developmental outcomes and quality of life for children with
              ASD.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Improved Outcomes",
                description: "Early support significantly improves long-term developmental trajectories.",
                icon: CheckCircle2,
              },
              {
                title: "AI-Assisted",
                description: "Leveraging advanced machine learning for consistent screening patterns.",
                icon: Brain,
              },
              {
                title: "Quick & Non-invasive",
                description: "Screening process is fast, accessible, and comfortable for the child.",
                icon: Activity,
              },
              {
                title: "Research-Backed",
                description: "Our methodology is based on clinical datasets and recognized screening criteria.",
                icon: ShieldCheck,
              },
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Our System Works</h2>
            <p className="text-muted-foreground">Follow three simple steps to get a risk prediction.</p>
          </div>
          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: "01",
                  title: "Input Data",
                  description: "Complete our behavioral questionnaire or upload relevant data for analysis.",
                  icon: FileText,
                },
                {
                  step: "02",
                  title: "ML Analysis",
                  description: "Our trained machine learning models analyze the input against known patterns.",
                  icon: Brain,
                },
                {
                  step: "03",
                  title: "Risk Prediction",
                  description: "Receive a detailed risk prediction report with recommended next steps.",
                  icon: Activity,
                },
              ].map((step, i) => (
                <div key={i} className="bg-background flex flex-col items-center text-center p-6 rounded-2xl">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-6 ring-8 ring-background">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: "Autism Prevalence", value: "1 in 36" },
              { label: "Dataset Size", value: "1,000+" },
              { label: "Model Accuracy", value: "94.5%" },
              { label: "Age Groups", value: "2-17" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Responsibility / Teachers Note */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-background p-8 rounded-2xl border border-border shadow-sm">
            <Users className="h-10 w-10 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">A Tool for Awareness & Empathy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is not just detection-focused, but also awareness-oriented. We believe in building a more
              inclusive society through better understanding of the autism spectrum.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary/10 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to start the screening?</h2>
              <p className="text-muted-foreground text-lg">
                It takes less than 10 minutes to complete the preliminary assessment.
              </p>
            </div>
            <Button size="lg" className="h-14 px-10 text-lg shadow-lg shadow-primary/20" asChild>
              <Link href="/screening">
                Start Screening Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
