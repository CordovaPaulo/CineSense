"use client"

import { Box } from "../atoms/Box"
import { BodyText } from "../atoms/Text"

interface EmptyMessageProps {
  message?: string
  icon?: React.ReactNode
}

export function EmptyMessage({ message = "No items found", icon }: EmptyMessageProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        py: 8,
      }}
    >
      {icon}
      <BodyText>{message}</BodyText>
    </Box>
  )
}
