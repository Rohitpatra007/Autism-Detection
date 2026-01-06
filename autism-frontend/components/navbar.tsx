"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { isLoggedIn, userRole, logout } = useAuth()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-autism", label: "About Autism" },
    { href: "/screening", label: "Screening" },
    { href: "/services", label: "Services" },
  ]

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-primary">
            <Brain className="h-7 w-7" aria-hidden="true" />
            <span className="hidden sm:inline">AutismGuardian.AI</span>
            <span className="sm:hidden">AG.AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {!isLoggedIn && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}
            {!isLoggedIn ? (
              <Button asChild className="ml-2 font-bold">
                <Link href="/auth">Login</Link>
              </Button>
            ) : (
              <Button onClick={handleLogout} variant="destructive" className="ml-2 font-bold">
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {!isLoggedIn && (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
              {!isLoggedIn ? (
                <Button asChild className="mt-2 font-bold">
                  <Link href="/auth" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
              ) : (
                <Button onClick={handleLogout} variant="destructive" className="mt-2 font-bold">
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
