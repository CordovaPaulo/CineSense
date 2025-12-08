"use client"

import { ChatInputField } from "../molecules/ChatInputField"
import type { ChatInputProps } from '@/interfaces/interface'

export function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  return <ChatInputField value={value} onChange={onChange} onSubmit={onSubmit} disabled={disabled} />
}
