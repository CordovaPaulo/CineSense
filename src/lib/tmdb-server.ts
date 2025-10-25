const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = process.env.TMDB_BASE_URL

if (!TMDB_API_KEY) {
  console.warn("TMDB_API_KEY environment variable is not set")
}

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface Show {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  first_air_date: string
  vote_average: number
  genre_ids: number[]
}

// Fetch popular movies
export async function getPopularMovies(page = 1) {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) throw new Error("Failed to fetch movies")
    const data = await response.json()
    return data.results as Movie[]
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    return []
  }
}

// Search movies
export async function searchMovies(query: string, page = 1) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`,
      { next: { revalidate: 3600 } },
    )
    if (!response.ok) throw new Error("Failed to search movies")
    const data = await response.json()
    return data.results as Movie[]
  } catch (error) {
    console.error("Error searching movies:", error)
    return []
  }
}

// Fetch popular TV shows
export async function getPopularShows(page = 1) {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) throw new Error("Failed to fetch shows")
    const data = await response.json()
    return data.results as Show[]
  } catch (error) {
    console.error("Error fetching popular shows:", error)
    return []
  }
}

// Search TV shows
export async function searchShows(query: string, page = 1) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`,
      { next: { revalidate: 3600 } },
    )
    if (!response.ok) throw new Error("Failed to search shows")
    const data = await response.json()
    return data.results as Show[]
  } catch (error) {
    console.error("Error searching shows:", error)
    return []
  }
}
