import { useEffect, useState } from "react";

type MediaType = "movie" | "tv";

type HookState<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
};

export default function useBrowseList<T = any>(media: MediaType, query = ""): HookState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // For now we use trending for browse; your route switches to discover when filters exist.
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("language", "en-US");
    // Optional: keep this; the route will ignore it unless you implement search
    if (query.trim()) params.set("q", query.trim());

    const url =
      media === "movie"
        ? `/api/browse/movies?${params.toString()}`
        : `/api/browse/shows?${params.toString()}`;

    fetch(url)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        // TMDB shape has data.results; fall back to array if endpoint returns a list directly
        const arr = Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : [];
        return arr as T[];
      })
      .then((arr) => {
        if (!cancelled) setItems(arr);
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
  }, [media, query]);

  return { items, loading, error };
}