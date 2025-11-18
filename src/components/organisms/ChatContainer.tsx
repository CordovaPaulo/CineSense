"use client"

import { Paper } from "../atoms/Paper"
import type { SxProps, Theme } from "@mui/material"

interface ChatContainerProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function ChatContainer({ children, sx }: ChatContainerProps) {
  return (
    <Paper
      sx={{
        backgroundColor: "#141414",
        border: "1px solid #333333",
        borderRadius: "0.5rem",
        ...sx,
      }}
    >
      {children}
    </Paper>
  )
}
