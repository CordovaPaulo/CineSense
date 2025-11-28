import { useEffect, useState } from "react";

type MediaType = "movie" | "tv";

type HookState<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages?: number;
  totalResults?: number;
};

type Options = {
  page?: number;
  filters?: Record<string, string>;
};

export default function useBrowseList<T = any>(
  media: MediaType,
  query = "",
  options: Options = {}
): HookState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(options.page ?? 1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [totalResults, setTotalResults] = useState<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set("page", String(options.page ?? page ?? 1));
    params.set("language", "en-US");
    if (query.trim()) params.set("q", query.trim());

    // If filters are provided, pass them through; also signal discover mode
    if (options.filters && Object.keys(options.filters).length > 0) {
      params.set("mode", "discover");
      Object.entries(options.filters).forEach(([k, v]) => {
        if (v !== undefined && v !== "") params.set(k, v);
      });
    }

    const url =
      media === "movie"
        ? `/api/browse/movies?${params.toString()}`
        : `/api/browse/shows?${params.toString()}`;

    fetch(url)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        // TMDB shape has data.results; fall back to array if endpoint returns a list directly
        const arr = Array.isArray(data) ? data : Array.isArray((data as any).results) ? (data as any).results : [];
        if (!cancelled) {
          setItems(arr as T[]);
          setTotalPages((data as any).total_pages ?? undefined);
          setTotalResults((data as any).total_results ?? undefined);
        }
        return arr as T[];
      })
      .catch((e: any) => {
        if (!cancelled) setError(String(e?.message ?? e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media, query, options.page, JSON.stringify(options.filters ?? {})]);

  // Keep returned page in sync with options.page when provided
  useEffect(() => {
    if (options.page && options.page !== page) setPage(options.page);
  }, [options.page]);

  return { items, loading, error, page, totalPages, totalResults };
}