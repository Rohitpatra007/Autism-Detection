"use client"

import { useState } from "react"
import { Send, Brain, Shield, Search, Phone, MoreVertical, Paperclip, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "doctor",
      text: "Hello. I've received your screening report and fMRI analysis. How can I help you today?",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "I'm a bit concerned about the 'Higher Likelihood' result. What does it actually mean for my child?",
      time: "10:02 AM",
    },
    {
      id: 3,
      sender: "doctor",
      text: "It means the AI detected certain neural markers that correlate with ASD. However, this is not a diagnosis. We should schedule a clinical observation to look at behavioral patterns.",
      time: "10:05 AM",
    },
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages([...messages, newMessage])
    setInput("")
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:flex w-80 bg-white border-r border-slate-200 flex-col">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Consultations
          </h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 cursor-pointer">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/caring-doctor.png" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold">Dr. Sarah Johnson</p>
                  <p className="text-xs text-primary font-medium">Developmental Specialist</p>
                </div>
              </div>
            </div>
            {/* Recent History Placeholder */}
            <div className="space-y-1 px-2 pt-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Analysis</p>
              <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">fMRI_Scan_2401.jpg</span>
                </div>
                <Badge variant="outline" className="text-[10px] h-4">
                  92% Match
                </Badge>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-medium text-slate-600">Secure E2E Encryption</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-4">
            <Link href="/detect" className="lg:hidden p-2 hover:bg-slate-100 rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/caring-doctor.png" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold">Dr. Sarah Johnson</p>
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              </div>
              <p className="text-[10px] text-slate-400">Response time: ~15 mins</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6 bg-slate-50/30">
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[85%] ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage
                      src={
                        m.sender === "doctor"
                          ? "/placeholder.svg?height=32&width=32&query=doctor"
                          : "/placeholder.svg?height=32&width=32&query=user"
                      }
                    />
                    <AvatarFallback>{m.sender === "doctor" ? "DR" : "U"}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div
                      className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        m.sender === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                      }`}
                    >
                      {m.text}
                    </div>
                    <p
                      className={`text-[10px] text-slate-400 px-1 ${m.sender === "user" ? "text-right" : "text-left"}`}
                    >
                      {m.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type your message..."
                className="pr-12 py-6 rounded-2xl border-slate-200 focus-visible:ring-primary"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl"
                onClick={sendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
