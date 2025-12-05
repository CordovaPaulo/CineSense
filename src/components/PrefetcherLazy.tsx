'use client';

import dynamic from 'next/dynamic';

const Prefetcher = dynamic(() => import('./Prefetcher'), { ssr: false });

export default function PrefetcherLazy() {
  return <Prefetcher />;
}
