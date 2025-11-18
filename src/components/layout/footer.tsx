"use client"

import { Box, Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { keyframes } from "@mui/system"; // <-- import keyframes her"


const fadeSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;


export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#2B2B2B", // dark gray background
        py: 2, // vertical padding
        textAlign: "center",
        borderTop: "1px solid #3A3A3A", // subtle top border
        animation: `${fadeSlideUp} 1s ease-in-out forwards`,
      }}
    >
      <Typography
        sx={{
          color: "#FFBD4C", // gold/yellow text
          fontWeight: 600,
          fontSize: "1rem",
          textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)"
        }}
      >
        CineSense © {new Date().getFullYear()} | BSIT 3A
      </Typography>
    </Box>
  );
}