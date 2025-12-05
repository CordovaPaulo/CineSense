import { TMDB, axiosClient } from '@plotwist_app/tmdb';
import type { Movie, TVShow, Genre } from '@/interfaces/interface';

const token = process.env.TMDB_ACCESS_TOKEN!;
if (!token) {
  throw new Error('Missing TMDB_ACCESS_TOKEN in .env');
}

export const client = TMDB(token);
export const axios = axiosClient;

type Show = TVShow;
  // Get poster URL
export function getPosterUrl(posterPath: string | null, size: "w200" | "w500" | "w780" = "w500") {
  if (!posterPath) return "/abstract-movie-poster.png"
  return `https://image.tmdb.org/t/p/${size}${posterPath}`
}
