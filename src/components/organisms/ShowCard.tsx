"use client"

import { useState } from "react"
import { Box } from "../atoms/Box"
import { Card, CardContent, CardMedia } from "../atoms/Card"
import { Button } from "../atoms/Button"
import { Heading, BodyText } from "../atoms/Text"
import { Spinner } from "../atoms/Spinner"
import { Dialog, DialogTitle, DialogContent } from "../atoms/Dialog"
import { IconButton } from "../atoms/IconButton"
import { CloseIcon, TvIcon } from "../atoms/Icon"
import { RatingDisplay } from "../molecules/RatingDisplay"
import type { TVShow as ShowDetail } from "@/interfaces/interface"
import type { TVShow, ShowCardProps } from '@/interfaces/interface'
import FullShowCard from "@/components/cards/full-show-card"
import { fetchTVShowById } from "@/services/tmdb-service"

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p"

type TmdbShow = {
  id: number
  name: string
  overview?: string
  poster_path?: string | null
  vote_average?: number
  first_air_date?: string
}

export function ShowCard({
  title,
  posterPath,
  rating,
  releaseYear,
  description,
  show,
  onClick,
  imageSize = "w342",
}: ShowCardProps) {
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [details, setDetails] = useState<ShowDetail | null>(null)
  const [open, setOpen] = useState(false)

  const t = title ?? show?.name
  const r = rating ?? show?.vote_average
  const y = releaseYear ?? (show?.first_air_date ? new Date(show.first_air_date).getFullYear() : undefined)
  const poster = posterPath ?? (show?.poster_path ? `${IMG_BASE}/${imageSize}${show.poster_path}` : undefined)
  const desc = description ?? show?.overview

  async function handleSeeMore(e?: React.MouseEvent) {
    e?.stopPropagation()
    const id = show?.id
    if (!id) return
    if (details) {
      setOpen(true)
      return
    }
    setLoadingDetails(true)
    try {
      const d = await fetchTVShowById(id)
      setDetails(d)
      setOpen(true)
    } finally {
      setLoadingDetails(false)
    }
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <Card
        onClick={onClick}
        sx={{
          transition: "all 0.25s ease",
          cursor: onClick ? "pointer" : "default",
          "&:hover": {
            transform: onClick ? "translateY(-6px)" : "none",
            borderColor: onClick ? "#a855f7" : "#333333",
            boxShadow: onClick ? "0 10px 22px rgba(168,85,247,0.18)" : "none",
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
            <TvIcon sx={{ color: "#a855f7" }} />
          </Box>
        )}
        <CardContent>
          <Heading sx={{ mb: 0.5 }}>{t ?? "Untitled"}</Heading>
          {y !== undefined && <BodyText sx={{ mb: 1 }}>{y}</BodyText>}
          {r !== undefined && (
            <Box sx={{ mb: 1 }}>
              <RatingDisplay rating={r} />
            </Box>
          )}
          {desc && (
            <BodyText sx={{ lineHeight: 1.5, mb: 2 }}>
              {desc.length > 100 ? `${desc.substring(0, 100)}…` : desc}
            </BodyText>
          )}

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleSeeMore}
              aria-expanded={Boolean(open)}
              aria-controls={details ? `show-full-${show?.id}` : undefined}
            >
              See more
            </Button>
            {loadingDetails && <Spinner size={20} />}
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {details?.name ?? "Loading..."}
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers id={details ? `show-full-${details.id}` : undefined}>
          {details ? <FullShowCard show={details} /> : <Box sx={{ p: 4, textAlign: "center" }}>Loading…</Box>}
        </DialogContent>
      </Dialog>
    </>
  )
}
