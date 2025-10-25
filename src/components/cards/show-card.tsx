"use client"

import { Card, CardMedia, CardContent, Typography, Box, Rating } from "@mui/material"
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded"

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p"

type TmdbShow = {
  id: number
  name: string
  overview?: string
  poster_path?: string | null
  vote_average?: number
  first_air_date?: string
}

interface ShowCardProps {
  // legacy props (optional)
  title?: string
  posterPath?: string | null
  rating?: number
  firstAirYear?: number | string
  description?: string

  // new: pass raw TMDB TV result
  show?: TmdbShow

  onClick?: () => void
  imageSize?: "w185" | "w342" | "w500"
}

export function ShowCard({
  title,
  posterPath,
  rating,
  firstAirYear,
  description,
  show,
  onClick,
  imageSize = "w342",
}: ShowCardProps) {
  const t = title ?? show?.name
  const r = rating ?? show?.vote_average
  const y =
    firstAirYear ??
    (show?.first_air_date ? new Date(show.first_air_date).getFullYear() : undefined)
  const poster =
    posterPath ??
    (show?.poster_path ? `${IMG_BASE}/${imageSize}${show.poster_path}` : undefined)
  const desc = description ?? show?.overview

  return (
    <Card
      onClick={onClick}
      sx={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333333",
        borderRadius: "0.5rem",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          transform: onClick ? "translateY(-8px)" : "none",
          boxShadow: onClick ? "0 12px 24px rgba(168, 85, 247, 0.2)" : "none",
          borderColor: onClick ? "#a855f7" : "#333333",
        },
      }}
    >
      {poster ? (
        <CardMedia component="img" height="300" image={poster} alt={t ?? "Show poster"} sx={{ objectFit: "cover" }} />
      ) : (
        <Box
          sx={{
            height: 300,
            display: "grid",
            placeItems: "center",
            backgroundColor: "#151515",
            borderBottom: "1px solid #333333",
          }}
        >
          <LiveTvRoundedIcon sx={{ color: "#a855f7" }} />
        </Box>
      )}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#f2f2f2" }}>
          {t ?? "Untitled"}
        </Typography>
        {y !== undefined && (
          <Typography variant="body2" sx={{ color: "#a3a3a3", mb: 1 }}>
            {y}
          </Typography>
        )}
        {r !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Rating value={(r ?? 0) / 2} readOnly size="small" />
            <Typography variant="body2" sx={{ color: "#a3a3a3" }}>
              {(r ?? 0).toFixed(1)}
            </Typography>
          </Box>
        )}
        {desc && (
          <Typography variant="body2" sx={{ color: "#a3a3a3", lineHeight: 1.5 }}>
            {desc.length > 100 ? `${desc.substring(0, 100)}…` : desc}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
