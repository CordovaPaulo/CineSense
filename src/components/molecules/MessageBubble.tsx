"use client"

import { Box } from "../atoms/Box"
import { Paper } from "../atoms/Paper"
import { Text } from "../atoms/Text"

interface MessageBubbleProps {
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

export function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
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
          maxWidth: "78%",
          backgroundColor: isUser ? "#ffbd4c" : "#121212",
          color: isUser ? "#0b0b0b" : "#f2f2f2",
          p: { xs: 1.25, sm: 2 },
          borderRadius: "0.75rem",
          border: isUser ? "none" : "1px solid #2b2b2b",
          boxShadow: isUser ? '0 4px 18px rgba(0,0,0,0.12)' : '0 6px 18px rgba(0,0,0,0.25)',
        }}
      >
        <Text
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            lineHeight: 1.6,
            fontSize: { xs: '0.95rem', sm: '1rem' },
            fontWeight: 500,
            color: isUser ? '#0b0b0b' : undefined,
          }}
        >
          {content}
        </Text>
        {timestamp && (
          <Text
            variant="caption"
            sx={{
              display: "block",
              mt: 1,
              color: isUser ? "rgba(11,11,11,0.6)" : "#a3a3a3",
            }}
          >
            {timestamp.toLocaleTimeString()}
          </Text>
        )}
      </Paper>
    </Box>
  )
}
