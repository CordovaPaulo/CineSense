"use client"

import { IconButton as MuiIconButton, type IconButtonProps as MuiIconButtonProps } from "@mui/material"

export function IconButton({ children, sx, ...props }: MuiIconButtonProps) {
  return (
    <MuiIconButton
      sx={{
        color: "#a855f7",
        "&:hover": {
          backgroundColor: "rgba(168, 85, 247, 0.1)",
        },
        "&:disabled": {
          color: "#666666",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiIconButton>
  )
}
