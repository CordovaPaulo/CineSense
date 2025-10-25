'use client';

import { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import useBrowseList from "@/hooks/useBrowseList";
import { MovieCard } from "@/components/cards/movie-card";

interface Movie {
  id: number
  title: string
  poster_path: string | null
  overview: string
  release_date: string
  vote_average: number
}

export default function BrowseMovies() {
  const [searchQuery, setSearchQuery] = useState("")
  const { items: movies, loading, error } = useBrowseList<Movie>("movie", searchQuery)

  return (
    <Box sx={{ p: 4 }} className="min-h-screen bg-linear-to-b from-[#000000] via-[#0f0a0a] to-[#6e0a0a]">
      <Container maxWidth="lg">
        <Box className="flex items-center justify-between">
          <Typography variant="h2" color="secondary.main">Browse Movies</Typography>
          <Button variant="outlined" color="secondary" href="/browse/shows">Browse TV Shows</Button>
        </Box>

        <Box className="mt-6">
          <input
            className="w-full max-w-md rounded-md border border-border bg-transparent px-3 py-2 text-white outline-none"
            placeholder="Search movies…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {loading && <Typography sx={{ mt: 4 }}>Loading…</Typography>}
        {error && <Typography sx={{ mt: 4 }} color="error">Failed to load.</Typography>}
        {!loading && !error && movies.length === 0 && (
          <Typography sx={{ mt: 4 }} color="text.secondary">No movies found.</Typography>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </Container>
    </Box>
  )
}