"use client"

import { Box } from "../atoms/Box"
import { Heading, BodyText } from "../atoms/Text"

interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        py: 8,
        textAlign: "center",
      }}
    >
      <Heading variant="h5">{title}</Heading>
      {description && <BodyText>{description}</BodyText>}
    </Box>
  )
}
