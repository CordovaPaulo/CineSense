'use client';
import { memo } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
  Rating,
  Link as MuiLink,
} from '@mui/material';
import { CompanyTile } from '@/components/molecules/CompanyTile';
import LanguageIcon from '@mui/icons-material/Language';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import type { Movie } from '@/interfaces/interface';
import { formatRuntime, formatCurrency } from '@/lib/format-utils';

// Base TMDB image URL (poster/backdrop sizes can be adjusted)
const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p';

// Extend local view of Movie to include full “movie by id” payload fields
type FullPayloadMovie = Movie & {
  backdrop_path?: string | null;
  tagline?: string | null;
  genres?: Array<{ id: number; name: string }>;
  imdb_id?: string | null;
  homepage?: string | null;
  production_companies?: Array<{ id: number; name: string; logo_path?: string | null }>;
  production_countries?: Array<{ iso_3166_1?: string; name?: string }>;
  spoken_languages?: Array<{ english_name?: string; name?: string }>;
  budget?: number | null;
  revenue?: number | null;
  runtime?: number | null;
  status?: string | null;
  original_title?: string;
  original_language?: string;
  vote_count?: number;
  origin_country?: string[];
};

interface FullMovieCardProps {
  movie: FullPayloadMovie;
  className?: string;
  showGenres?: boolean;
}

export const FullMovieCard = memo(function FullMovieCard({
  movie,
  className,
  showGenres = true,
}: FullMovieCardProps) {
  const posterSrc = movie.poster_path
    ? `${IMAGE_BASE}/w500${movie.poster_path}`
    : '/placeholder-movie.png';
  const backdropSrc = movie.backdrop_path
    ? `${IMAGE_BASE}/original${movie.backdrop_path}`
    : null;

  // Prefer full genres array; fallback to genre_ids if only IDs exist
  const genres =
    movie.genres?.length
      ? movie.genres
      : (movie as any).genre_ids?.map((id: number) => ({ id, name: `Genre ${id}` })) ?? [];

  return (
    <Box className={className} sx={{ width: '100%' }}>
      {backdropSrc && (
        <Box
          sx={{
            width: '100%',
            height: { xs: 180, sm: 240 },
            mb: 3,
            borderRadius: 2,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.65)), url(${backdropSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          }}
        />
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'saturate(120%) blur(4px)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
        }}
      >
        {/* Poster */}
        <Box
          component="img"
          src={posterSrc}
          alt={movie.title}
          loading="lazy"
          sx={{
            width: { xs: '100%', md: 260 },
            height: { xs: 'auto', md: 390 },
            objectFit: 'cover',
            borderRadius: 2,
            flexShrink: 0,
            backgroundColor: '#111',
            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
          }}
        />

        {/* Right Column */}
        <Box flex={1} minWidth={0}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {movie.title ?? movie.original_title ?? 'Untitled'}
              </Typography>
              {movie.tagline && (
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {movie.tagline}
                </Typography>
              )}
            </Box>

            <Stack spacing={0.5} alignItems="flex-end">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Rating value={(movie.vote_average ?? 0) / 2} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {(movie.vote_average ?? 0).toFixed(1)} ({movie.vote_count ?? 0})
                </Typography>
              </Stack>
              {movie.status && (
                <Chip label={movie.status} size="small" variant="outlined" />
              )}
            </Stack>
          </Stack>

            {showGenres && genres.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                {genres.map((g: any) => (
                  <Chip
                    key={g.id}
                    label={g.name}
                    size="small"
                    variant="filled"
                    sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.04)', color: 'text.primary' }}
                  />
                ))}
              </Stack>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" sx={{ lineHeight: 1.6, whiteSpace: 'pre-line', mb: 3 }}>
              {movie.overview || 'No overview available.'}
            </Typography>

            {/* Meta blocks */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              flexWrap="wrap"
              sx={{ mb: 3 }}
            >
              <Stack spacing={0.75}>
                <Typography variant="subtitle2">Details</Typography>
                <Typography variant="body2">
                  Release: {movie.release_date || '—'}
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon fontSize="inherit" /> Runtime: {movie.runtime ? formatRuntime(movie.runtime) : '—'}
                </Typography>
                <Typography variant="body2">
                  Original Language: {movie.original_language || '—'}
                </Typography>
                <Typography variant="body2">
                  Origin Country: {movie.origin_country?.join(', ') || '—'}
                </Typography>
              </Stack>

              <Stack spacing={0.75}>
                <Typography variant="subtitle2">Financials</Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <MonetizationOnIcon fontSize="inherit" /> Budget: {formatCurrency(movie.budget)}
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <MonetizationOnIcon fontSize="inherit" /> Revenue: {formatCurrency(movie.revenue)}
                </Typography>
              </Stack>

              <Stack spacing={0.75}>
                <Typography variant="subtitle2">Languages</Typography>
                <Typography variant="body2">
                  Spoken: {movie.spoken_languages?.map(l => l.english_name || l.name).filter(Boolean).join(', ') || '—'}
                </Typography>
              </Stack>

              <Stack spacing={0.75}>
                <Typography variant="subtitle2">Identifiers</Typography>
                <Typography variant="body2">
                  IMDb: {movie.imdb_id ? movie.imdb_id : '—'}
                </Typography>
                <Typography variant="body2">
                  Original Title: {movie.original_title || '—'}
                </Typography>
                <Typography variant="body2">
                  ID: {movie.id}
                </Typography>
                {/* <Typography variant="body2">
                  Popularity: {movie.popularity?.toFixed(1) ?? '—'}
                </Typography> */}
              </Stack>
            </Stack>

            {/* Production Companies */}
            <Typography variant="subtitle2" gutterBottom>
              Production Companies
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1, mb: 2 }}>
              {movie.production_companies?.length ? (
                movie.production_companies.map(pc => (
                  <CompanyTile
                    key={pc.id}
                    name={pc.name}
                    logoUrl={pc.logo_path ? `${IMAGE_BASE}/w92${pc.logo_path}` : undefined}
                  />
                ))
              ) : (
                <Typography variant="body2">—</Typography>
              )}
            </Box>

            {/* Production Countries */}
            <Typography variant="subtitle2" gutterBottom>
              Production Countries
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {movie.production_countries?.length
                ? movie.production_countries.map(c => (
                    <Chip
                      key={c.iso_3166_1 ?? c.name}
                      label={c.name || c.iso_3166_1 || 'Unknown'}
                      size="small"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))
                : <Typography variant="body2">—</Typography>}
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* External Links */}
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              {movie.homepage && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<LanguageIcon />}
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ boxShadow: 'none', minWidth: 100, px: 2 }}
                >
                  Official Site
                </Button>
              )}
              {movie.imdb_id && (
                <MuiLink href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer" underline="none">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    endIcon={<OpenInNewIcon />}
                    sx={{ minWidth: 88, px: 2, boxShadow: 'none' }}
                  >
                    IMDb
                  </Button>
                </MuiLink>
              )}
            </Stack>
        </Box>
      </Box>
    </Box>
  );
});

export default FullMovieCard;