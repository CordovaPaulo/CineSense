"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { Box, Container, Typography, Button } from "@mui/material";
import { FiltersPanel, PaginationControls } from "@/components/molecules";
import { buildMovieFilters } from "@/lib/filter-utils";
import useBrowseList from "@/hooks/useBrowseList";
import { keyframes } from "@mui/system"; // keyframes for subtle animation
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

export default function ClientBrowseMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const filters = buildMovieFilters(genre, year, duration);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, genre, year, duration]);

  const { items: movies, loading, error, totalPages } = useBrowseList<Movie>("movie", debouncedQuery, { page, filters });

  const handleGenreChange = (event: any) => setGenre(event.target.value);
  const handleYearChange = (event: any) => setYear(event.target.value);
  const handleDurationChange = (event: any) => setDuration(event.target.value);

  useEffect(() => {
    const q = searchParams?.get("q") ?? "";
    const p = parseInt(searchParams?.get("page") ?? "1", 10) || 1;
    const g = searchParams?.get("genres") ?? "";
    const y = searchParams?.get("year") ?? "";
    const d = searchParams?.get("duration") ?? "";
    setSearchQuery(q);
    setPage(p);
    setGenre(g);
    setYear(y);
    setDuration(d);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (page && page > 1) params.set("page", String(page));
    if (genre) params.set("genres", genre);
    if (year) params.set("year", String(year));
    if (duration) params.set("duration", duration);

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(url);
  }, [debouncedQuery, page, genre, year, duration, pathname, router]);

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
      className="min-h-[70vh] w-full flex items-center justify-center rounded-2xl p-4 text-white bg-linear-to-b from-black to-[#B85252]"
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

      <Container maxWidth="lg" sx={{ animation: `${fadeSlideUp} 1s ease-in-out forwards` }}>
        {/* 🔹 Header with Dropdowns and Button */}
        <Box className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Typography variant="h2" color="secondary.main">
            Browse Movies
          </Typography>

          <Box className="flex flex-wrap items-center gap-4">
            <FiltersPanel
              genre={genre}
              year={year}
              third={duration}
              onGenreChange={handleGenreChange}
              onYearChange={handleYearChange}
              onThirdChange={handleDurationChange}
              genres={genres}
              years={years}
              thirdOptions={durations}
              thirdLabel="Duration"
            />

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

        <PaginationControls
          page={page}
          totalPages={totalPages}
          loading={loading}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => (totalPages ? Math.min(totalPages, p + 1) : p + 1))}
        />
      </Container>
    </Box>
  );
}
