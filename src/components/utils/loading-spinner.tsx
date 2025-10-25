"use client"

import { Box, CircularProgress, Typography } from "@mui/material"

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        py: 8,
      }}
    >
      <CircularProgress sx={{ color: "#a855f7" }} />
      <Typography sx={{ color: "#a3a3a3" }}>{message}</Typography>
    </Box>
  )
}
