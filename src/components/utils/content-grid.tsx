"use client"

import { Grid } from "@mui/material"
import type { ReactNode } from "react"

interface ContentGridProps {
  children: ReactNode
  columns?: number
}

export function ContentGrid({ children, columns = 4 }: ContentGridProps) {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        "& .MuiGrid-item": {
          display: "flex",
        },
      }}
    >
      {children}
    </Grid>
  )
}
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