"use client"

import { Box, Avatar, Typography, Link as MuiLink } from "@mui/material"
import type { CompanyTileProps } from '@/interfaces/interface'

export function CompanyTile({ name, logoUrl, href, sx }: CompanyTileProps) {
  const content = (
    <Box
      component="div"
      role={href ? 'link' : undefined}
      tabIndex={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        p: 1.25,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.06)",
        minHeight: 56,
        overflow: "hidden",
        transition: 'transform 160ms ease, box-shadow 160ms ease, background-color 120ms ease',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', bgcolor: 'rgba(255,255,255,0.05)' },
        '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 2 },
        ...sx,
      }}
    >
      {logoUrl ? (
        <Box
          component="img"
          src={logoUrl}
          alt={name}
          loading="lazy"
          sx={{ width: 72, height: 36, objectFit: "contain", flexShrink: 0, backgroundColor: 'transparent' }}
        />
      ) : (
        <Avatar sx={{ width: 40, height: 40, fontSize: 14 }}>{(name || "?").charAt(0)}</Avatar>
      )}

      <Typography variant="body2" noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis", fontWeight: 600, color: 'text.primary' }} title={name}>
        {name}
      </Typography>
    </Box>
  )

  if (href) {
    return (
      <MuiLink href={href} target="_blank" rel="noopener noreferrer" underline="none" sx={{ display: 'block' }}>
        {content}
      </MuiLink>
    )
  }

  return content
}

export default CompanyTile
