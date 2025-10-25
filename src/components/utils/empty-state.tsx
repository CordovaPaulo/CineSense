"use client"

import { Box, Typography } from "@mui/material"

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
      <Typography variant="h5" sx={{ color: "#f2f2f2", fontWeight: 600 }}>
        {title}
      </Typography>
      {description && <Typography sx={{ color: "#a3a3a3" }}>{description}</Typography>}
    </Box>
  )
}
