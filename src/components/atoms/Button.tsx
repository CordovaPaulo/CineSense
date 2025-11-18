"use client"

import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"

interface ButtonProps extends Omit<MuiButtonProps, 'sx'> {
  sx?: SxProps<Theme>
}

export function Button({ children, sx, ...props }: ButtonProps) {
  return (
    <MuiButton
      sx={{
        textTransform: "none",
        fontWeight: 500,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  )
}
