"use client"

import { Paper as MuiPaper, type PaperProps as MuiPaperProps } from "@mui/material"

export function Paper({ children, sx, ...props }: MuiPaperProps) {
  return (
    <MuiPaper
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#f2f2f2",
        border: "1px solid #333333",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiPaper>
  )
}
