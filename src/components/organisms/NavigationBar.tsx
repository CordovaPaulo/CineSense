"use client"

import { Box } from "../atoms/Box"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Text"
import { AppBar, Toolbar } from "@mui/material"
import { NavLink } from "../molecules/NavLink"
import { usePathname } from "next/navigation"

export function NavigationBar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#141414", borderBottom: "1px solid #333333" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Heading sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffbd4c" }}>CineSense</Heading>
          <Box sx={{ display: "flex", gap: 2 }}>
            <NavLink href="/" isActive={isActive("/") && !isActive("/browse") && !isActive("/chat")}>
              Home
            </NavLink>
            <NavLink href="/browse" isActive={isActive("/browse")}>
              Browse
            </NavLink>
            <NavLink href="/chat" isActive={isActive("/chat")}>
              Chat
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
