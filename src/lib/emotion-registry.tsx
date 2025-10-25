"use client"

import { useState } from "react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import type { ReactNode } from "react"

export default function EmotionRegistry({ children }: { children: ReactNode }) {
  const [cache] = useState(() => {
    const insertionPoint =
      typeof document !== "undefined"
        ? (document.querySelector('meta[name="emotion-insertion-point"]') as HTMLElement | null)
        : null

    return createCache({
      key: "mui",
      prepend: true,
      insertionPoint: insertionPoint ?? undefined,
    })
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}