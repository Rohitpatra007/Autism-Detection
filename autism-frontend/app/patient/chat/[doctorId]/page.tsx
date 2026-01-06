"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useChat } from "@/lib/chat-context"
import { useAuth } from "@/lib/auth-context"

const mockDoctorsData = {
  "1": {
    name: "Dr. Rajesh Sharma",
    phone: "+91 9975761521",
    specialization: "Autism Spectrum Disorder",
  },
  "2": {
    name: "Dr. Priya Kapoor",
    phone: "+91 8765432109",
    specialization: "Pediatric Neurologist",
  },
  "3": {
    name: "Dr. Amitabh Singh",
    phone: "+91 7654321098",
    specialization: "Neurologist",
  },
}

export default function DoctorChatPage({
  params,
}: {
  params: { doctorId: string }
}) {
  const { currentConversation, openConversation, sendMessage } = useChat()
  const { userData, userRole } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const [isInitialized, setIsInitialized] = useState(false)
  const doctorId = params.doctorId
  const doctorData = mockDoctorsData[doctorId as keyof typeof mockDoctorsData]

  useEffect(() => {
    if (!isInitialized && userRole === "patient" && userData) {
      openConversation(
        userData.fullName || "patient-1",
        userData.fullName || "Patient",
        doctorId,
        doctorData?.name || "Dr. Rajesh Sharma",
      )
      setIsInitialized(true)
    }
  }, [userRole, userData, doctorId, openConversation, isInitialized, doctorData])

  const handleSendMessage = () => {
    if (newMessage.trim() && currentConversation && userData) {
      sendMessage(
        currentConversation.id,
        userData.fullName || "patient-1",
        userData.fullName || "Patient",
        "patient",
        newMessage,
      )
      setNewMessage("")
    }
  }

  if (!currentConversation) {
    return <div className="flex items-center justify-center h-96">Loading chat...</div>
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Link href="/patient" className="text-sm text-primary hover:underline mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h2 className="text-3xl font-bold text-foreground">Chat with {currentConversation.doctorName}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="md:col-span-2">
          <Card className="h-96 flex flex-col">
            <CardHeader>
              <CardTitle>Message History</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4 mb-4 scroll-smooth" id="messages-container">
              {currentConversation.messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>No messages yet. Start a conversation!</p>
                </div>
              ) : (
                currentConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderRole === "patient" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.senderRole === "patient" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
            <div className="border-t border-border p-4 space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Doctor Info */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Doctor Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Doctor Name</p>
                <p className="font-semibold">{currentConversation.doctorName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Specialization</p>
                <p className="font-semibold">{doctorData?.specialization || "Autism Spectrum Disorder"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold text-green-600">Online</p>
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent" asChild>
                  <a
                    href={`https://wa.me/${doctorData?.phone.replace(/\D/g, "") || "919975761521"}?text=Hello Dr., I would like to discuss the autism screening results.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent" asChild>
                  <a href={`tel:${doctorData?.phone || "+91 9975761521"}`}>
                    <Phone className="h-4 w-4" />
                    Call Doctor
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
