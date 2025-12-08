export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface BrowseOptions {
  page?: number;
  language?: string;
  query?: string;
  timeWindow?: 'day' | 'week';
  mode?: 'discover' | 'trending';
  sortBy?: string;
  originalLang?: string;
  yearRange?: string;
  startYear?: string;
  endYear?: string;
  withGenres?: string;
  genres?: string;
  actor?: string;
  includeAdult?: boolean;
}

// Chat / assistant interfaces
export interface ChatRecommendation {
  type: 'movie' | 'tv';
  reason?: string;
  item: any; // Ideally a Movie or TVShow detail object when available
}

export interface ChatResponse {
  greeting?: string;
  recommendations?: ChatRecommendation[];
  reply?: string;
}

// Analysis layer types
export interface Sentiment {
  score: number; // -1..1
  label: 'negative' | 'neutral' | 'positive';
}

export interface SafetyFlags {
  nsfw?: boolean;
  violence?: boolean;
  adult?: boolean;
  other?: string[];
}

export interface AnalysisResult {
  intent: string;
  sentiment: Sentiment;
  topics: string[];
  embeddings?: number[];
  explicitFilters?: Record<string, any>;
  personalizationScore?: number;
  safety?: SafetyFlags;
  confidence?: number;
  explanation?: string;
}

// Hook result shapes
export interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalResults: number;
  refetch: () => void;
  loadMore: () => void;
  hasMore: boolean;
  isFetchingNext: boolean;
}

export interface UseMovieByIdResult {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseShowsResult {
  shows: TVShow[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalResults: number;
  refetch: () => void;
  loadMore: () => void;
  hasMore: boolean;
  isFetchingNext: boolean;
}

export interface UseShowByIdResult {
  show: TVShow | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Generic hook options
export interface UseFetchOptions {
  params?: Record<string, string | number | boolean | undefined | null>;
  endpoints?: Partial<Record<'movie' | 'show', string>>;
  enabled?: boolean;
}

// Mock data shapes
export interface MockMovie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface MockShow {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_year: string;
  vote_average: number;
}

// Component prop shapes
export interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatContainerProps {
  children: React.ReactNode;
  sx?: any;
}

export interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export interface ChatLayoutProps {
  messages: React.ReactNode;
  input: React.ReactNode;
}

export interface BrowseLayoutProps {
  title: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

export interface LoadingIndicatorProps {
  message?: string;
}

// Cards / Organisms props
export interface MovieCardProps {
  title?: string;
  posterPath?: string | null;
  rating?: number;
  releaseYear?: number | string;
  description?: string;
  movie?: {
    id: number;
    title: string;
    overview?: string;
    poster_path?: string | null;
    vote_average?: number;
    release_date?: string;
  } | undefined;
  onClick?: () => void;
  imageSize?: 'w185' | 'w342' | 'w500';
}

export interface ShowCardProps {
  title?: string;
  posterPath?: string | null;
  rating?: number;
  releaseYear?: number | string;
  firstAirYear?: number | string;
  description?: string;
  show?: {
    id: number;
    name: string;
    overview?: string;
    poster_path?: string | null;
    vote_average?: number;
    first_air_date?: string;
  } | undefined;
  onClick?: () => void;
  imageSize?: 'w185' | 'w342' | 'w500';
}

export interface ContentGridProps {
  children: React.ReactNode;
  spacing?: number;
}

// Reuse ChatContainerProps already defined above (sx?: any)

// Molecules / smaller components
export interface FiltersPanelProps {
  genre: string;
  year: string | number | '';
  third: string;
  onGenreChange: (e: any) => void;
  onYearChange: (e: any) => void;
  onThirdChange: (e: any) => void;
  genres: string[];
  years: (number | string)[];
  thirdOptions: string[];
  thirdLabel?: string;
}

export interface EmptyMessageProps {
  message?: string;
  icon?: React.ReactNode;
}

export interface CompanyTileProps {
  name: string;
  logoUrl?: string | null;
  href?: string | null;
  sx?: any;
}

export interface ChatInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface FullMovieCardProps {
  movie: Movie & Record<string, any>;
  className?: string;
  showGenres?: boolean;
}

export interface FullShowCardProps {
  show: TVShow & Record<string, any>;
  className?: string;
  showGenres?: boolean;
}

export interface ChatCardProps {
  title: string;
  posterPath?: string | null;
  rating?: number;
  date?: number;
  description?: string;
  onClick?: () => void;
}

export interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface PaginationControlsProps {
  page: number;
  totalPages?: number;
  loading?: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export interface RatingDisplayProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
}

export interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

// Atom button props (typed against MUI types)
import type { ButtonProps as MuiButtonProps, SxProps, Theme } from '@mui/material';
export interface ButtonProps extends Omit<MuiButtonProps, 'sx'> {
  sx?: SxProps<Theme>;
}

export interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}
