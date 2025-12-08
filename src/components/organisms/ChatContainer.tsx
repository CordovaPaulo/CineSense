"use client"

import { Paper } from "../atoms/Paper"
import type { SxProps, Theme } from "@mui/material"
import type { ChatContainerProps } from '@/interfaces/interface'

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
