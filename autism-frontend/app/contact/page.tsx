import { Mail, MapPin, Github, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-primary">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have questions about the project or want to provide feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-sm text-muted-foreground">project.autism@v0.edu</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">College</h3>
                <p className="text-sm text-muted-foreground">
                  V0 Institute of Technology & Research, Department of Computer Science
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">GitHub</h3>
                <p className="text-sm text-muted-foreground">github.com/v0/autism-detection-ai</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                </div>
                <Button className="w-full gap-2">
                  Send Message
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
