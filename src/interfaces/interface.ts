export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface BrowseOptions {
  page?: number;
  language?: string;
  query?: string;
  timeWindow?: 'day' | 'week';
  mode?: 'discover' | 'trending';
  sortBy?: string;
  originalLang?: string;
  yearRange?: string;
  startYear?: string;
  endYear?: string;
  withGenres?: string;
  genres?: string;
  actor?: string;
  includeAdult?: boolean;
}
