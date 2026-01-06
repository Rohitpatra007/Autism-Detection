import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { ChatProvider } from "@/lib/chat-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Early Autism Detection | AI-Powered Screening Tool",
  description:
    "A smart, AI-assisted screening tool for early autism detection. Non-invasive, quick, and research-backed approach to identify autism spectrum disorder in children.",
  keywords: [
    "autism detection",
    "early screening",
    "ASD",
    "autism spectrum disorder",
    "AI screening",
    "child development",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <ChatProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ChatProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
