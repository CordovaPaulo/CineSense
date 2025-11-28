"use client"

import { Grid as MuiGrid, type GridProps as MuiGridProps } from "@mui/material"

export function Grid({ children, ...props }: MuiGridProps) {
  return <MuiGrid {...props}>{children}</MuiGrid>
}
