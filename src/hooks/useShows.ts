import { useMemo } from 'react';
import {
  useInfiniteQuery,
  useQuery,
  QueryKey,
  keepPreviousData,
} from '@tanstack/react-query';
import { fetchTVShows, fetchTVShowById } from '@/services/tmdb-service';
import type { TVShow, BrowseOptions, TMDBResponse } from '@/interfaces/interface';

const showsKey = (opts: BrowseOptions): QueryKey => ['shows', opts];
const showKey = (id: number | null): QueryKey => ['show', id];

export interface UseShowsResult {
  shows: TVShow[];
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

export function useShows(options: BrowseOptions = {}): UseShowsResult {
  const {
    data,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TMDBResponse<TVShow>, Error, TMDBResponse<TVShow>, QueryKey, number>({
    queryKey: showsKey(options),
    queryFn: ({ pageParam }) => fetchTVShows({ ...options, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 60_000,
    gcTime: 60 * 60 * 1000,
  });

  const aggregate = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const infinite = data as any;
    if (!infinite || !infinite.pages) {
      return { shows: [] as TVShow[], page: 1, totalPages: 0, totalResults: 0 };
    }
    const pages: TMDBResponse<TVShow>[] = infinite.pages;
    const last = pages[pages.length - 1];
    return {
      shows: pages.flatMap((p: TMDBResponse<TVShow>) => p.results),
      page: last.page,
      totalPages: last.total_pages,
      totalResults: last.total_results,
    };
  }, [data]);

  return {
    shows: aggregate.shows,
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

export interface UseShowByIdResult {
  show: TVShow | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useShowById(id: number | null): UseShowByIdResult {
  const { data, error, isLoading, refetch } = useQuery<TVShow, Error>({
    queryKey: showKey(id),
    queryFn: () => {
      if (id == null) throw new Error('No id');
      return fetchTVShowById(id);
    },
    enabled: id != null,
    staleTime: 5 * 60_000,
    placeholderData: keepPreviousData,
  });

  return {
    show: data ?? null,
    loading: isLoading && !data,
    error: error ? error.message : null,
    refetch,
  };
}

export function useBrowseShows(searchQuery: string = '') {
  const trimmed = searchQuery.trim();
  const { data, error, isLoading, isFetching } = useQuery<TMDBResponse<TVShow>, Error>({
    queryKey: ['browse-shows', { q: trimmed }],
    queryFn: () => fetchTVShows({ page: 1, language: 'en-US', query: trimmed || undefined }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  return {
    shows: data?.results ?? [],
    loading: isLoading && !data,
    fetching: isFetching,
    error: error ? error.message : null,
  };
}
