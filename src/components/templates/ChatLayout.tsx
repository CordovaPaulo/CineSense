"use client"

import { Box } from "../atoms/Box"
import { ChatContainer } from "../organisms/ChatContainer"

interface ChatLayoutProps {
  messages: React.ReactNode
  input: React.ReactNode
}

export function ChatLayout({ messages, input }: ChatLayoutProps) {
  return (
    <ChatContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 200px)",
        p: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          p: 2,
        }}
      >
        {messages}
      </Box>
      <Box>{input}</Box>
    </ChatContainer>
  )
}
