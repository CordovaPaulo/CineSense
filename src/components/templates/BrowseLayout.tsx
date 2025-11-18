"use client"

import { Box } from "../atoms/Box"
import { Heading } from "../atoms/Text"
import { Grid } from "../atoms/Grid"

interface BrowseLayoutProps {
  title: string
  children: React.ReactNode
  headerActions?: React.ReactNode
}

export function BrowseLayout({ title, children, headerActions }: BrowseLayoutProps) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Heading variant="h4" sx={{ color: "#ffbd4c" }}>
          {title}
        </Heading>
        {headerActions}
      </Box>
      <Grid container spacing={3}>
        {children}
      </Grid>
    </Box>
  )
}
