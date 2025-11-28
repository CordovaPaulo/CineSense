"use client";

import { useCallback, useState } from 'react';
import type { ChatResponse } from '@/interfaces/interface';

export function useChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string, history: Array<{ role: string; content: string }>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });
      const data: ChatResponse = await res.json();
      if (!res.ok) {
        const err = (data as any)?.error ?? `API error: ${res.status}`;
        setError(String(err));
        return { error: String(err) } as any;
      }
      return data;
    } catch (e: any) {
      setError(String(e?.message ?? e));
      return { error: String(e?.message ?? e) } as any;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sendMessage,
    loading,
    error,
  } as const;
}

export default useChat;
