"use client"

import { CircularProgress, type CircularProgressProps } from "@mui/material"

export function Spinner({ sx, ...props }: CircularProgressProps) {
  return (
    <CircularProgress
      sx={{
        color: "#a855f7",
        ...sx,
      }}
      {...props}
    />
  )
}
