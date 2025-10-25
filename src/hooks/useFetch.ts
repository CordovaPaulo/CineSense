import { useCallback, useEffect, useRef, useState } from "react";

type FetchType = "movie" | "show";

export interface UseFetchOptions {
  params?: Record<string, string | number | boolean | undefined | null>;
  endpoints?: Partial<Record<FetchType, string>>;
  enabled?: boolean;
}

export default function useFetch<T = unknown>(
  type: FetchType,
  options: UseFetchOptions = {}
) {
  const { params, endpoints, enabled = true } = options;
  
  //mock fetch for testing
  const defaultEndpoints: Record<FetchType, string> = {
    movie: "/api/mock/movies",
    show: "/api/mock/shows",
  };

  const endpoint = (endpoints?.[type] ?? defaultEndpoints[type]).trim();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const buildUrl = useCallback(() => {
    const search = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) search.append(k, String(v));
      });
    }
    const qs = search.toString();
    return qs ? `${endpoint}?${qs}` : endpoint;
  }, [endpoint, params]);

  const fetchNow = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(buildUrl(), { signal: controller.signal, cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }
      const json = (await res.json()) as T;
      setData(json);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  }, [buildUrl]);

  useEffect(() => {
    if (!enabled) return;
    void fetchNow();
    return () => abortRef.current?.abort();
  }, [enabled, fetchNow]);

  return { data, loading, error, refetch: fetchNow };
}