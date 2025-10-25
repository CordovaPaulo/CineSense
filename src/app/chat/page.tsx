'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Stack,
  Button,
} from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { ChatContainer } from '@/components/chat/chat-container';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessage } from '@/components/chat/chat-message';

type ChatRole = 'user' | 'assistant';
type ChatItem = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
};

const SUGGESTIONS = [
  "I want something funny to watch",
  "Recommend a thriller for tonight",
  "What's good for a lazy Sunday?",
  "I love sci‑fi movies, what should I watch?",
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [input, setInput] = useState('');
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

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background:
          'linear-gradient(180deg, #000000 0%, #0f0a0a 50%, #6e0a0a 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 4, pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          {/* <AutoAwesomeRoundedIcon sx={{ color: '#a855f7' }} /> */}
          <Typography variant="h1" color="secondary">
            CineSense Chat
          </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Describe your mood or preferences, and I’ll recommend the perfect {''} 
            <Typography variant="inherit" color="secondary" component="span" sx={{ fontWeight: 'bold' }}>
                Movies
            </Typography> 
            {''} or {''} 
            <Typography variant="inherit" color="secondary" component="span" sx={{ fontWeight: 'bold' }}>
              TV Shows
            </Typography>
        </Typography>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, pb: 2, overflow: 'hidden' }}
      >
        <ChatContainer sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
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
                    <Typography variant="h2" color="text.primary">
                      Welcome to {''} 
                      <Typography variant="inherit" color="secondary" component="span" sx={{ fontWeight: 'bold' }}>
                        CineSense!
                      </Typography>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
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
                          backgroundColor: 'rgba(255,255,255,0.04)',
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
                  <ChatMessage
                    key={m.id}
                    role={m.role}
                    content={m.content}
                    timestamp={m.timestamp}
                  />
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
        }}
      >
        <Container maxWidth="lg">
          <ChatInput value={input} onChange={setInput} onSubmit={handleSubmit} />
        </Container>
      </Box>
    </Box>
  );
}