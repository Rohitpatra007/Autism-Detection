"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: "patient" | "doctor"
  text: string
  timestamp: Date
}

export interface ChatConversation {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  messages: ChatMessage[]
}

interface ChatContextType {
  conversations: ChatConversation[]
  currentConversation: ChatConversation | null
  openConversation: (patientId: string, patientName: string, doctorId: string, doctorName: string) => void
  sendMessage: (
    conversationId: string,
    senderId: string,
    senderName: string,
    senderRole: "patient" | "doctor",
    text: string,
  ) => void
  clearChatHistory: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: "conv-1-1",
    patientId: "1",
    patientName: "John Doe",
    doctorId: "1",
    doctorName: "Dr. Rajesh Sharma",
    messages: [
      {
        id: "m1",
        senderId: "1",
        senderName: "John Doe",
        senderRole: "patient",
        text: "Hi Dr. Sharma, my son has been showing some concerning behaviors lately. He avoids eye contact and doesn't like playing with other kids.",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: "m2",
        senderId: "1",
        senderName: "Dr. Rajesh Sharma",
        senderRole: "doctor",
        text: "Thank you for reaching out, John. Those are important observations. Can you tell me more about these behaviors? When did you first notice them?",
        timestamp: new Date(Date.now() - 7140000),
      },
      {
        id: "m3",
        senderId: "1",
        senderName: "John Doe",
        senderRole: "patient",
        text: "He's 6 years old. We noticed it around age 2. He also has repetitive behaviors - lining up toys for hours and gets upset with any changes to routine.",
        timestamp: new Date(Date.now() - 7080000),
      },
      {
        id: "m4",
        senderId: "1",
        senderName: "Dr. Rajesh Sharma",
        senderRole: "doctor",
        text: "I recommend scheduling an fMRI screening. This non-invasive test can analyze brain connectivity patterns. It takes about 30 minutes and we get results within 24-48 hours.",
        timestamp: new Date(Date.now() - 7020000),
      },
      {
        id: "m5",
        senderId: "1",
        senderName: "John Doe",
        senderRole: "patient",
        text: "How accurate is this fMRI test? I want to make sure before putting my son through it.",
        timestamp: new Date(Date.now() - 6960000),
      },
      {
        id: "m6",
        senderId: "1",
        senderName: "Dr. Rajesh Sharma",
        senderRole: "doctor",
        text: "The accuracy is 92.5% based on extensive clinical studies. It's completely safe for children - no radiation, just imaging. Shall I send you the consent form?",
        timestamp: new Date(Date.now() - 6900000),
      },
    ],
  },
  {
    id: "conv-2-2",
    patientId: "2",
    patientName: "Sarah Smith",
    doctorId: "2",
    doctorName: "Dr. Priya Kapoor",
    messages: [
      {
        id: "m1",
        senderId: "2",
        senderName: "Dr. Priya Kapoor",
        senderRole: "doctor",
        text: "Hello Sarah, I wanted to check in on Emma's progress. How has she been adjusting to the behavioral therapy sessions?",
        timestamp: new Date(Date.now() - 14400000),
      },
      {
        id: "m2",
        senderId: "2",
        senderName: "Sarah Smith",
        senderRole: "patient",
        text: "Hi Dr. Kapoor! Emma is doing much better. The social stories you recommended really helped. She's more confident at school now.",
        timestamp: new Date(Date.now() - 14340000),
      },
      {
        id: "m3",
        senderId: "2",
        senderName: "Dr. Priya Kapoor",
        senderRole: "doctor",
        text: "That's wonderful to hear! Any improvements with sensory sensitivities? The light sensitivity especially?",
        timestamp: new Date(Date.now() - 14280000),
      },
      {
        id: "m4",
        senderId: "2",
        senderName: "Sarah Smith",
        senderRole: "patient",
        text: "Yes! She tolerates bright lights much better now. We've been using the weighted blanket too, which helps her relax during bedtime.",
        timestamp: new Date(Date.now() - 14220000),
      },
      {
        id: "m5",
        senderId: "2",
        senderName: "Dr. Priya Kapoor",
        senderRole: "doctor",
        text: "Excellent! Continue with the current approach. I'd like to schedule a follow-up appointment next month to assess overall progress. Does that work?",
        timestamp: new Date(Date.now() - 14160000),
      },
      {
        id: "m6",
        senderId: "2",
        senderName: "Sarah Smith",
        senderRole: "patient",
        text: "That works perfectly. Thank you so much for your support, Dr. Kapoor. Emma is a different child now!",
        timestamp: new Date(Date.now() - 14100000),
      },
    ],
  },
]

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS)
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null)

  useEffect(() => {
    const savedConversations = localStorage.getItem("chats")
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations)
        const conversationsWithDates = parsed.map((conv: any) => ({
          ...conv,
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }))
        setConversations(conversationsWithDates)
      } catch (error) {
        console.log("[v0] Failed to load conversations from localStorage, using defaults")
        setConversations(INITIAL_CONVERSATIONS)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(conversations))
  }, [conversations])

  const openConversation = useCallback(
    (patientId: string, patientName: string, doctorId: string, doctorName: string) => {
      let conversation = conversations.find((conv) => conv.patientId === patientId && conv.doctorId === doctorId)

      if (!conversation) {
        conversation = {
          id: `conv-${patientId}-${doctorId}`,
          patientId,
          patientName,
          doctorId,
          doctorName,
          messages: [],
        }
        setConversations((prev) => [...prev, conversation!])
      }

      setCurrentConversation(conversation)
    },
    [conversations],
  )

  const sendMessage = useCallback(
    (conversationId: string, senderId: string, senderName: string, senderRole: "patient" | "doctor", text: string) => {
      if (!text.trim()) return

      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId,
        senderName,
        senderRole,
        text,
        timestamp: new Date(),
      }

      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
            }
          }
          return conv
        }),
      )

      setCurrentConversation((prev) => {
        if (prev && prev.id === conversationId) {
          return {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        }
        return prev
      })
    },
    [],
  )

  const clearChatHistory = useCallback(() => {
    setConversations(INITIAL_CONVERSATIONS)
    localStorage.setItem("chats", JSON.stringify(INITIAL_CONVERSATIONS))
    setCurrentConversation(null)
  }, [])

  return (
    <ChatContext.Provider
      value={{ conversations, currentConversation, openConversation, sendMessage, clearChatHistory }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
