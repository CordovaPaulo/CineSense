"use client";

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import fetchCache from '@/lib/fetch-cache';

export default function usePrefetchBrowse() {
  const qc = useQueryClient();

  useEffect(() => {
    // warm popular/trending first page for movies and shows
    const movieUrl = '/api/browse/movies?page=1';
    const showsUrl = '/api/browse/shows?page=1';

    // populate our local fetch-cache and react-query cache
    fetchCache.prefetch(movieUrl);
    fetchCache.prefetch(showsUrl);

    // also fill react-query keys so future components using react-query can read them
    // Use primitive query keys (arrays) to avoid v4 key validation issues
    qc.prefetchQuery({
      queryKey: ['browse', 'movies', 1],
      queryFn: async () => {
        const cached = fetchCache.getCached(movieUrl);
        if (cached) return cached;
        return fetchCache.fetchAndCache(movieUrl);
      },
    });

    qc.prefetchQuery({
      queryKey: ['browse', 'shows', 1],
      queryFn: async () => {
        const cached = fetchCache.getCached(showsUrl);
        if (cached) return cached;
        return fetchCache.fetchAndCache(showsUrl);
      },
    });
  }, [qc]);
}
