import type { Movie, TVShow, BrowseOptions, TMDBResponse } from '@/interfaces/interface';

export async function fetchMovies(options: BrowseOptions = {}, init?: RequestInit): Promise<TMDBResponse<Movie>> {
  const params = new URLSearchParams();
  
  if (options.page) params.set('page', String(options.page));
  if (options.language) params.set('language', options.language);
  if (options.query) params.set('q', options.query);
  if (options.timeWindow) params.set('timeWindow', options.timeWindow);
  if (options.mode) params.set('mode', options.mode);
  if (options.sortBy) params.set('sort_by', options.sortBy);
  if (options.originalLang) params.set('originalLang', options.originalLang);
  if (options.yearRange) params.set('year_range', options.yearRange);
  if (options.startYear) params.set('startYear', options.startYear);
  if (options.endYear) params.set('endYear', options.endYear);
  if (options.withGenres) params.set('with_genres', options.withGenres);
  if (options.genres) params.set('genres', options.genres);
  if (options.actor) params.set('actor', options.actor);
  if (options.includeAdult !== undefined) params.set('include_adult', String(options.includeAdult));

  const url = `/api/browse/movies?${params.toString()}`;
  const response = await fetch(url, { cache: 'no-store', ...init });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchTVShows(options: BrowseOptions = {}, init?: RequestInit): Promise<TMDBResponse<TVShow>> {
  const params = new URLSearchParams();
  
  if (options.page) params.set('page', String(options.page));
  if (options.language) params.set('language', options.language);
  if (options.query) params.set('q', options.query);
  if (options.timeWindow) params.set('timeWindow', options.timeWindow);
  if (options.mode) params.set('mode', options.mode);
  if (options.sortBy) params.set('sort_by', options.sortBy);
  if (options.originalLang) params.set('originalLang', options.originalLang);
  if (options.yearRange) params.set('year_range', options.yearRange);
  if (options.startYear) params.set('startYear', options.startYear);
  if (options.endYear) params.set('endYear', options.endYear);
  if (options.withGenres) params.set('with_genres', options.withGenres);
  if (options.genres) params.set('genres', options.genres);
  if (options.actor) params.set('actor', options.actor);

  const url = `/api/browse/shows?${params.toString()}`;
  const response = await fetch(url, { cache: 'no-store', ...init });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch TV shows: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch a single movie by ID
 */
export async function fetchMovieById(id: number, init?: RequestInit): Promise<Movie> {
  const response = await fetch(`/api/browse/movies/${id}`, { cache: 'no-store', ...init });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch movie ${id}: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch a single TV show by ID
 */
export async function fetchTVShowById(id: number, init?: RequestInit): Promise<TVShow> {
  const response = await fetch(`/api/browse/shows/${id}`, { cache: 'no-store', ...init });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch TV show ${id}: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}
