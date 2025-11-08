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
import LanguageIcon from '@mui/icons-material/Language';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { TVShow } from '@/interfaces/interface';
import { formatRuntimeMinutes } from '@/components/utils/runtime-formatter';

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

interface FullShowCardProps {
  show: FullPayloadShow;
  className?: string;
  showGenres?: boolean;
}

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
          }}
        />
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          p: 3,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
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
                <Chip key={g.id} label={g.name} size="small" variant="filled" sx={{ mb: 1 }} />
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
                Spoken: {show.spoken_languages?.map((l) => l.english_name ?? l.name).filter(Boolean).join(', ') || '—'}
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
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
            {show.networks?.length ? (
              show.networks.map((n) => (
                <Stack
                  key={n.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    p: 0.75,
                    pr: 1.25,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    mb: 1,
                  }}
                >
                  {n.logo_path ? (
                    <Box
                      component="img"
                      src={`${IMAGE_BASE}/w92${n.logo_path}`}
                      alt={n.name}
                      loading="lazy"
                      sx={{ width: 40, height: 24, objectFit: 'contain' }}
                    />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>{(n.name || '?').charAt(0)}</Avatar>
                  )}
                  <Typography variant="body2" sx={{ maxWidth: 160 }} noWrap title={n.name}>
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
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                {show.production_companies.length ? (
                  show.production_companies.map((pc) => (
                    <Stack
                      key={pc.id}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        p: 0.75,
                        pr: 1.25,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        mb: 1,
                      }}
                    >
                      {pc.logo_path ? (
                        <Box
                          component="img"
                          src={`${IMAGE_BASE}/w92${pc.logo_path}`}
                          alt={pc.name}
                          loading="lazy"
                          sx={{ width: 40, height: 24, objectFit: 'contain' }}
                        />
                      ) : (
                        <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>{(pc.name || '?').charAt(0)}</Avatar>
                      )}
                      <Typography variant="body2" sx={{ maxWidth: 160 }} noWrap title={pc.name}>
                        {pc.name}
                      </Typography>
                    </Stack>
                  ))
                ) : (
                  <Typography variant="body2">—</Typography>
                )}
              </Stack>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          {/* External Links */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {show.homepage && (
              <Button
                variant="contained"
                size="small"
                startIcon={<LanguageIcon />}
                href={show.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Site
              </Button>
            )}
            {show.id && (
              <MuiLink
                href={`https://www.themoviedb.org/tv/${show.id}`}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
              >
                <Button variant="outlined" size="small" endIcon={<OpenInNewIcon />}>
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