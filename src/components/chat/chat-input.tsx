"use client"

import { ChatInputField } from "../molecules/ChatInputField"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
}

export function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  return <ChatInputField value={value} onChange={onChange} onSubmit={onSubmit} disabled={disabled} />
}
