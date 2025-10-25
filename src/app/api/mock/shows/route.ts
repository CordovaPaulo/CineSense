import { NextResponse } from "next/server"
import { MOCK_SHOWS } from "@/data/mock-shows"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const filtered = q
    ? MOCK_SHOWS.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.overview.toLowerCase().includes(q),
      )
    : MOCK_SHOWS

  return NextResponse.json(
    { success: true, data: filtered },
    { headers: { "Cache-Control": "no-store" } },
  )
}