import React, { Suspense } from 'react';
import ClientBrowseShows from './ClientBrowseShows';
import { getPopularShows } from '@/lib/tmdb-server';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const popular = await getPopularShows(1);
  const first = popular?.[0];
  return {
    title: first ? `${first.name} — Browse Shows` : 'Browse Shows',
    description: first ? first.overview : 'Browse TV shows on Cinesense',
    openGraph: {
      title: first ? `${first.name} — Browse Shows` : 'Browse Shows',
      description: first ? first.overview : 'Browse TV shows on Cinesense',
      images: first && first.poster_path ? [{ url: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${first.poster_path}` }] : [],
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading shows…</div>}>
      <ClientBrowseShows />
    </Suspense>
  );
}
