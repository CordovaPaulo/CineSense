"use client"

import { Typography, type TypographyProps } from "@mui/material"

export function Text({ children, ...props }: TypographyProps) {
  return <Typography {...props}>{children}</Typography>
}

export function Heading({ children, variant = "h6", sx, ...props }: TypographyProps) {
  return (
    <Typography
      variant={variant}
      sx={{
        color: "#f2f2f2",
        fontWeight: 600,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}

export function BodyText({ children, sx, ...props }: TypographyProps) {
  return (
    <Typography
      variant="body2"
      sx={{
        color: "#a3a3a3",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}
