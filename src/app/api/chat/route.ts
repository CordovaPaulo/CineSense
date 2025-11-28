import { NextResponse } from 'next/server';
import { parseContents } from '@/services/gemini';
import { searchMovies, searchShows } from '@/lib/tmdb-server';

const TMDB_BASE = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';
const TMDB_TOKEN = process.env.TMDB_ACCESS_TOKEN;

async function fetchMovieDetails(id: number) {
  const res = await fetch(`${TMDB_BASE}/movie/${id}`, {
    headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchShowDetails(id: number) {
  const res = await fetch(`${TMDB_BASE}/tv/${id}`, {
    headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = body?.message ?? '';
    const history: Array<{ role: string; content: string }> = Array.isArray(body?.history)
      ? body.history.map((h: any) => ({ role: String(h.role), content: String(h.content) }))
      : [];

    if (!message.trim()) {
      return NextResponse.json({ error: 'Empty message' }, { status: 400 });
    }

    // Build a clear prompt asking for a JSON response with recommendations
    const systemIntro = `You are CineSense, an assistant that recommends movies and TV shows based on user preferences. Respond in JSON only with the shape: { greeting?: string, recommendations: [{ title: string, type: "Movie" | "TV Show", reason?: string }] }`;
    const convoLines = history
      .map((h) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`)
      .join('\n');
    const prompt = [systemIntro, convoLines, `User: ${message}`, 'Assistant:'].filter(Boolean).join('\n\n');

    // Ask Gemini for a structured JSON reply using response schema
    const schema = {
      type: 'object',
      properties: {
        greeting: { type: 'string' },
        recommendations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              type: { type: 'string' },
              reason: { type: 'string' },
            },
            required: ['title', 'type'],
          },
        },
      },
    };

    const result: any = await parseContents(prompt, schema);

    // Normalize: expect { greeting?, recommendations: [{title,type,reason?}] }
    const greeting = result?.greeting ? String(result.greeting) : undefined;
    const recs = Array.isArray(result?.recommendations) ? result.recommendations : [];

    // For each recommendation, try to resolve a TMDB full detail where possible
    const resolved: Array<any> = [];

    for (const r of recs) {
      const title = (r.title ?? '').trim();
      const type = (r.type ?? '').toLowerCase();
      const reason = r.reason ? String(r.reason) : undefined;
      if (!title) continue;

      try {
        if (type.includes('movie')) {
          const results = await searchMovies(title, 1);
          const match = results?.[0];
          if (match?.id) {
            const full = await fetchMovieDetails(match.id);
            resolved.push({ type: 'movie', reason, item: full ?? { title } });
            continue;
          }
        } else if (type.includes('tv') || type.includes('show')) {
          const results = await searchShows(title, 1);
          const match = results?.[0];
          if (match?.id) {
            const full = await fetchShowDetails(match.id);
            resolved.push({ type: 'tv', reason, item: full ?? { title } });
            continue;
          }
        }
      } catch (e) {
        // fall through to push minimal info
      }

      // fallback: push minimal record with title + reason
      resolved.push({ type: type.includes('tv') ? 'tv' : 'movie', reason, item: { title } });
    }

    return NextResponse.json({ greeting, recommendations: resolved });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
