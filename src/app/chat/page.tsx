'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Stack,
  Button,
} from '@mui/material';
import { MovieCard } from '@/components/cards/movie-card';
import { ShowCard } from '@/components/cards/show-card';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { ChatContainer } from '@/components/chat/chat-container';
import { ChatInput } from '@/components/chat/chat-input';
import { keyframes } from "@mui/system"; // <-- import keyframes her"
import { ChatMessage } from '@/components/chat/chat-message';
import useChat from '@/hooks/useChat';
import type { ChatResponse } from '@/interfaces/interface';

type ChatRole = 'user' | 'assistant';
type ChatItem = {
  id: string;
  role: ChatRole;
  content: string;
  data?: any;
  timestamp: Date;
};

const SUGGESTIONS = [
  "I want something funny to watch",
  "Recommend a thriller for tonight",
  "What's good for a lazy Sunday?",
  "I love sci‑fi movies, what should I watch?",
];

/* ANIMATE KEYFRAME */
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

export default function Chat() {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      },
    ]);
    setInput('');
  };

  // useChat hook handles the network call and common state
  const { sendMessage, loading: chatLoading } = useChat();

  const sendToAi = async (userText: string, history: ChatItem[]) => {
    setLoading(true);
    try {
      const historyPayload = history.map((h) => ({ role: h.role, content: h.content }));
      const data: ChatResponse | any = await sendMessage(userText, historyPayload);

      if (data?.recommendations) {
        const greeting = data.greeting ? String(data.greeting) : '';
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: greeting || (data.recommendations.length ? 'Here are some suggestions:' : ''),
            data: { recommendations: data.recommendations },
            timestamp: new Date(),
          },
        ]);
      } else if (data?.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: String(data.reply),
            timestamp: new Date(),
          },
        ]);
      } else if (data?.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: String(data.error),
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Sorry, I could not generate a reply.',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `Error: ${String(e?.message ?? e)}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box className="bg-linear-to-b from-black to-[#B85252]"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundSize: '200% 200%',
        backgroundPosition: '50% 0%',
      }}
    >

      <style>
        {`
      @keyframes pulse {
        0% { background-position: 50% 0%; }
        50% { background-position: 10% 50%; } /* moves gradient down */
        100% { background-position: 50% 0%; }  /* moves gradient back up */
      }

      /* Scrollbars: chat vertical and horizontal scrollers */
      .chat-scroll::-webkit-scrollbar { width: 12px; }
      .chat-scroll::-webkit-scrollbar-track { background: #0f0f0f; border-radius: 12px; }
      .chat-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#5a5a5a,#2b2b2b); border-radius: 12px; border: 3px solid #0f0f0f; }
      .chat-scroll { scrollbar-width: thin; scrollbar-color: #5a5a5a #0f0f0f; }

      .horiz-scroll::-webkit-scrollbar { height: 12px; }
      .horiz-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg,#6b6b6b,#2b2b2b); border-radius: 10px; border: 3px solid transparent; background-clip: padding-box; }
      .horiz-scroll { -webkit-overflow-scrolling: touch; }

      /* Buttons: improve contrast and tactile affordance */
      .MuiButton-root { text-transform: none; padding: 8px 14px; border-radius: 10px; font-weight: 600; }
      .MuiButton-outlined { border-color: rgba(255,255,255,0.08); color: #fff; background: rgba(255,255,255,0.01); }
      .MuiButton-outlined:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.03); box-shadow: 0 8px 24px rgba(0,0,0,0.6); transform: translateY(-2px); }
      .MuiButton-containedPrimary { background: linear-gradient(90deg,#a855f7,#ff7ab6); color: #fff; box-shadow: 0 8px 30px rgba(168,85,247,0.14); }
      .MuiButton-containedPrimary:hover { filter: brightness(1.02); transform: translateY(-1px); }

      /* Card readability tweaks */
      .MuiCardContent-root .MuiTypography-body2, .MuiCardContent-root p { color: #d9d9d9; }

      /* Slightly lift the input area to make it visually distinct */
      .chat-input-bar { backdrop-filter: blur(8px); }

    `}
      </style>

      <Container maxWidth="lg" sx={{ pt: 4, pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          {/* <AutoAwesomeRoundedIcon sx={{ color: '#a855f7' }} /> */}
          <Typography variant="h1" color="secondary" sx={{
            textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)",
            animation: `${fadeSlideUp2} 1s ease-in-out forwards`,}}>
            CineChat
          </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary" sx={{
          textShadow: "2px 2px 11.3px rgba(255, 255, 255, 0.6)",
           animation: `${fadeSlideUp2} 1s ease-in-out forwards`,}}>
          Describe your mood or preferences, and I’ll recommend the perfect Movies or TV Shows
        </Typography>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          pb: 2, 
          overflow: 'hidden',
          animation: `${fadeSlideUp} 1s ease-in-out forwards`, }}
      >
          <ChatContainer sx={{ flex: 1 }}>
          <Box className="chat-scroll" sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
            {messages.length === 0 ? (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Stack spacing={3} alignItems="center" sx={{ textAlign: 'center', maxWidth: 520 }}>
                  {/* <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: 'rgba(168,85,247,0.12)',
                      border: '1px solid #333333',
                    }}
                  >
                    <AutoAwesomeRoundedIcon sx={{ color: '#a855f7' }} />
                  </Box> */}
                  <Stack spacing={1}>
                    <Typography variant="h2" color="text.primary" sx={{
                      textShadow: "2px 2px 11.3px rgba(255, 255, 255, 0.6)",
                      animation: `${fadeSlideUp} 1s ease-in-out forwards`,}}>
                      Welcome to {''} 
                      <Typography variant="inherit" color="secondary" component="span" sx={{ 
                        fontWeight: 'bold', 
                        textShadow: "2px 2px 11.3px rgba(255, 189, 76, 0.6)",
                        animation: `${fadeSlideUp} 1s ease-in-out forwards`, }}>
                        CineChat!
                      </Typography>
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{
                      animation: `${fadeSlideUp2} 1s ease-in-out forwards`,
                    }}>
                      Tell me about your mood, favorite genres, or what kind of movie or show you’re
                      looking for, and I’ll suggest something perfect for you.
                    </Typography>
                  </Stack>
                  <Stack spacing={1.25} sx={{ width: '100%' }}>
                    {SUGGESTIONS.map((s) => (
                      <Button
                        key={s}
                        variant="outlined"
                        onClick={() => handleSuggestion(s)}
                        sx={{
                          justifyContent: 'flex-start',
                          color: '#e5e5e5',
                          borderColor: '#333333',
                          textTransform: 'none',
                          backgroundColor: '#4E4E4E',
                          animation: `${fadeSlideUp2} 1s ease-in-out forwards`,
                          '&:hover': {
                            borderColor: '#444',
                            backgroundColor: 'rgba(255,255,255,0.06)',
                          },
                        }}
                      >
                        {s}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            ) : (
              <>
                {messages.map((m) => (
                  <div key={m.id}>
                    <ChatMessage role={m.role} content={m.content} timestamp={m.timestamp} />
                    {m.data?.recommendations && (
                      <Box sx={{ mt: 2, mb: 2 }}>
                        {/* Horizontal magazine-style scroller */}
                        <Box
                          sx={{
                            mt: 2,
                            display: 'flex',
                            gap: 3,
                            alignItems: 'flex-start',
                            overflowX: 'auto',
                            py: 2,
                            px: 1,
                            // enable smooth snap behavior for a magazine feel
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                          }}
                          className="horiz-scroll"
                        >
                          {m.data.recommendations.map((r: any, idx: number) => (
                            <Box
                              key={idx}
                              sx={{
                                flex: '0 0 320px',
                                scrollSnapAlign: 'start',
                                minWidth: 260,
                              }}
                            >
                              {r.type === 'movie' ? (
                                <MovieCard movie={r.item} />
                              ) : (
                                <ShowCard show={r.item} />
                              )}
                              {r.reason && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                  {r.reason}
                                </Typography>
                              )}
                            </Box>
                          ))}
                        </Box>

                        {/* "See more" links: point to browse pages with last user query */}
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                          {/** Find the last user message to use as search query */}
                          {(() => {
                            const lastUser = [...messages].reverse().find((ms) => ms.role === 'user');
                            const q = lastUser ? encodeURIComponent(lastUser.content) : '';
                            return (
                              <>
                                <Button variant="outlined" href={`/browse/movies${q ? `?q=${q}` : ''}`}>
                                  See more movies
                                </Button>
                                <Button variant="outlined" href={`/browse/shows${q ? `?q=${q}` : ''}`}>
                                  See more shows
                                </Button>
                              </>
                            );
                          })()}
                        </Box>
                      </Box>
                    )}
                  </div>
                ))}
              </>
            )}
            <div ref={messagesEndRef} />
          </Box>
        </ChatContainer>
      </Container>

      {/* Sticky input bar */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          width: '100%',
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(10,10,10,0.7)',
          borderTop: '1px solid #333333',
          py: 1.25,
          animation: `${fadeSlideUp} 1s ease-in-out forwards`,

        }}
      >
        <Container maxWidth="lg">
            <ChatInput value={input} onChange={setInput} onSubmit={async () => {
            const text = input.trim();
            if (!text) return;
            // append user message locally, then send to AI
            const userMsg: ChatItem = {
              id: crypto.randomUUID(),
              role: 'user',
              content: text,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, userMsg]);
            setInput('');
            await sendToAi(text, [...messages, userMsg]);
          }} disabled={loading} />
        </Container>
      </Box>
    </Box>
  );
}