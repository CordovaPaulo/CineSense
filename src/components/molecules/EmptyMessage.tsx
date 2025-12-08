"use client"

import { Box } from "../atoms/Box"
import { BodyText } from "../atoms/Text"
import type { EmptyMessageProps } from '@/interfaces/interface'

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
