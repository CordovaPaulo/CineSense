"use client"

import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material"
import type { ButtonProps } from '@/interfaces/interface'

export function Button({ children, sx, ...props }: ButtonProps) {
  return (
    <MuiButton
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRadius: '0.5rem',
        padding: '6px 14px',
        transition: 'transform 160ms ease, box-shadow 160ms ease, opacity 120ms ease',
        '&:active': { transform: 'translateY(1px)' },
        '&:hover': { filter: 'brightness(1.03)' },
        // ensure consumer sx merges after these defaults
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  )
}
