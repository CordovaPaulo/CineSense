"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@/lib/mui-theme"
import EmotionRegistry from "./emotion-registry"

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionRegistry>
  )
}