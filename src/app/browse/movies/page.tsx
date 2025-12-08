import React, { Suspense } from 'react';
import ClientBrowseMovies from './ClientBrowseMovies';
import { getPopularMovies } from '@/lib/tmdb-server';
import type { Metadata } from 'next';

export const revalidate = 60; // ISR: revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  // Fetch a popular movie to use for metadata preview
  const popular = await getPopularMovies(1);
  const first = popular?.[0];

  return {
    title: first ? `${first.title} — Browse Movies` : 'Browse Movies',
    description: first ? first.overview : 'Browse movies on Cinesense',
    openGraph: {
      title: first ? `${first.title} — Browse Movies` : 'Browse Movies',
      description: first ? first.overview : 'Browse movies on Cinesense',
      images: first && first.poster_path ? [{ url: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${first.poster_path}` }] : [],
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading movies…</div>}>
      <ClientBrowseMovies />
    </Suspense>
  );
}
