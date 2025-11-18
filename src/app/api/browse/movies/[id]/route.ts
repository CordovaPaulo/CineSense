import { NextResponse } from 'next/server';

const TMDB_BASE = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const authToken = process.env.TMDB_ACCESS_TOKEN;
  if (!authToken) {
    return NextResponse.json({ error: 'Missing TMDB_ACCESS_TOKEN' }, { status: 500 });
  }

  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'Missing movie ID' }, { status: 400 });
  }

  const response = await fetch(`${TMDB_BASE}/movie/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch movie' }, { status: 500 });
  }

  const movie = await response.json();
  return NextResponse.json(movie);
}