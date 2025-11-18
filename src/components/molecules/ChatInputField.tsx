"use client"

import type React from "react"
import { Box } from "../atoms/Box"
import { Input } from "../atoms/Input"
import { IconButton } from "../atoms/IconButton"
import { SendIcon } from "../atoms/Icon"

interface ChatInputFieldProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
}

export function ChatInputField({ value, onChange, onSubmit, disabled }: ChatInputFieldProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
      <Input
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type your message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <IconButton onClick={onSubmit} disabled={disabled || !value.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}
