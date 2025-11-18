"use client"

import { TextField, type TextFieldProps } from "@mui/material"

export function Input({ sx, ...props }: TextFieldProps) {
  return (
    <TextField
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#1e1e1e",
          borderColor: "#333333",
          color: "#f2f2f2",
          "&:hover fieldset": {
            borderColor: "#ffbd4c",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ffbd4c",
          },
        },
        "& .MuiOutlinedInput-input::placeholder": {
          color: "#a3a3a3",
          opacity: 1,
        },
        ...sx,
      }}
      {...props}
    />
  )
}
