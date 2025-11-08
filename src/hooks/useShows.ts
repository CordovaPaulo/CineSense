import { useEffect, useState, useCallback } from 'react';
import { fetchTVShows, fetchTVShowById } from '@/services/tmdb-service';
import type { TVShow, BrowseOptions, TMDBResponse } from '@/interfaces/interface';

interface UseShowsState {
  shows: TVShow[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalResults: number;
}

interface UseShowsResult extends UseShowsState {
  refetch: () => void;
  loadMore: () => void;
}

export function useShows(options: BrowseOptions = {}): UseShowsResult {
  const [state, setState] = useState<UseShowsState>({
    shows: [],
    loading: true,
    error: null,
    page: 1,
    totalPages: 0,
    totalResults: 0,
  });

  const fetchData = useCallback(async (pageNum: number = 1) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response: TMDBResponse<TVShow> = await fetchTVShows({
        ...options,
        page: pageNum,
      });

      setState(prev => ({
        ...prev,
        shows: pageNum === 1 ? response.results : [...prev.shows, ...response.results],
        loading: false,
        page: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch TV shows',
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

interface UseShowByIdState {
  show: TVShow | null;
  loading: boolean;
  error: string | null;
}

interface UseShowByIdResult extends UseShowByIdState {
  refetch: () => void;
}

export function useShowById(id: number | null): UseShowByIdResult {
  const [state, setState] = useState<UseShowByIdState>({
    show: null,
    loading: !!id,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!id) {
      setState({ show: null, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const show = await fetchTVShowById(id);
      setState({ show, loading: false, error: null });
    } catch (err) {
      setState({
        show: null,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch TV show',
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

export function useBrowseShows(searchQuery: string = '') {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadShows = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchTVShows({
          page: 1,
          language: 'en-US',
          query: searchQuery.trim() || undefined,
        });

        if (!cancelled) {
          setShows(response.results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load TV shows');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadShows();

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  return { shows, loading, error };
}
