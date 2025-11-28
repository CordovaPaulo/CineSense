"use client";

import { useState, useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { FiltersPanel, PaginationControls } from "@/components/molecules";
import { buildShowFilters } from "@/lib/filter-utils";
import useBrowseList from "@/hooks/useBrowseList";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
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
  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [episodes, setEpisodes] = useState("");
  const filters = buildShowFilters(genre, year, episodes);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const q = searchParams?.get("q") ?? "";
    const p = parseInt(searchParams?.get("page") ?? "1", 10) || 1;
    const g = searchParams?.get("genres") ?? "";
    const y = searchParams?.get("year") ?? "";
    const e = searchParams?.get("episodes") ?? "";
    setSearchQuery(q);
    setPage(p);
    setGenre(g);
    setYear(y);
    setEpisodes(e);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, genre, year, episodes]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (page && page > 1) params.set("page", String(page));
    if (genre) params.set("genres", genre);
    if (year) params.set("year", String(year));
    if (episodes) params.set("episodes", episodes);

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(url);
  }, [debouncedQuery, page, genre, year, episodes, pathname, router]);

  const { items: tvShows, loading, error, totalPages } = useBrowseList<TVShow>("tv", debouncedQuery, { page, filters });

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

  useEffect(() => {
    setPage(1);
  }, [searchQuery, genre, year, episodes]);

  return (
    <Box
      sx={{ p: 4 }}
      className="min-h-screen bg-linear-to-b from-[#000000] via-[#0f0a0a] to-[#6e0a0a]"
    >
      <Container maxWidth="lg">
        {/* 🔹 Header with Dropdowns + Button */}
        <Box className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Typography variant="h2" color="secondary.main">
            Browse TV Shows
          </Typography>

          <Box className="flex flex-wrap items-center gap-4">
            <FiltersPanel
              genre={genre}
              year={year}
              third={episodes}
              onGenreChange={handleGenreChange}
              onYearChange={handleYearChange}
              onThirdChange={handleEpisodesChange}
              genres={genres}
              years={years}
              thirdOptions={episodeRanges}
              thirdLabel="Episodes"
            />

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
