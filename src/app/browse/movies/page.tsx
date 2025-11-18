'use client';

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
import { keyframes } from "@mui/system"; // <-- import keyframes her"
import { MovieCard } from "@/components/cards/movie-card";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

const fadeSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeSlideUp2 = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;


export default function BrowseMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const { items: movies, loading, error } = useBrowseList<Movie>("movie", searchQuery);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");

  const handleGenreChange = (event: any) => setGenre(event.target.value);
  const handleYearChange = (event: any) => setYear(event.target.value);
  const handleDurationChange = (event: any) => setDuration(event.target.value);

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

  const durations = [
    "30min - 1hr",
    "1hr - 1.5hrs",
    "1.5hrs - 2hrs",
    "2hrs - 3hrs",
  ];

  const years = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => 1980 + i).reverse();

  return (
    <Box
      className="min-h-[70vh] w-full flex items-center justify-center rounded-2xl p-4 text-white bg-gradient-to-b from-black to-[#B85252]"
      sx={{ p: 4 }}
      style={{
        backgroundSize: "200% 200%",
        animation: "pulse 5s ease-in-out infinite",
        backgroundPosition: "50% 0%",
      }}
    >
      <style>
        {`
          @keyframes pulse {
            0% { background-position: 50% 0%; }
            50% { background-position: 10% 50%; }
            100% { background-position: 50% 0%; }
          }
        `}
      </style>

      <Container maxWidth="lg" sx={{animation: `${fadeSlideUp} 1s ease-in-out forwards`,}}>
        {/* 🔹 Header with Dropdowns and Button */}
        <Box className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Typography variant="h2" color="secondary.main">
            Browse Movies
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
              <InputLabel id="movie-genre-select-label" color="secondary">
                Genre
              </InputLabel>
              <Select
                labelId="movie-genre-select-label"
                id="movie-genre-select"
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
                minWidth: 120,
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

            {/* ⏱️ Duration Dropdown */}
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
              <InputLabel id="duration-select-label" color="secondary">
                Duration
              </InputLabel>
              <Select
                labelId="duration-select-label"
                id="duration-select"
                value={duration}
                label="Duration"
                onChange={handleDurationChange}
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
                  <em>Select Duration</em>
                </MenuItem>
                {durations.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 🎥 Browse TV Shows Button */}
            <Button
              variant="outlined"
              color="secondary"
              href="/browse/shows"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 0 12px rgba(255, 82, 82, 0.8)",
                  borderColor: "secondary.main",
                },
              }}
            >
              Browse TV Shows
            </Button>
          </Box>
        </Box>

        {/* 🔍 Search Bar */}
        <Box className="mt-6">
          <input
            className="w-full max-w-md rounded-md border border-border bg-transparent px-3 py-2 text-white outline-none"
            placeholder="Search movies…"
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
        {!loading && !error && movies.length === 0 && (
          <Typography sx={{ mt: 4 }} color="text.secondary">
            No movies found.
          </Typography>
        )}

        {/* 🎬 Movie Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((m) => (
          
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </Container>
    </Box>
  );
}
