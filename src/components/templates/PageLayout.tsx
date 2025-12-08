"use client"

import { Container } from "../atoms/Container"
import { Box } from "../atoms/Box"
import type { PageLayoutProps } from '@/interfaces/interface'

export function PageLayout({ children, maxWidth = "lg" }: PageLayoutProps) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ py: 4 }}>{children}</Box>
    </Container>
  )
}
