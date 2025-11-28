'use client';

import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';
import type { Movie as MovieDetail } from '@/interfaces/interface';
import FullMovieCard from './full-movie-card';
import { fetchMovieById } from '@/services/tmdb-service';

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p';

type TmdbMovie = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
};

interface MovieCardProps {
  title?: string;
  posterPath?: string | null;
  rating?: number;
  releaseYear?: number | string;
  description?: string;
  movie?: TmdbMovie;
  onClick?: () => void;
  imageSize?: 'w185' | 'w342' | 'w500';
}

export function MovieCard({
  title,
  posterPath,
  rating,
  releaseYear,
  description,
  movie,
  onClick,
  imageSize = 'w342',
}: MovieCardProps) {
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [details, setDetails] = useState<MovieDetail | null>(null);
  const [open, setOpen] = useState(false);

  const t = title ?? movie?.title;
  const r = rating ?? movie?.vote_average;
  const y =
    releaseYear ?? (movie?.release_date ? new Date(movie.release_date).getFullYear() : undefined);
  const poster =
    posterPath ?? (movie?.poster_path ? `${IMG_BASE}/${imageSize}${movie.poster_path}` : undefined);
  const desc = description ?? movie?.overview;

  async function handleSeeMore(e?: React.MouseEvent) {
    e?.stopPropagation();
    const id = movie?.id;
    if (!id) return;
    if (details) { setOpen(true); return; }
    setLoadingDetails(true);
    try {
      const d = await fetchMovieById(id); // call the service directly
      setDetails(d);
      setOpen(true);
    } finally {
      setLoadingDetails(false);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Card
        onClick={onClick}
        sx={{
          backgroundColor: '#1e1e1e',
          border: '1px solid #333333',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          transition: 'all 0.25s ease',
          cursor: onClick ? 'pointer' : 'default',
          '&:hover': {
            transform: onClick ? 'translateY(-6px)' : 'none',
            borderColor: onClick ? '#a855f7' : '#333333',
            boxShadow: onClick ? '0 10px 22px rgba(168,85,247,0.18)' : 'none',
          },
        }}
      >
        {poster ? (
          <CardMedia component="img" height="300" image={poster} alt={t ?? 'Movie poster'} sx={{ objectFit: 'cover' }} />
        ) : (
          <Box
            sx={{
              height: 300,
              display: 'grid',
              placeItems: 'center',
              backgroundColor: '#151515',
              borderBottom: '1px solid #333333',
            }}
          >
            <MovieFilterRoundedIcon sx={{ color: '#a855f7' }} />
          </Box>
        )}
        <CardContent>
          <Typography variant="h6" sx={{ color: '#f2f2f2', fontWeight: 600, mb: 0.5 }}>
            {t ?? 'Untitled'}
          </Typography>
          {y !== undefined && (
            <Typography variant="body2" sx={{ color: '#a3a3a3', mb: 1 }}>
              {y}
            </Typography>
          )}
          {r !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Rating value={(r ?? 0) / 2} readOnly size="small" />
              <Typography variant="body2" sx={{ color: '#a3a3a3' }}>
                {(r ?? 0).toFixed(1)}
              </Typography>
            </Box>
          )}
          {desc && (
            <Typography variant="body2" sx={{ color: '#a3a3a3', lineHeight: 1.5, mb: 2 }}>
              {desc.length > 100 ? `${desc.substring(0, 100)}…` : desc}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleSeeMore}
              aria-expanded={Boolean(open)}
              aria-controls={details ? `movie-full-${movie?.id}` : undefined}
            >
              See more
            </Button>
            {loadingDetails && <CircularProgress size={20} />}
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {details?.title ?? 'Loading...'}
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers id={details ? `movie-full-${details.id}` : undefined}>
          {details ? <FullMovieCard movie={details} /> : <Box sx={{ p: 4, textAlign: 'center' }}>Loading…</Box>}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MovieCard;
