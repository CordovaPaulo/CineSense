"use client"

import { Box } from "../atoms/Box"
import { ChatContainer } from "../organisms/ChatContainer"
import type { ChatLayoutProps } from '@/interfaces/interface'

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
