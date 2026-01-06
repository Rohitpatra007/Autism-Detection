"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Brain, FileText, Activity, Users, User, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { isLoggedIn, isLoading, logout } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Please log in first</p>
          <button
            onClick={() => router.push("/auth")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const menuItems = [
    { href: "/patient", icon: Activity, label: "Dashboard" },
    { href: "/patient/detect", icon: Brain, label: "Detect Autism" },
    { href: "/patient/results", icon: FileText, label: "Results" },
    { href: "/patient/consult", icon: Users, label: "Consult Doctor" },
    { href: "/patient/profile", icon: User, label: "Profile" },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-0"} border-r border-border transition-all duration-300 overflow-hidden`}
      >
        <div className="h-full flex flex-col p-6 space-y-8">
          <div className="flex items-center gap-2 text-lg font-bold text-primary">
            <Brain className="h-6 w-6" />
            <span>AutismGuardian.AI</span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">Patient Dashboard</h1>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
