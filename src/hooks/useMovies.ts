import { useEffect, useState, useCallback } from 'react';
import { fetchMovies, fetchMovieById } from '@/services/tmdb-service';
import type { Movie, BrowseOptions, TMDBResponse } from '@/interfaces/interface';

interface UseMoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalResults: number;
}

interface UseMoviesResult extends UseMoviesState {
  refetch: () => void;
  loadMore: () => void;
}

export function useMovies(options: BrowseOptions = {}): UseMoviesResult {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: true,
    error: null,
    page: 1,
    totalPages: 0,
    totalResults: 0,
  });

  const fetchData = useCallback(async (pageNum: number = 1) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response: TMDBResponse<Movie> = await fetchMovies({
        ...options,
        page: pageNum,
      });

      setState(prev => ({
        ...prev,
        movies: pageNum === 1 ? response.results : [...prev.movies, ...response.results],
        loading: false,
        page: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch movies',
      }));
    }
  }, [options]);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData(1);
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (state.page < state.totalPages && !state.loading) {
      fetchData(state.page + 1);
    }
  }, [state.page, state.totalPages, state.loading, fetchData]);

  return {
    ...state,
    refetch,
    loadMore,
  };
}

interface UseMovieByIdState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

interface UseMovieByIdResult extends UseMovieByIdState {
  refetch: () => void;
}

export function useMovieById(id: number | null): UseMovieByIdResult {
  const [state, setState] = useState<UseMovieByIdState>({
    movie: null,
    loading: !!id,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!id) {
      setState({ movie: null, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const movie = await fetchMovieById(id);
      setState({ movie, loading: false, error: null });
    } catch (err) {
      setState({
        movie: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch movie',
      });
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch,
  };
}

export function useBrowseMovies(searchQuery: string = '') {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchMovies({
          page: 1,
          language: 'en-US',
          query: searchQuery.trim() || undefined,
        });

        if (!cancelled) {
          setMovies(response.results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load movies');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  return { movies, loading, error };
}
