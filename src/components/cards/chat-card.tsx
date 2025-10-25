"use client"

import { Card, CardMedia, CardContent, Typography, Box, Rating } from "@mui/material"

interface ChatCardProps {
  title: string
  // accept null from API
  posterPath?: string | null
  rating?: number
  date?: number
  description?: string
}

    export function ChatCard({ title, posterPath, rating, date, description }: ChatCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333333",
        borderRadius: "0.5rem",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 24px rgba(168, 85, 247, 0.2)",
          borderColor: "#a855f7",
        },
      }}
    >
      {posterPath && (
        <CardMedia component="img" height="300" image={posterPath} alt={title} sx={{ objectFit: "cover" }} />
      )}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#f2f2f2" }}>
          {title}
        </Typography>
        {date !== undefined && (
          <Typography variant="body2" sx={{ color: "#a3a3a3", mb: 1 }}>
            {date}
          </Typography>
        )}
        {rating !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Rating value={rating / 2} readOnly size="small" />
            <Typography variant="body2" sx={{ color: "#a3a3a3" }}>
              {rating.toFixed(1)}
            </Typography>
          </Box>
        )}
        {description && (
          <Typography variant="body2" sx={{ color: "#a3a3a3", lineHeight: 1.5 }}>
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
