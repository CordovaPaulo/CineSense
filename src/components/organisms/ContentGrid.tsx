"use client"

import { Grid } from "../atoms/Grid"
import type { ContentGridProps } from '@/interfaces/interface'

export function ContentGrid({ children, spacing = 3 }: ContentGridProps) {
  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  )
}
