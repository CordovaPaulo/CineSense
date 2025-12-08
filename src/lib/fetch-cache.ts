type CacheEntry = {
  data: any;
  timestamp: number;
};

const CACHE_KEY_PREFIX = 'cinesense:cache:';

const memoryCache = new Map<string, CacheEntry>();

function makeKey(url: string) {
  return `${CACHE_KEY_PREFIX}${url}`;
}

export function getCached(url: string): any | undefined {
  const key = makeKey(url);
  const mem = memoryCache.get(key);
  if (mem) return mem.data;
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as CacheEntry;
      // keep it in memory for faster subsequent reads
      memoryCache.set(key, parsed);
      return parsed.data;
    }
  } catch {
    // ignore
  }
  return undefined;
}

export async function fetchAndCache(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const entry: CacheEntry = { data, timestamp: Date.now() };
  const key = makeKey(url);
  try {
    memoryCache.set(key, entry);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem(key, JSON.stringify(entry)); } catch { /* ignore */ }
    }
  } catch {
    // ignore cache errors
  }
  return data;
}

export async function prefetch(url: string, init?: RequestInit) {
  try {
    // attempt a fetch and cache; swallow errors
    await fetchAndCache(url, init);
  } catch (_e) {
    // noop
  }
}

const fetchCacheHelper = {
  getCached,
  fetchAndCache,
  prefetch,
};

export default fetchCacheHelper;
