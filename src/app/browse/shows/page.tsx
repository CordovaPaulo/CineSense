"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useBrowseList from "@/hooks/useBrowseList";
import { ShowCard } from "@/components/cards/show-card";

interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
}

export default function BrowseTVShows() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [episodes, setEpisodes] = useState("");

  const { items: tvShows, loading, error } = useBrowseList<TVShow>(
    "tv",
    searchQuery
  );

  // Handlers
  const handleGenreChange = (event: any) => setGenre(event.target.value);
  const handleYearChange = (event: any) => setYear(event.target.value);
  const handleEpisodesChange = (event: any) => setEpisodes(event.target.value);

  // Dropdown Data
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];

  // 🎞️ Episode ranges instead of duration
  const episodeRanges = [
    "1 – 15 episodes",
    "16 – 30 episodes",
    "31 – 50 episodes",
    "51+ episodes",
  ];

  // 📅 Year dropdown (descending 2025 → 2000)
  const years = Array.from({ length: 26 }, (_, i) => 2025 - i);

  return (
    <Box
      sx={{ p: 4 }}
      className="min-h-screen bg-gradient-to-b from-[#000000] via-[#0f0a0a] to-[#6e0a0a]"
    >
      <Container maxWidth="lg">
        {/* 🔹 Header with Dropdowns + Button */}
        <Box className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Typography variant="h2" color="secondary.main">
            Browse TV Shows
          </Typography>

          <Box className="flex flex-wrap items-center gap-4">
            {/* 🎞️ Genre Dropdown */}
            <FormControl
              size="small"
              sx={{
                minWidth: 160,
                "&:hover": {
                  filter: "drop-shadow(0 0 8px rgba(255, 82, 82, 0.8))",
                },
              }}
              color="secondary"
            >
              <InputLabel id="genre-select-label" color="secondary">
                Genre
              </InputLabel>
              <Select
                labelId="genre-select-label"
                id="genre-select"
                value={genre}
                label="Genre"
                onChange={handleGenreChange}
                sx={{
                  color: "secondary.main",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select Genre</em>
                </MenuItem>
                {genres.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 📅 Year Dropdown */}
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
                "&:hover": {
                  filter: "drop-shadow(0 0 8px rgba(255, 82, 82, 0.8))",
                },
              }}
              color="secondary"
            >
              <InputLabel id="year-select-label" color="secondary">
                Year
              </InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={year}
                label="Year"
                onChange={handleYearChange}
                sx={{
                  color: "secondary.main",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select Year</em>
                </MenuItem>
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 📺 Number of Episodes Dropdown */}
            <FormControl
              size="small"
              sx={{
                minWidth: 180,
                "&:hover": {
                  filter: "drop-shadow(0 0 8px rgba(255, 82, 82, 0.8))",
                },
              }}
              color="secondary"
            >
              <InputLabel id="episodes-select-label" color="secondary">
                Episodes
              </InputLabel>
              <Select
                labelId="episodes-select-label"
                id="episodes-select"
                value={episodes}
                label="Episodes"
                onChange={handleEpisodesChange}
                sx={{
                  color: "secondary.main",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select Range</em>
                </MenuItem>
                {episodeRanges.map((range) => (
                  <MenuItem key={range} value={range}>
                    {range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 🎬 Browse Movies Button */}
            <Button
              variant="outlined"
              color="secondary"
              href="/browse/movies"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 0 12px rgba(255, 82, 82, 0.8)",
                  borderColor: "secondary.main",
                },
              }}
            >
              Browse Movies
            </Button>
          </Box>
        </Box>

        {/* 🔍 Search Bar */}
        <Box className="mt-6">
          <input
            className="w-full max-w-md rounded-md border border-border bg-transparent px-3 py-2 text-white outline-none"
            placeholder="Search TV shows…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/* 🔄 Loading & Error States */}
        {loading && <Typography sx={{ mt: 4 }}>Loading…</Typography>}
        {error && (
          <Typography sx={{ mt: 4 }} color="error">
            Failed to load.
          </Typography>
        )}

        {/* 🎥 TV Shows Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tvShows.map((s) => (
            <ShowCard key={s.id} show={s} />
          ))}
        </div>
      </Container>
    </Box>
  );
}
