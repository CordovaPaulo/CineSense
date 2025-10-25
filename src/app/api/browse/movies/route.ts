import { NextResponse } from 'next/server';

const TMDB_BASE = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';

export async function GET(req: Request) {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Missing TMDB_ACCESS_TOKEN' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);

  // Shared inputs
  const page = searchParams.get('page') ?? '1';
  const language = searchParams.get('language') ?? 'en-US';

  // Discover-only filters (optional)
  const originalLang = searchParams.get('originalLang') ?? undefined; // e.g., "en", "ja"
  const sortBy = searchParams.get('sort_by') ?? 'popularity.desc';
  const includeAdult = searchParams.get('include_adult') ?? 'false';
  const yearRange = searchParams.get('year_range');
  const startYear = searchParams.get('startYear');
  const endYear = searchParams.get('endYear');
  const withGenresIds = searchParams.get('with_genres'); // "28,35"
  const genresByName = searchParams.get('genres');       // "Action,Comedy"
  const actorName = searchParams.get('actor');           // Name to resolve to with_cast

  // Trending controls
  const timeWindow = (searchParams.get('timeWindow') ?? 'day').toLowerCase(); // day|week

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json;charset=utf-8',
  };

  // If any discover-relevant filter exists (or mode=discover), use discover; else trending.
  const explicitDiscover = searchParams.get('mode') === 'discover';
  const hasDiscoverFilters = [
    'with_genres',
    'genres',
    'actor',
    'year_range',
    'startYear',
    'endYear',
    'originalLang',
    // only treat sort_by as filter if caller explicitly set it
    searchParams.has('sort_by') ? 'sort_by' : '',
  ].some((k) => k && searchParams.has(k));

  if (!explicitDiscover && !hasDiscoverFilters) {
    // Trending movies default for browse page
    const url = `${TMDB_BASE}/trending/movie/${['day','week'].includes(timeWindow) ? timeWindow : 'day'}?language=${encodeURIComponent(language)}&page=${encodeURIComponent(page)}`;
    try {
      const res = await fetch(url, { headers, next: { revalidate: 60 } });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        return NextResponse.json({ error: 'TMDB trending failed', status: res.status, details: text }, { status: res.status || 500 });
      }
      const data = await res.json();
      return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } });
    } catch (e: any) {
      return NextResponse.json({ error: 'TMDB request error', details: String(e) }, { status: 500 });
    }
  }

  // --- Discover path ---
  async function mapGenres(namesCsv: string): Promise<string | undefined> {
    try {
      const { genres } = await fetch(`${TMDB_BASE}/genre/movie/list?language=en`, {
        headers, next: { revalidate: 60 * 60 * 24 },
      }).then(r => r.json() as Promise<{ genres: { id: number; name: string }[] }>);
      const nameSet = new Set(
        namesCsv.split(',').map(s => s.trim().toLowerCase().replace(/\s+/g, ' '))
          .filter(Boolean)
      );
      const ids = genres.filter(g => nameSet.has(g.name.toLowerCase()))
        .map(g => g.id);
      return ids.length ? ids.join(',') : undefined;
    } catch {
      return undefined;
    }
  }

  async function getPersonId(name: string): Promise<number | undefined> {
    if (!name?.trim()) return;
    try {
      const data = await fetch(
        `${TMDB_BASE}/search/person?query=${encodeURIComponent(name)}&include_adult=false&language=${encodeURIComponent(language)}&page=1`,
        { headers, next: { revalidate: 60 * 60 } }
      ).then(r => r.json() as Promise<{ results?: { id: number }[] }>);
      return data.results?.[0]?.id;
    } catch {
      return undefined;
    }
  }

  const params = new URLSearchParams();
  params.set('page', page);
  params.set('language', language);
  params.set('sort_by', sortBy);
  params.set('include_adult', includeAdult);
  if (originalLang) params.set('with_original_language', originalLang);

  const [yrStart, yrEnd] = yearRange
    ? yearRange.split(',').map(s => s.trim())
    : [startYear ?? undefined, endYear ?? undefined];
  if (yrStart) params.set('primary_release_date.gte', `${yrStart}-01-01`);
  if (yrEnd) params.set('primary_release_date.lte', `${yrEnd}-12-31`);

  let genreIds = withGenresIds || undefined;
  if (!genreIds && genresByName) genreIds = await mapGenres(genresByName);
  if (genreIds) params.set('with_genres', genreIds);

  if (actorName) {
    const personId = await getPersonId(actorName);
    if (personId) params.set('with_cast', String(personId));
  }

  const url = `${TMDB_BASE}/discover/movie?${params.toString()}`;
  try {
    const res = await fetch(url, { headers, next: { revalidate: 60 } });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json({ error: 'TMDB discover failed', status: res.status, details: text }, { status: res.status || 500 });
    }
    const data = await res.json();
    return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } });
  } catch (e: any) {
    return NextResponse.json({ error: 'TMDB request error', details: String(e) }, { status: 500 });
  }
}