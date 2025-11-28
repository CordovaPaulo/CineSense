'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { Box, Container, Typography, Button } from "@mui/material";
import { FiltersPanel, PaginationControls } from "@/components/molecules";
import { buildMovieFilters } from "@/lib/filter-utils";
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


import React, { Suspense } from "react";
import ClientBrowseMovies from "./ClientBrowseMovies";

export default function Page() {
  return (
    <Suspense fallback={<div />}> 
      <ClientBrowseMovies />
    </Suspense>
  );
}
