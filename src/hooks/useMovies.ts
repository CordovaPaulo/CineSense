import { useMemo } from 'react';
import {
  useInfiniteQuery,
  useQuery,
  QueryKey,
  keepPreviousData,
} from '@tanstack/react-query';
import { fetchMovies, fetchMovieById } from '@/services/tmdb-service';
import type { Movie, BrowseOptions, TMDBResponse } from '@/interfaces/interface';

const moviesKey = (opts: BrowseOptions): QueryKey => ['movies', opts];
const movieKey = (id: number | null): QueryKey => ['movie', id];

export interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalResults: number;
  refetch: () => void;
  loadMore: () => void;
  hasMore: boolean;
  isFetchingNext: boolean;
}

export function useMovies(options: BrowseOptions = {}): UseMoviesResult {
  const {
    data,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TMDBResponse<Movie>, Error, TMDBResponse<Movie>, QueryKey, number>({
    queryKey: moviesKey(options),
    queryFn: ({ pageParam }) => fetchMovies({ ...options, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 60_000,
    gcTime: 60 * 60 * 1000,
  });

  const aggregate = useMemo(() => {
    // useInfiniteQuery returns a data object with a pages array
    // but our generic type TMDBResponse<Movie> represents each page item
    // so we need to cast the data structure to access pages safely.
    // When data is undefined we return empty aggregate.
    // Type narrowing here keeps Movie[] typed.
    const infinite = data as any;
    if (!infinite || !infinite.pages) {
      return { movies: [] as Movie[], page: 1, totalPages: 0, totalResults: 0 };
    }
    const pages: TMDBResponse<Movie>[] = infinite.pages;
    const last = pages[pages.length - 1];
    return {
      movies: pages.flatMap((p: TMDBResponse<Movie>) => p.results),
      page: last.page,
      totalPages: last.total_pages,
      totalResults: last.total_results,
    };
  }, [data]);

  return {
    movies: aggregate.movies,
    loading: isLoading && !data,
    error: error ? error.message : null,
    page: aggregate.page,
    totalPages: aggregate.totalPages,
    totalResults: aggregate.totalResults,
    refetch,
    loadMore: () => { if (hasNextPage) fetchNextPage(); },
    hasMore: !!hasNextPage,
    isFetchingNext: isFetchingNextPage,
  };
}

export interface UseMovieByIdResult {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMovieById(id: number | null): UseMovieByIdResult {
  const { data, error, isLoading, refetch } = useQuery<Movie, Error>({
    queryKey: movieKey(id),
    queryFn: () => {
      if (id == null) throw new Error('No id');
      return fetchMovieById(id);
    },
    enabled: id != null,
    staleTime: 5 * 60_000,
    placeholderData: keepPreviousData,
  });

  return {
    movie: data ?? null,
    loading: isLoading && !data,
    error: error ? error.message : null,
    refetch,
  };
}

export function useBrowseMovies(searchQuery: string = '') {
  const trimmed = searchQuery.trim();
  const { data, error, isLoading, isFetching } = useQuery<TMDBResponse<Movie>, Error>({
    queryKey: ['browse-movies', { q: trimmed }],
    queryFn: () => fetchMovies({ page: 1, language: 'en-US', query: trimmed || undefined }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  return {
    movies: data?.results ?? [],
    loading: isLoading && !data,
    fetching: isFetching,
    error: error ? error.message : null,
  };
}
