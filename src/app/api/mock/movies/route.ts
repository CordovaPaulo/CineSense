import { NextResponse } from "next/server"
import { MOCK_MOVIES } from "@/data/mock-movies"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const filtered = q
    ? MOCK_MOVIES.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.overview.toLowerCase().includes(q),
      )
    : MOCK_MOVIES

  return NextResponse.json(
    { success: true, data: filtered },
    { headers: { "Cache-Control": "no-store" } },
  )
}