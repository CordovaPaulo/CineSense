"use client"

import { Container as MuiContainer, type ContainerProps as MuiContainerProps } from "@mui/material"

export function Container({ children, ...props }: MuiContainerProps) {
  return <MuiContainer {...props}>{children}</MuiContainer>
}
