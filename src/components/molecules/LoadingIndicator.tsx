"use client"

import { Box } from "../atoms/Box"
import { Spinner } from "../atoms/Spinner"
import { BodyText } from "../atoms/Text"

interface LoadingIndicatorProps {
  message?: string
}

export function LoadingIndicator({ message = "Loading..." }: LoadingIndicatorProps) {
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
      <Spinner />
      <BodyText>{message}</BodyText>
    </Box>
  )
}
