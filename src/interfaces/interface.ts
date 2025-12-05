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

export interface Genre {
  id: number;
  name: string;
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

// Chat / assistant interfaces
export interface ChatRecommendation {
  type: 'movie' | 'tv';
  reason?: string;
  item: any; // Ideally a Movie or TVShow detail object when available
}

export interface ChatResponse {
  greeting?: string;
  recommendations?: ChatRecommendation[];
  reply?: string;
}
