"use client"

import { useState } from "react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import type { ReactNode } from "react"

export default function EmotionRegistry({ children }: { children: ReactNode }) {
  const [cache] = useState(() => {
    // Ensure the insertion point meta exists and is the first child of <head>
    let insertionPoint: HTMLElement | null = null;
    if (typeof document !== "undefined") {
      insertionPoint = document.querySelector('meta[name="emotion-insertion-point"]') as HTMLElement | null;
      if (!insertionPoint) {
        insertionPoint = document.createElement('meta');
        insertionPoint.setAttribute('name', 'emotion-insertion-point');
        insertionPoint.setAttribute('content', '');
        const head = document.querySelector('head');
        if (head) head.prepend(insertionPoint);
      }
    }

    return createCache({
      key: "mui",
      prepend: true,
      insertionPoint: insertionPoint ?? undefined,
    });
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}