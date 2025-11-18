"use client"

import { Box as MuiBox, type BoxProps as MuiBoxProps } from "@mui/material"

export function Box({ children, ...props }: MuiBoxProps) {
  return <MuiBox {...props}>{children}</MuiBox>
}
