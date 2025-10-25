import { NextResponse } from 'next/server';

const TMDB_BASE = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';

export async function GET(req: Request) {
  const authToken = process.env.TMDB_ACCESS_TOKEN;

  
}