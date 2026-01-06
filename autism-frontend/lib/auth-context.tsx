"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isLoggedIn: boolean
  userRole: "patient" | null
  userData: Record<string, string> | null
  isLoading: boolean
  login: (role: "patient", data: Record<string, string>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"patient" | null>(null)
  const [userData, setUserData] = useState<Record<string, string> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      try {
        const { isLoggedIn: loggedIn, role, data } = JSON.parse(savedAuth)
        if (role === "patient") {
          setIsLoggedIn(loggedIn)
          setUserRole(role)
          setUserData(data)
        } else {
          localStorage.removeItem("auth")
        }
      } catch (error) {
        console.error("Error parsing auth data:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (role: "patient", data: Record<string, string>) => {
    setIsLoggedIn(true)
    setUserRole(role)
    setUserData(data)
    localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true, role, data }))
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setUserData(null)
    localStorage.removeItem("auth")
    localStorage.removeItem("chat")
    setTimeout(() => {
      router.push("/")
    }, 100)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userData, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
