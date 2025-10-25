import { TMDB, axiosClient } from '@plotwist_app/tmdb';

const token = process.env.TMDB_ACCESS_TOKEN!;
if (!token) {
  throw new Error('Missing TMDB_ACCESS_TOKEN in .env');
}

export const client = TMDB(token);
export const axios = axiosClient;

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface Show {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  first_air_date: string
  vote_average: number
  genre_ids: number[]
}

export interface Genre {
  id: number
  name: string
}
  // Get poster URL
export function getPosterUrl(posterPath: string | null, size: "w200" | "w500" | "w780" = "w500") {
  if (!posterPath) return "/abstract-movie-poster.png"
  return `https://image.tmdb.org/t/p/${size}${posterPath}`
}
