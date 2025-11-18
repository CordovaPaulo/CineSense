"use client"

import { Grid } from "../atoms/Grid"

interface ContentGridProps {
  children: React.ReactNode
  spacing?: number
}

export function ContentGrid({ children, spacing = 3 }: ContentGridProps) {
  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  )
}
