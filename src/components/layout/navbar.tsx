"use client"

import { AppBar, Toolbar, Box, Button, Container, Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "transparent", background: "linear-gradient(180deg, #242424 90%, #B85252 400%, #FFBD4C 97%)" , borderBottom: "none"}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffbd4c", textShadow: '2px 2px 11.3px rgba(0, 0, 0, 0)'}}>CineSense</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
                component={Link}
                href="/"
                sx={{
                    color:
                      isActive("/") && !isActive("/browse") && !isActive("/chat")
                        ? "#ffbd4c"
                        : "#f2f2f2",
                    textDecoration: "none",
                    transition: "all .15s ease-in-out",
                    fontWeight: 700,
                    "&:hover": {
                      color: "#ffbd4c",
                      textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)", // 👈 glowing effect
                      cursor: "pointer",
                    },
                  }}
                >
                  Home
                </Typography>

            <Typography
                component={Link}
                href="/browse"
                sx={{
                  color: isActive("/browse") ? "#ffbd4c" : "#f2f2f2",
                  textDecoration: "none",
                  transition: "all 0.3s ease", // smooth fade and glow
                  fontWeight: 700,
                  "&:hover": {
                    color: "#ffbd4c",
                    textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)",
                    cursor: "pointer",
                  },
                }}
              >
                Browse
              </Typography>

              <Typography
                component={Link}
                href="/chat"
                sx={{
                  color: isActive("/chat") ? "#ffbd4c" : "#f2f2f2",
                  textDecoration: "none",
                  transition: "all 0.3s ease", // smooth fade and glow
                  fontWeight:700,
                  "&:hover": {
                    color: "#ffbd4c",
                    textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)",
                    cursor: "pointer",
                  },
                }}
              >
                Chat
              </Typography>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
