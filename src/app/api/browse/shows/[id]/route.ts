import { NextResponse } from 'next/server';

const TMDB_BASE = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const authToken = process.env.TMDB_ACCESS_TOKEN;
  if (!authToken) {
    return NextResponse.json({ error: 'Missing TMDB_ACCESS_TOKEN' }, { status: 500 });
  }

  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'Missing show ID' }, { status: 400 });
  }

  const response = await fetch(`${TMDB_BASE}/tv/${id}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch show' }, { status: 500 });
  }

  const show = await response.json();
  return NextResponse.json(show);
}