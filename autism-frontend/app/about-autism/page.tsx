import { Info, MessageCircle, Users, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export default function AboutAutismPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-primary">What is Autism Spectrum Disorder (ASD)?</h1>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Autism spectrum disorder (ASD) is a developmental disability caused by differences in the brain. People with
          ASD often have problems with social communication and interaction, and restricted or repetitive behaviors or
          interests. People with ASD may also have different ways of learning, moving, or paying attention.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Info className="text-primary h-6 w-6" />
            Common Signs & Characteristics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-accent/20">
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                  <li>Delayed speech skills</li>
                  <li>Repeating words or phrases</li>
                  <li>Difficulty maintaining conversation</li>
                  <li>Literal interpretation of language</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-accent/20">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Social Interaction</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                  <li>Avoiding eye contact</li>
                  <li>Difficulty understanding social cues</li>
                  <li>Preference for playing alone</li>
                  <li>Trouble expressing emotions</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-accent/20">
              <CardHeader>
                <Activity className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Behavior</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                  <li>Repetitive body movements</li>
                  <li>Strict adherence to routines</li>
                  <li>Highly focused interests</li>
                  <li>Sensory sensitivities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16 bg-muted/30 p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold mb-6 text-center">Myths vs Facts</h2>
          <div className="space-y-4">
            {[
              {
                myth: "Autism is a disease that can be cured.",
                fact: "Autism is a lifelong neurodevelopmental condition, not a disease. Early intervention can significantly improve quality of life.",
              },
              {
                myth: "People with autism don't want friends.",
                fact: "Many people with autism want social connections but may struggle with social skills or find social situations overwhelming.",
              },
              {
                myth: "All autistic people have special 'savant' skills.",
                fact: "While some autistic individuals have extraordinary skills, the majority have a mix of strengths and challenges like anyone else.",
              },
              {
                myth: "Bad parenting causes autism.",
                fact: "Autism is biological and has nothing to do with how a child is raised.",
              },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                  <span className="text-xs font-bold uppercase text-destructive block mb-1">Myth</span>
                  <p className="text-sm font-medium">{item.myth}</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <span className="text-xs font-bold uppercase text-primary block mb-1">Fact</span>
                  <p className="text-sm font-medium">{item.fact}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-4">
            <Lightbulb className="h-4 w-4" />
            <span>It's a Spectrum</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Understanding the Spectrum</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The term "spectrum" refers to the wide variation in challenges and strengths possessed by each person with
            autism. No two people with autism are exactly alike.
          </p>
        </section>
      </div>
    </div>
  )
}
