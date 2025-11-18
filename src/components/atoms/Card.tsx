"use client"

import { Card as MuiCard, type CardProps as MuiCardProps, CardContent, CardMedia } from "@mui/material"

export function Card({ children, sx, ...props }: MuiCardProps) {
  return (
    <MuiCard
      sx={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333333",
        borderRadius: "0.5rem",
        overflow: "hidden",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  )
}

export { CardContent, CardMedia }
