import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Autism Spectrum Disorder (ASD)?",
      answer:
        "Autism spectrum disorder (ASD) is a developmental disability caused by differences in the brain. People with ASD often have problems with social communication and interaction, and restricted or repetitive behaviors or interests.",
    },
    {
      question: "What are the symptoms of Autism Spectrum Disorder?",
      answer:
        "Common symptoms include avoiding eye contact, not responding to their name, repetitive movements (stimming), difficulty understanding others' feelings, and intense interest in specific topics.",
    },
    {
      question: "What is Aspergers Syndrome?",
      answer:
        "Previously considered a separate diagnosis, Asperger's is now part of the broader Autism Spectrum Disorder (Level 1). It typically involves social challenges without significant language or intellectual delays.",
    },
    {
      question: "What is Autistic Disorder?",
      answer:
        "This term was historically used for more severe cases of autism involving significant social, communication, and behavioral challenges.",
    },
    {
      question: "What is Rett Syndrome?",
      answer:
        "Rett syndrome is a rare genetic neurological disorder that occurs almost exclusively in girls and affects nearly every aspect of the child's life: their ability to speak, walk, eat, and even breathe easily.",
    },
    {
      question: "How are ASDs diagnosed?",
      answer:
        "Diagnosis involves behavioral evaluations by specialists like developmental pediatricians, neurologists, or psychologists, often using tools like the ADOS-2 or ADI-R alongside medical imaging.",
    },
    {
      question: "What are the causes of Autism Spectrum Disorder (ASDs)?",
      answer:
        "Most scientists agree that genetics are responsible for the vast majority of cases, though environmental factors during prenatal development may also play a role.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-primary font-bold text-center mb-2 uppercase tracking-widest text-sm">
          Frequently Asked Question
        </p>
        <h1 className="text-5xl font-black mb-16 text-center text-slate-900">You May Ask</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-2">
              <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
