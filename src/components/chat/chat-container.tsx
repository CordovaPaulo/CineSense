"use client"

import { ChatContainer as ChatContainerOrganism } from "../organisms/ChatContainer"
import type { ReactNode } from "react"
import type { SxProps, Theme } from "@mui/material"

interface ChatContainerProps {
  children: ReactNode
  sx?: SxProps<Theme>
}

export function ChatContainer({ children, sx }: ChatContainerProps) {
  return (
    <ChatContainerOrganism
      sx={{
        borderRadius: "0.75rem",
        p: 3,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 480,
        overflow: "hidden",
        ...sx,
      }}
    >
      {children}
    </ChatContainerOrganism>
  )
}
