"use client";

import React from 'react';
import usePrefetchBrowse from '@/hooks/usePrefetchBrowse';

export default function Prefetcher(): React.ReactElement | null {
  // call the hook to warm caches; it returns nothing
  usePrefetchBrowse();
  return null;
}
