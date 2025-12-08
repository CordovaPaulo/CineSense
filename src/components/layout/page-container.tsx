"use client"

import { Box } from "../atoms/Box"
import { Container } from "../atoms/Container"
import type { PageContainerProps } from '@/interfaces/interface'

export function PageContainer({ children, maxWidth = "lg" }: PageContainerProps) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#141414", pt: 4, pb: 4 }}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  )
}
