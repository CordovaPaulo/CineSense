"use client"

import { Box, Paper, Typography } from "@mui/material"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        sx={{
          maxWidth: "70%",
          backgroundColor: isUser ? "#ffbd4c" : "#1e1e1e",
          color: isUser ? "#f2f2f2" : "#f2f2f2",
          p: 2,
          borderRadius: "0.75rem",
          border: isUser ? "none" : "1px solid #333333",
        }}
      >
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {content}
        </Typography>
        {timestamp && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 1,
              color: isUser ? "rgba(242, 242, 242, 0.7)" : "#a3a3a3",
            }}
          >
            {timestamp.toLocaleTimeString()}
          </Typography>
        )}
      </Paper>
    </Box>
  )
}
