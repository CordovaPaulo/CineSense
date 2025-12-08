"use client"

import { MessageBubble } from "../molecules/MessageBubble"
import type { ChatMessageProps } from '@/interfaces/interface'

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  return <MessageBubble role={role} content={content} timestamp={timestamp} />
}
