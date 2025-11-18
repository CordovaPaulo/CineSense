"use client"

import { Container } from "../atoms/Container"
import { Box } from "../atoms/Box"

interface PageLayoutProps {
  children: React.ReactNode
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

export function PageLayout({ children, maxWidth = "lg" }: PageLayoutProps) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ py: 4 }}>{children}</Box>
    </Container>
  )
}
