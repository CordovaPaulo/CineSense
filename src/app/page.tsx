'use client';

import Link from 'next/link';
import { Film, Tv, MessageCircle, Scroll, Rotate3D } from 'lucide-react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { keyframes } from "@mui/system"; // <-- import keyframes her"
import ScrollAppear from "../components/ScrollAppear/ScrollAppear";
import ScrollGlowGradient from "../components/ScrollMouseGradient/ScrollMouseGradient";

const fadeSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeSlideUp2 = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimateonScroll = keyframes `
  from {
  opacity: 0;
  scale: 0.4;
  }

  to {
  opacity: 1
  scale:1
}
`;



export default function Home() {
  return (
    <ScrollGlowGradient>
    <Box sx={{ p: 15 }} className="min-h-screen">
      <Box sx={{ display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column", 
        textAlign: "center", 
        pt: 15, 
        pb:30}}
        >

        <Typography variant='h1' color='#FFBD4C' className='text-7xl!' sx={{
          textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)", 
          animation: `${fadeSlideUp} 1s ease-in-out forwards`,
          }}>CineSense
        </Typography>

        <Typography variant="h3" color="text.primary" className="text-4xl! max-w-full p-10"
        sx={{animation: `${fadeSlideUp2} 1s ease-in-out forwards`,}}>
          Discover Your Next Favorite Movies or Shows
        </Typography>
      </Box>


      <Box sx={{display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              pb: 15
              }}>
        <Box>
          
          <ScrollAppear>
          <Typography variant='h1' color='#FFBD4C' sx={{
            textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)", 
            pb:3,
            fontSize: "50px"}}>
            What is it?
          </Typography>
          </ScrollAppear>
          
          <ScrollAppear>
          <Typography sx={{maxWidth: "80%", 
            textAlign: "justify",
            fontSize: "18px"}}>CineSense is an AI-enhanced movie and TV show recommendation system that
             integrates the TMDb (The Movie Database) API and sentiment analysis to deliver personalized
              entertainment suggestions based on the user’s mood and emotions. Unlike traditional
               recommendation algorithms that rely mainly on watch history, ratings, or 
               genre preferences, CineSense focuses on interpreting the user’s current feelings and 
               intent through natural language prompts to generate more meaningful and emotionally
                aligned recommendations.
          </Typography>
          </ScrollAppear>
        </Box>

        
        <Box
        component="img"
        src="/CineSense logo 2.png"
        alt="CineSense"
        sx={{
            width: "80%",
            maxWidth: 400,
            animation: "appear 5s linear",
    animationTimeline: "view()",
    animationRange: "entry 0% cover",
    "@keyframes appear": {
      "0%": {
        opacity: 0,
        transform: "translateY(30px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
          }}>
        </Box>
       
      </Box>


      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <ScrollAppear>
        <Typography variant='h1' color='#ffffffff'  sx={{
          textShadow: "2px 2px 11.3px rgba(255, 255, 255, 0.6)", 
            pb:3,
            fontSize: "50px",
        }}>What it offers?
        </Typography>
        </ScrollAppear>

        {/* Grid v2: children are items implicitly; no `item` prop */}
        <Grid container spacing={3} sx={{ mt: 10, justifyContent: 'space-between', alignItems: "center",
          ml: -5, flexDirection: "row", mb:20
        }}>
          <Grid xs={12} md="auto" sx={{ width: '100%', maxWidth: 380, height: 300,}}>
            
            <Link href="/browse/movies" className="group h-full block">
            <ScrollAppear>
              <Box sx={{
                backgroundColor: "homecard", // assuming this is in your theme palette
                borderRadius: 3, // rounded-xl ≈ theme.spacing(3)
                p: 8, // padding: theme.spacing(8 / 4) = 2rem, same as p-8
                height: "100%", // h-full
                display: "flex",
                width: "430px",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out, z-index 0.3s",
                "&:hover": {
                transform: "translateY(-10px)", // slide up only, no scale
                boxShadow: (theme) =>
                `0px 20px 25px -5px ${theme.palette.primary.main}20`, // hover:shadow-primary/20
                zIndex: 10,
              },
              }} className="w-96 bg-homecard rounded-xl p-8 transition-transform duration-300 ease-out hover:shadow-xl hover:shadow-primary/20 h-full flex flex-col justify-center text-center transform-gpu hover:z-10">
                <Typography variant='h2' color='#FFBD4C' sx={{
                  fontWeight: "800",
                  pb:"70px",
                  textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)",
                  pb: "20px"
                }}>Browse Movies</Typography>
                <p className="text-main-text-color mb-20">
                  Explore thousands of movies with ratings, reviews, and detailed information.
                </p>
                <Button
                  variant="outlined"
                  
                  
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.primary',
                    
                    pt: 1.5,
                    pb:1.5,
                    '&:hover': {
                      backgroundColor: 'text.primary',
                      borderColor: 'text.primary',
                      color: 'background.default',
                      
                    },
                  }}
                >
                  Explore Movies
                </Button>
              </Box>
            </ScrollAppear>
            </Link>
          </Grid>

          <Grid xs={12} md="auto" sx={{ width: '100%', maxWidth: 380, height: 300}}>
            <Link href="/browse/movies" className="group h-full block">
            <ScrollAppear>
              <Box sx={{
                width: 384, // w-96 → 96 * 4px = 384px
                backgroundColor: "homecard", // assuming this is in your theme palette
                borderRadius: 3, // rounded-xl ≈ theme.spacing(3)
                p: 8, // padding: theme.spacing(8 / 4) = 2rem, same as p-8
                height: "100%", // h-full
                display: "flex",
                width: "430px",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out, z-index 0.3s",
                "&:hover": {
                transform: "translateY(-10px)", // slide up only, no scale
                boxShadow: (theme) =>
                  `0px 20px 25px -5px ${theme.palette.primary.main}20`, // hover:shadow-primary/20
                zIndex: 10,
              },
              }} className="w-96 bg-homecard rounded-xl p-8 transition-transform duration-300 ease-out hover:shadow-xl hover:shadow-primary/20 h-full flex flex-col justify-center text-center transform-gpu hover:z-10">
                <Typography variant='h2' color='#FFBD4C' sx={{
                  fontWeight: "800",
                  pb:"70px",
                  textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)",
                  pb: "20px"
                }}>Browse TV Shows</Typography>
                <p className="text-main-text-color mb-20">
                  Discover trending series and binge-worthy shows from around the world.
                </p>
                <Button
                  variant="outlined"
                  fullWidth
                  
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.primary',
                    pt: 1.5,
                    pb:1.5,
                    '&:hover': {
                      backgroundColor: 'text.primary',
                      borderColor: 'text.primary',
                      color: 'background.default',
                    },
                  }}
                >
                  Explore TV Shows
                </Button>
              </Box>
            </ScrollAppear>
            </Link>
          </Grid>

          <Grid xs={12} md="auto" sx={{ width: '100%', maxWidth: 380, height: 300}}>
            <Link href="/browse/movies" className="group h-full block">
            <ScrollAppear>
              <Box sx={{
                width: 384, // w-96 → 96 * 4px = 384px
                backgroundColor: "homecard", // assuming this is in your theme palette
                borderRadius: 3, // rounded-xl ≈ theme.spacing(3)
                p: 8, // padding: theme.spacing(8 / 4) = 2rem, same as p-8
                height: "100%", // h-full
                display: "flex",
                width: "430px",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out, z-index 0.3s",
                "&:hover": {
                transform: "translateY(-10px)", // slide up only, no scale
                boxShadow: (theme) =>
                  `0px 20px 25px -5px ${theme.palette.primary.main}20`, // hover:shadow-primary/20
                zIndex: 10,
              },
              }} className="w-96 bg-homecard rounded-xl p-8 transition-transform duration-300 ease-out hover:shadow-xl hover:shadow-primary/20 h-full flex flex-col justify-center text-center transform-gpu hover:z-10">


                <Typography variant='h2' color='#FFBD4C' sx={{
                  fontWeight: "800",
                  pb:"70px",
                  textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)",
                  pb: "20px"
                }}>Chat with AI</Typography>
                <p className="text-main-text-color mb-20">
                  Get personalized recommendations and assistance from our AI chatbot.
                </p>
                <Button
                  variant="outlined"
                  fullWidth
                  
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.primary',
                    pt: 1.5,
                    pb:1.5,
                    '&:hover': {
                      backgroundColor: 'text.primary',
                      borderColor: 'text.primary',
                      color: 'background.default',
                    },
                  }}
                >
                  Start Chatting
                </Button>
              </Box>
            </ScrollAppear>
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 12, textAlign: 'Left' }}>
        <Typography variant='h1' sx={{
          fontSize: "50px", // Tailwind text-6xl ≈ 60px
          color: "text.main", // text-main-text-color (make sure it's defined in your theme)
          mt: 25, // margin-top (theme spacing × 8px = 200px)
          mb: 10, // margin-bottom
          textAlign: "center", // text-center
          textShadow: "2px 2px 11.3px rgba(255, 255, 255, 0.6)"
        }}>Why CineSense?</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "AI-Driven", desc: "Get personalized suggestions based on your viewing preferences." },
                { title: "Vast Library", desc: "Explore a vast library of movies and TV shows from around the world." },
                { title: "Real Ratings", desc: "Access real-time ratings and reviews from trusted sources." },
                { title: "Conversational", desc: "Get personalized movie and TV show recommendations through natural language conversations." },
                { title: "Personalized", desc: "Receive tailored suggestions based on your emotions and preferences." },
                { title: "User-Friendly", desc: "Enjoy a smooth, simple, and intuitive viewing experience." },
              ].map((feature, i) => (
            <ScrollAppear>
            <Box
              key={i}
              role="article"
              aria-label={feature.title}
              sx={{
                backgroundColor: "#343131", // bg-homecard
                borderColor: "border.main", // border-border
                borderRadius: 2, // rounded-lg
                height: "260px",
                p: 9, // p-6
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out, color 0.2s ease-out",
                transform: "translateZ(0)", // transform-gpu
    
                "&:hover": {
                  transform: "translateY(-4px)", // hover:-translate-y-1
                  boxShadow: (theme) =>
                    `0px 10px 20px -5px ${theme.palette.primary.main}20`, // hover:shadow-xl + hover:shadow-primary/20
                  "& h3, & p": {
                  },
                },
              }}
            >
            <Typography variant='h2'
              component="h3"
              sx={{
                fontSize: "1.875rem", // text-3xl  
                color: "var(--main-text-color)", // text-main-text-color
                mb: 4, // mb-5 ≈ 20px
                transition: "color 0.2s ease-out",
                color: "#FFB22C",
                fontWeight: "800",
                textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)"
                  }}
                >
                  {feature.title}
            </Typography>

            <Typography
              sx={{
                fontSize: "16px", // text-lg
                color: "var(--main-text-color)",
                transition: "color 0.2s ease-out",
                 }}
              >
              {feature.desc}
            </Typography>
          </Box>
          </ScrollAppear>

          ))}
        </div>
      </Box>
    </Box>
    </ScrollGlowGradient>
  );
}