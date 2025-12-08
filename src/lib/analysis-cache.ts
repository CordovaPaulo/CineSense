// Simple in-memory TTL cache for analysis results and reranker outputs
type CacheEntry<T> = { value: T; expiresAt: number };

const cache = new Map<string, CacheEntry<any>>();

export function cacheGet<T>(key: string): T | undefined {
  const e = cache.get(key);
  if (!e) return undefined;
  if (Date.now() > e.expiresAt) {
    cache.delete(key);
    return undefined;
  }
  return e.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlSeconds = 300) {
  cache.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}

export function cacheDelete(key: string) {
  cache.delete(key);
}

export function cacheClear() {
  cache.clear();
}

export default { cacheGet, cacheSet, cacheDelete, cacheClear };
