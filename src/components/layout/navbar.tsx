"use client"

import { AppBar, Toolbar, Box, Button, Container } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#141414", borderBottom: "1px solid #333333" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffbd4c" }}>CineSense</Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              href="/"
              sx={{
                color: isActive("/") && !isActive("/browse") && !isActive("/chat") ? "#ffbd4c" : "#f2f2f2",
                textDecoration: "none",
                "&:hover": { color: "#ffbd4c" },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              href="/browse"
              sx={{
                color: isActive("/browse") ? "#ffbd4c" : "#f2f2f2",
                textDecoration: "none",
                "&:hover": { color: "#ffbd4c" },
              }}
            >
              Browse
            </Button>
            <Button
              component={Link}
              href="/chat"
              sx={{
                color: isActive("/chat") ? "#ffbd4c" : "#f2f2f2",
                textDecoration: "none",
                "&:hover": { color: "#ffbd4c" },
              }}
            >
              Chat
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
