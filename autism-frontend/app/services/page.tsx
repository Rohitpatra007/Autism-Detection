import { Users, Heart, GraduationCap, Phone, ExternalLink, MessageCircle, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  const services = [
    {
      title: "Early Intervention Therapy",
      description:
        "Focused support for toddlers and young children to improve social, communication, and motor skills.",
      icon: Heart,
    },
    {
      title: "Educational Support",
      description: "Customized learning strategies and classroom accommodations for neurodivergent students.",
      icon: GraduationCap,
    },
    {
      title: "Parent Counseling",
      description: "Guidance and emotional support for families navigating the challenges of an ASD diagnosis.",
      icon: Users,
    },
    {
      title: "Social Skills Training",
      description: "Group programs designed to help children and adolescents navigate social interactions.",
      icon: MessageCircle,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-primary">Practical Value & Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing more than just screening. Explore resources for early intervention and support
            networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, i) => (
            <Card key={i} className="border-accent/10 hover:border-accent/30 transition-all group">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <MapPin className="text-primary h-6 w-6" />
            Helplines & Resources (India)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Action for Autism", location: "New Delhi", phone: "011-40547395" },
              { name: "Com DEALL Trust", location: "Bengaluru", phone: "080-25441313" },
              { name: "Ummeed Child Development Center", location: "Mumbai", phone: "022-62464444" },
            ].map((org, i) => (
              <Card key={i} className="bg-muted/30 border-none">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-1">{org.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{org.location}</p>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Phone className="h-3 w-3" />
                    {org.phone}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Are you a healthcare professional?</h2>
          <p className="mb-8 opacity-90 max-w-2xl mx-auto">
            Join our network to provide support to families in need. Help us make early intervention accessible to
            everyone.
          </p>
          <Button variant="secondary" size="lg" className="gap-2">
            Register as a Partner
            <ExternalLink className="h-4 w-4" />
          </Button>
        </section>
      </div>
    </div>
  )
}
