"use client"

import type React from "react"

import { Box, TextField, IconButton } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
}

export function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type your message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#1e1e1e",
            borderColor: "#333333",
            color: "#f2f2f2",
            "&:hover fieldset": {
              borderColor: "#ffbd4c",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffbd4c",
            },
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#a3a3a3",
            opacity: 1,
          },
        }}
      />
      <IconButton
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        sx={{
          color: "#a855f7",
          "&:hover": {
            backgroundColor: "rgba(168, 85, 247, 0.1)",
          },
          "&:disabled": {
            color: "#666666",
          },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  )
}
