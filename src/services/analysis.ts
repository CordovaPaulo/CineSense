import { parseContents } from './gemini';
import type { AnalysisResult } from '@/interfaces/interface';
import { cacheGet, cacheSet } from '@/lib/analysis-cache';
import crypto from 'crypto';

/**
 * POC analysis service.
 * Uses the existing Gemini wrapper (`parseContents`) to extract structured signals
 * from a user's chat message and history. This is intentionally conservative
 * and returns a safe default if parsing fails.
 */

export async function analyzeConversation(opts: {
  message: string;
  history?: string[];
  userId?: string;
}): Promise<AnalysisResult> {
  const { message, history = [] } = opts;

  // caching: avoid repeated LLM calls for identical message+history
  try {
    const cacheKey = crypto.createHash('sha256').update(JSON.stringify({ message, history })).digest('hex');
    const hit = cacheGet<AnalysisResult>(cacheKey);
    if (hit) return hit;
  } catch (_err) {
    // ignore cache errors
  }

  const prompt = `You are an assistant that analyzes user messages and conversation history.
Return a JSON object with the following fields:\n
- intent: a short intent label (e.g., "find_movie", "mood", "explain", "filter")\n- sentiment: { score: number between -1 and 1, label: "negative"|"neutral"|"positive" }\n- topics: an array of topical keywords or short phrases\n- explicitFilters: object with obvious constraints (e.g., { min_rating: 7, max_runtime: 120 })\n- safety: object with boolean flags for nsfw, violence, adult\n- confidence: number between 0 and 1\n- explanation: short string describing the analysis\n
User message:\n${message}\n
History:\n${JSON.stringify(history)}\n
Respond ONLY with valid JSON.`;

  try {
    const parsed = await parseContents(prompt);
    // Basic validation and normalization
    const intent = typeof parsed?.intent === 'string' ? parsed.intent : 'unknown';
    const sentiment = parsed?.sentiment
      ? { score: Number(parsed.sentiment.score ?? 0), label: parsed.sentiment.label ?? 'neutral' }
      : { score: 0, label: 'neutral' };
    const topics = Array.isArray(parsed?.topics) ? parsed.topics.map(String) : [];
    const explicitFilters = parsed?.explicitFilters ?? {};
    const safety = parsed?.safety ?? {};
    const confidence = typeof parsed?.confidence === 'number' ? parsed.confidence : 0.6;
    const explanation = parsed?.explanation ? String(parsed.explanation) : '';

    const result: AnalysisResult = {
      intent,
      sentiment,
      topics,
      explicitFilters,
      safety,
      confidence,
      explanation,
    };

    // try to cache the analysis result for 5 minutes
    try {
      const cacheKey = crypto.createHash('sha256').update(JSON.stringify({ message, history })).digest('hex');
      cacheSet(cacheKey, result, 300);
    } catch (_err) {}

    return result;
  } catch (err) {
    // Fail-safe analysis result
    return {
      intent: 'unknown',
      sentiment: { score: 0, label: 'neutral' },
      topics: [],
      explicitFilters: {},
      safety: {},
      confidence: 0.2,
      explanation: 'analysis-failed',
    };
  }
}
