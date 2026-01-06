import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#000B1A] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <p className="text-slate-400">Pune, Maharashtra</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <p className="text-slate-400">+91 9975761521</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-slate-400">autismguardian@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Twitter className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Useful Pages */}
          <div>
            <h3 className="text-xl font-bold mb-6">Useful Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-project"
                  className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span>›</span> About Project
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span>›</span> Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span>›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand/About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black">
              <Brain className="h-8 w-8 text-primary" />
              <span>AutismGuardian.Ai</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leveraging advanced 12-layer CNN architectures and deep learning to provide non-invasive preliminary
              screenings for Autism Spectrum Disorder.
            </p>
            <Button variant="outline" className="border-slate-700 text-white bg-transparent hover:bg-slate-800">
              Get A Quote
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex gap-6">
            <Link href="#">Terms of use</Link>
            <Link href="#">Privacy policy</Link>
            <Link href="#">Cookies</Link>
            <Link href="#">Help</Link>
            <Link href="/faq">FAQs</Link>
          </div>
          <p>© {new Date().getFullYear()} AutismGuardian.Ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
