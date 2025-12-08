"use client"

import Link from "next/link"
import { Button } from "../atoms/Button"
import type { NavLinkProps } from '@/interfaces/interface'

export function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Button
      component={Link}
      href={href}
      sx={{
        color: isActive ? "#ffbd4c" : "#f2f2f2",
        textDecoration: "none",
        "&:hover": { color: "#ffbd4c" },
      }}
    >
      {children}
    </Button>
  )
}
