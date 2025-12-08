'use client';
import { memo } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Avatar,
  Divider,
  Button,
  Link as MuiLink,
  Rating,
} from '@mui/material';
import { CompanyTile } from '@/components/molecules/CompanyTile';
import LanguageIcon from '@mui/icons-material/Language';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { TVShow, FullShowCardProps } from '@/interfaces/interface';
import { formatRuntimeMinutes } from '@/lib/format-utils';

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p';

type FullPayloadShow = TVShow & {
  // extended TV detail fields from TMDB
  backdrop_path?: string | null;
  genres?: Array<{ id: number; name: string }>;
  homepage?: string | null;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: Array<{ id: number; name: string; logo_path?: string | null }>;
  networks?: Array<{ id: number; name: string; logo_path?: string | null; origin_country?: string }>;
  production_countries?: Array<{ iso_3166_1?: string; name?: string }>;
  spoken_languages?: Array<{ english_name?: string; name?: string }>;
  languages?: string[];
  first_air_date?: string | null;
  last_air_date?: string | null;
  number_of_seasons?: number | null;
  number_of_episodes?: number | null;
  episode_run_time?: number[]; // minutes
  status?: string | null;
  vote_count?: number;
};

export const FullShowCard = memo(function FullShowCard({
  show,
  className,
  showGenres = true,
}: FullShowCardProps) {
  const posterSrc = show.poster_path ? `${IMAGE_BASE}/w500${show.poster_path}` : '/placeholder-show.png';
  const backdropSrc = show.backdrop_path ? `${IMAGE_BASE}/original${show.backdrop_path}` : null;

  const genres =
    show.genres?.length
      ? show.genres
      : (show as any).genre_ids?.map((id: number) => ({ id, name: `Genre ${id}` })) ?? [];

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
        <Box
          component="img"
          src={posterSrc}
          alt={show.name ?? show.original_name ?? 'Poster'}
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

        <Box flex={1} minWidth={0}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {show.name ?? show.original_name ?? 'Untitled'}
              </Typography>
            </Box>

            <Stack spacing={0.5} alignItems="flex-end">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Rating value={(show.vote_average ?? 0) / 2} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {(show.vote_average ?? 0).toFixed(1)} ({show.vote_count ?? 0})
                </Typography>
              </Stack>
              {show.status && <Chip label={show.status} size="small" variant="outlined" />}
            </Stack>
          </Stack>

          {showGenres && genres.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              {genres.map((g: { id: number; name: string }) => (
                <Chip key={g.id} label={g.name} size="small" variant="filled" sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.04)', color: 'text.primary' }} />
              ))}
            </Stack>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" sx={{ lineHeight: 1.6, whiteSpace: 'pre-line', mb: 3 }}>
            {show.overview || 'No overview available.'}
          </Typography>

          {/* Meta blocks */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} flexWrap="wrap" sx={{ mb: 3 }}>
            <Stack spacing={0.75}>
              <Typography variant="subtitle2">Details</Typography>
              <Typography variant="body2">First Air: {show.first_air_date || '—'}</Typography>
              <Typography variant="body2">Last Air: {show.last_air_date || '—'}</Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon fontSize="inherit" /> Episode runtime: {formatRuntimeMinutes(show.episode_run_time)}
              </Typography>
              <Typography variant="body2">Seasons: {show.number_of_seasons ?? '—'}</Typography>
              <Typography variant="body2">Episodes: {show.number_of_episodes ?? '—'}</Typography>
              <Typography variant="body2">Original language: {show.original_language || '—'}</Typography>
              <Typography variant="body2">Origin country: {show.origin_country?.join(', ') || '—'}</Typography>
            </Stack>

            <Stack spacing={0.75}>
              <Typography variant="subtitle2">Languages</Typography>
              <Typography variant="body2">
                Spoken: {show.spoken_languages?.map((l: any) => l.english_name ?? l.name).filter(Boolean).join(', ') || '—'}
              </Typography>
              <Typography variant="body2">
                Languages: {show.languages?.join(', ') || '—'}
              </Typography>
            </Stack>

            <Stack spacing={0.75}>
              <Typography variant="subtitle2">Identifiers</Typography>
              <Typography variant="body2">Original name: {show.original_name || '—'}</Typography>
              <Typography variant="body2">ID: {show.id}</Typography>
            </Stack>
          </Stack>

          {/* Networks */}
          <Typography variant="subtitle2" gutterBottom>
            Networks
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            {show.networks?.length ? (
              show.networks.map((n: any) => (
                <Stack
                  key={n.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    mb: 1,
                    minWidth: 140,
                    maxWidth: 320,
                    gap: 1,
                    overflow: 'hidden',
                    alignSelf: 'flex-start',
                  }}
                >
                  {n.logo_path ? (
                    <Box
                      component="img"
                      src={`${IMAGE_BASE}/w92${n.logo_path}`}
                      alt={n.name}
                      loading="lazy"
                      sx={{ width: 56, height: 28, objectFit: 'contain', flexShrink: 0 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>{(n.name || '?').charAt(0)}</Avatar>
                  )}
                  <Typography variant="body2" sx={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }} noWrap title={n.name}>
                    {n.name}
                  </Typography>
                </Stack>
              ))
            ) : (
              <Typography variant="body2">—</Typography>
            )}
          </Stack>

          {/* Production Companies (if present) */}
          {show.production_companies && (
            <>
              <Typography variant="subtitle2" gutterBottom>
                Production Companies
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1, mb: 2 }}>
                {show.production_companies.length ? (
                  show.production_companies.map((pc: any) => (
                    <CompanyTile key={pc.id} name={pc.name} logoUrl={pc.logo_path ? `${IMAGE_BASE}/w92${pc.logo_path}` : undefined} />
                  ))
                ) : (
                  <Typography variant="body2">—</Typography>
                )}
              </Box>
            </>
          )}

          <Divider sx={{ my: 1 }} />

          {/* External Links */}
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {show.homepage && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<LanguageIcon />}
                href={show.homepage}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ boxShadow: 'none', minWidth: 100, px: 2 }}
              >
                Official Site
              </Button>
            )}
            {show.id && (
              <MuiLink href={`https://www.themoviedb.org/tv/${show.id}`} target="_blank" rel="noopener noreferrer" underline="none">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  sx={{ minWidth: 88, px: 2, boxShadow: 'none' }}
                >
                  TMDB
                </Button>
              </MuiLink>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
});

export default FullShowCard;