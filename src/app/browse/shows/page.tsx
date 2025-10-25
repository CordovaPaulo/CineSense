'use client';

import { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import useBrowseList from "@/hooks/useBrowseList";
import { ShowCard } from "@/components/cards/show-card";

interface TVShow {
  id: number
  name: string
  poster_path: string | null
  overview: string
  first_air_date: string
  vote_average: number
}

export default function BrowseTVShows() {
  const [searchQuery, setSearchQuery] = useState("")
  const { items: tvShows, loading, error } = useBrowseList<TVShow>("tv", searchQuery)

  return (
    <Box sx={{ p: 4 }} className="min-h-screen bg-linear-to-b from-[#000000] via-[#0f0a0a] to-[#6e0a0a]">
      <Container maxWidth="lg">
        <Box className="flex items-center justify-between">
          <Typography variant="h2" color="secondary.main">Browse TV Shows</Typography>
          <Button variant="outlined" color="secondary" href="/browse/movies">Browse Movies</Button>
        </Box>

        <Box className="mt-6">
          <input
            className="w-full max-w-md rounded-md border border-border bg-transparent px-3 py-2 text-white outline-none"
            placeholder="Search TV shows…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {loading && <Typography sx={{ mt: 4 }}>Loading…</Typography>}
        {error && <Typography sx={{ mt: 4 }} color="error">Failed to load.</Typography>}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tvShows.map((s) => (
            <ShowCard key={s.id} show={s} />
          ))}
        </div>
      </Container>
    </Box>
  )
}