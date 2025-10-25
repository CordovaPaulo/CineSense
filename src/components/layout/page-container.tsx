"use client"

import { Container, Box } from "@mui/material"
import type { ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function PageContainer({ children, maxWidth = "lg" }: PageContainerProps) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#141414", pt: 4, pb: 4 }}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  )
}
