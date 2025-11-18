"use client"

import { MessageBubble } from "../molecules/MessageBubble"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  return <MessageBubble role={role} content={content} timestamp={timestamp} />
}
