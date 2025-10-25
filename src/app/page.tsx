'use client';

import Link from 'next/link';
import { Film, Tv, MessageCircle } from 'lucide-react';
import { Box, Typography, Grid, Button } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ p: 4 }} className="min-h-screen bg-linear-to-b from-[#000000] via-[#0f0a0a] to-[#6e0a0a]">
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" color="text.primary" className="text-7xl! max-w-full p-10">
          Discover Your Next Favorite{' '}
          <Typography component="span" variant="inherit" color="primary.light">
            Movies
          </Typography>
          {' '} or {' '}
          <Typography component="span" variant="inherit" color="primary.light">
            Shows
          </Typography>
        </Typography>

        <Typography
          component="p"
          variant="inherit"
          color="text.secondary"
          className="text-2xl! max-w-full px-auto"
        >
          AI-powered recommendations tailored to your taste. Browse movies and shows, or chat with our intelligent
          recommendation engine.
        </Typography>
      </Box>
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        {/* Grid v2: children are items implicitly; no `item` prop */}
        <Grid container spacing={3} sx={{ mt: 10, justifyContent: 'center' }}>
          <Grid xs={12} md="auto" sx={{ width: '100%', maxWidth: 380, height: 300 }}>
            <Link href="/browse/movies" className="group h-full block">
              <div className="bg-homecard rounded-xl p-8 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-primary/20 h-full flex flex-col justify-center text-center transform-gpu hover:z-10">
                <h2 className="text-4xl font-bold text-main-text-color mb-3">Browse Movies</h2>
                <p className="text-main-text-color mb-6">
                  Explore thousands of movies with ratings, reviews, and detailed information.
                </p>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'text.primary',
                      borderColor: 'text.primary',
                      color: 'background.default',
                    },
                  }}
                >
                  Explore Movies
                </Button>
              </div>
            </Link>
          </Grid>

          <Grid xs={12} md="auto" sx={{ width: '100%', maxWidth: 380, height: 300 }}>
            <Link href="/browse/shows" className="group h-full block">
              <div className="bg-homecard rounded-xl p-8 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-primary/20 h-full flex flex-col justify-center text-center transform-gpu hover:z-10">
                <h2 className="text-4xl font-bold text-main-text-color mb-3">Browse TV Shows</h2>
                <p className="text-main-text-color mb-6">
                  Discover trending series and binge-worthy shows from around the world.
                </p>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'text.primary',
                      borderColor: 'text.primary',
                      color: 'background.default',
                    },
                  }}
                >
                  Explore TV Shows
                </Button>
              </div>
            </Link>
          </Grid>

          <Grid xs={12} md="auto" sx={{ width: '100%', maxWidth: 380, height: 300 }}>
            <Link href="/chat" className="group h-full block">
              <div className="bg-homecard rounded-xl p-8 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-primary/20 h-full flex flex-col justify-center text-center transform-gpu hover:z-10">
                <h2 className="text-4xl font-bold text-main-text-color mb-3">Chat with AI</h2>
                <p className="text-main-text-color mb-6">
                  Get personalized recommendations and assistance from our AI chatbot.
                </p>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'text.primary',
                      borderColor: 'text.primary',
                      color: 'background.default',
                    },
                  }}
                >
                  Start Chatting
                </Button>
              </div>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 12, textAlign: 'Left' }}>
        <h2 className="text-6xl font-bold text-main-text-color mt-25 mb-25 text-center">Why CineSense?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "AI-Powered", desc: "Get personalized suggestions based on your viewing preferences." },
            { title: "Vast Library", desc: "Explore a vast library of movies and TV shows from around the world." },
            { title: "Real Ratings", desc: "Access real-time ratings and reviews from trusted sources." },
            { title: "Conversational", desc: "Get personalized movie and TV show recommendations through natural language conversations." },
          ].map((feature, i) => (
            <div
              key={i}
              className="group bg-card bg-homecard border border-border rounded-lg p-6 transform-gpu transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 flex flex-col items-center text-center"
              role="article"
              aria-label={feature.title}
            >
              <h3 className="text-3xl font-bold text-main-text-color mb-5 transition-colors duration-200 group-hover:text-(--sub-main-text-color)">
                {feature.title}
              </h3>
              <p className="text-lg text-main-text-color transition-colors duration-200 group-hover:text-(--sub-main-text-color)">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}