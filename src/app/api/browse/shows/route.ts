import { NextResponse } from 'next/server';

const TMDB_BASE = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';

export async function GET(req: Request) {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Missing TMDB_ACCESS_TOKEN' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') ?? '1';
  const language = searchParams.get('language') ?? 'en-US';
  const timeWindow = (searchParams.get('timeWindow') ?? 'day').toLowerCase(); // day|week
  const q = searchParams.get('q')?.trim();
  const explicitDiscover = searchParams.get('mode') === 'discover';

  // Optional discover filters
  const sortBy = searchParams.get('sort_by') ?? 'popularity.desc';
  const originalLang = searchParams.get('originalLang') ?? undefined; // "en", "ja", ...
  const yearRange = searchParams.get('year_range'); // "2010,2020"
  const startYear = searchParams.get('startYear');
  const endYear = searchParams.get('endYear');
  const withGenresIds = searchParams.get('with_genres'); // "18,35"
  const genresByName = searchParams.get('genres');       // "Drama,Comedy"
  const actorName = searchParams.get('actor');           // person name -> with_people

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json;charset=utf-8',
  };

  // Decide mode: search > discover > trending
  if (q) {
    // Search TV shows
    const url = `${TMDB_BASE}/search/tv?query=${encodeURIComponent(q)}&language=${encodeURIComponent(language)}&page=${encodeURIComponent(page)}&include_adult=false`;
    try {
      const res = await fetch(url, { headers, next: { revalidate: 30 } });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        return NextResponse.json({ error: 'TMDB search tv failed', status: res.status, details: text }, { status: res.status || 500 });
      }
      const data = await res.json();
      return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=300' } });
    } catch (e: any) {
      return NextResponse.json({ error: 'TMDB request error', details: String(e) }, { status: 500 });
    }
  }

  const hasDiscoverFilters = [
    'with_genres','genres','actor','year_range','startYear','endYear','originalLang',
    searchParams.has('sort_by') ? 'sort_by' : '',
  ].some((k) => k && searchParams.has(k));

  if (explicitDiscover || hasDiscoverFilters) {
    async function mapGenres(namesCsv: string): Promise<string | undefined> {
      try {
        const { genres } = await fetch(`${TMDB_BASE}/genre/tv/list?language=en`, {
          headers, next: { revalidate: 60 * 60 * 24 },
        }).then(r => r.json() as Promise<{ genres: { id: number; name: string }[] }>);
        const nameSet = new Set(
          namesCsv.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
        );
        const ids = genres.filter(g => nameSet.has(g.name.toLowerCase())).map(g => g.id);
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
    if (originalLang) params.set('with_original_language', originalLang);

    const [yrStart, yrEnd] = yearRange
      ? yearRange.split(',').map(s => s.trim())
      : [startYear ?? undefined, endYear ?? undefined];
    if (yrStart) params.set('first_air_date.gte', `${yrStart}-01-01`);
    if (yrEnd) params.set('first_air_date.lte', `${yrEnd}-12-31`);

    let genreIds = withGenresIds || undefined;
    if (!genreIds && genresByName) genreIds = await mapGenres(genresByName);
    if (genreIds) params.set('with_genres', genreIds);

    if (actorName) {
      const personId = await getPersonId(actorName);
      // with_people works for discover across media; TMDB supports it on discover/tv
      if (personId) params.set('with_people', String(personId));
    }

    const url = `${TMDB_BASE}/discover/tv?${params.toString()}`;
    try {
      const res = await fetch(url, { headers, next: { revalidate: 60 } });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        return NextResponse.json({ error: 'TMDB discover tv failed', status: res.status, details: text }, { status: res.status || 500 });
      }
      const data = await res.json();
      return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } });
    } catch (e: any) {
      return NextResponse.json({ error: 'TMDB request error', details: String(e) }, { status: 500 });
    }
  }

  // Default: trending TV
  const url = `${TMDB_BASE}/trending/tv/${['day','week'].includes(timeWindow) ? timeWindow : 'day'}?language=${encodeURIComponent(language)}&page=${encodeURIComponent(page)}`;
  try {
    const res = await fetch(url, { headers, next: { revalidate: 60 } });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return NextResponse.json({ error: 'TMDB trending tv failed', status: res.status, details: text }, { status: res.status || 500 });
    }
    const data = await res.json();
    return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } });
  } catch (e: any) {
    return NextResponse.json({ error: 'TMDB request error', details: String(e) }, { status: 500 });
  }
}