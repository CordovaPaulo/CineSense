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
          maxWidth: "70%",
          backgroundColor: isUser ? "#ffbd4c" : "#1e1e1e",
          color: isUser ? "#f2f2f2" : "#f2f2f2",
          p: 2,
          borderRadius: "0.75rem",
          border: isUser ? "none" : "1px solid #333333",
        }}
      >
        <Text variant="body1" sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {content}
        </Text>
        {timestamp && (
          <Text
            variant="caption"
            sx={{
              display: "block",
              mt: 1,
              color: isUser ? "rgba(242, 242, 242, 0.7)" : "#a3a3a3",
            }}
          >
            {timestamp.toLocaleTimeString()}
          </Text>
        )}
      </Paper>
    </Box>
  )
}
