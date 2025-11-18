"use client";
import { Box, keyframes } from "@mui/material";

const subtlePulse = keyframes`
  0% { background-position: 50% 0%; }
  50% { background-position: 10% 40%; } /* max red */
  100% { background-position: 70% 0%; } /* back to black */
`;


export default function LivelyGradient({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(to bottom, #000000, #B85252)`,
        backgroundSize: "200% 200%",
        animation: `${subtlePulse} 5s ease-in-out infinite`,
        borderRadius: 2,
        p: 4,
        color: "#fff",
      }}
    >
      {children}
    </Box>
  );
}
