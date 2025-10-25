"use client"

import { Paper } from "@mui/material"
import type { ReactNode } from "react"
import type { SxProps, Theme } from "@mui/material"

interface ChatContainerProps {
  children: ReactNode
  sx?: SxProps<Theme>
}

export function ChatContainer({ children, sx }: ChatContainerProps) {
  return (
    <Paper
      sx={{
        backgroundColor: "#141414",
        border: "1px solid #333333",
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
    </Paper>
  )
}
