import { NextResponse } from "next/server";
import { parseContents } from "@/services/gemini";

export async function POST(req: Request) {
  const { message } = await req.json();
  const year = new Date().getFullYear();

  const schema = {
    type: "OBJECT",
    properties: {
      genre: { type: "ARRAY", items: { type: "STRING" } },
      actor: { type: "STRING", nullable: true },
      year_range: {
        type: "ARRAY",
        items: { type: "INTEGER" },
        minItems: 2,
        maxItems: 2,
      },
      language: { type: "STRING" },
      query_type: { type: "STRING", enum: ["search_movies", "search_tv"] },
    },
    required: ["genre", "year_range", "language", "query_type"],
  } as const;

  const prompt = `
You extract search parameters for The Movie Database (TMDB).
Return ONLY strict JSON matching the schema. No prose, no code fences.

Rules:
- query_type: "search_tv" if the request mentions TV/series/episodes/seasons; otherwise "search_movies".
- genre: up to 3 concise genres present or clearly implied by mood words (e.g., "feel good" → "Feel-good"). Deduplicate. Can be empty [] if none.
- actor: a single person name if explicitly requested; otherwise null.
- year_range: [start, end] as integers. If not specified, use [${year}, ${year}].
- language: spoken language name; default "English".
- Do not invent facts; prefer what the user said.

User: ${message}
`;

  try {
    const data = await parseContents(prompt, schema);
    return NextResponse.json({ recommendationParams: data });
  } catch (err) {
    console.error("Error parsing contents:", err);
    return NextResponse.json(
      { error: "Failed to parse contents" },
      { status: 500 }
    );
  }
}