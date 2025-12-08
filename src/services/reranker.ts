import type { AnalysisResult } from '@/interfaces/interface';
import { cacheGet, cacheSet } from '@/lib/analysis-cache';
import crypto from 'crypto';

function safeNumber(v: unknown, fallback = 0) {
  return typeof v === 'number' && !Number.isNaN(v) ? v : fallback;
}

export function rerankRecommendations(
  candidates: Array<any>,
  analysis: AnalysisResult,
  topK = 10
): Array<any> {
  // try quick cache return (use a stable cache key including key signals)
  try {
    const ids = candidates.map((c) => c?.item?.id ?? JSON.stringify(c?.item)).join(',');
    const keyObj = {
      ids,
      intent: analysis.intent,
      topics: analysis.topics,
      personalization: (analysis as any).personalizationScore ?? null,
      sentiment: analysis.sentiment?.score ?? null,
      explicitFilters: analysis.explicitFilters ?? null,
      safety: analysis.safety ?? null,
      topK,
    };
    const cacheKey = crypto.createHash('sha256').update(JSON.stringify(keyObj)).digest('hex');
    const cached = cacheGet<any[]>(cacheKey);
    if (Array.isArray(cached) && cached.length) {
      if (process.env.AI_FALLBACK_DEBUG === '1') {
        // eslint-disable-next-line no-console
        console.log('[reranker] cache hit', cacheKey, `returning ${Math.min(cached.length, topK)} items`);
      }
      return cached.slice(0, topK);
    }
  } catch (_err) {}

  const personalization = safeNumber((analysis as any).personalizationScore, 0);
  const sentimentScore = safeNumber(analysis.sentiment?.score, 0);
  const intent = (analysis.intent || '').toLowerCase();
  const topics = Array.isArray(analysis.topics) ? analysis.topics.map((t) => String(t).toLowerCase()) : [];

  const now = Date.now();

  const scored = candidates.map((c) => {
    const item = c.item ?? {};

    const vote = safeNumber(item.vote_average, 5) / 10; // 0..1
    const popularity = Math.min(1, Math.log(1 + safeNumber(item.popularity, 0)) / 10);

    let recencyScore = 0;
    const dateStr = item.release_date ?? item.first_air_date ?? null;
    if (typeof dateStr === 'string' && dateStr.length >= 4) {
      const t = Date.parse(dateStr);
      if (!Number.isNaN(t)) {
        const daysOld = Math.max(0, (now - t) / (1000 * 60 * 60 * 24));
        recencyScore = 1 / (1 + Math.log1p(daysOld + 1) / 365);
      }
    }

    const baseScore = 0.45 * vote + 0.35 * popularity + 0.2 * recencyScore;

    // genre overlap
    let genreBoost = 0;
    if (Array.isArray(item.genres) && item.genres.length && topics.length) {
      const genreNames = item.genres.map((g: any) => String(g.name || g).toLowerCase());
      const overlap = topics.filter((t) => genreNames.includes(t)).length;
      genreBoost = Math.min(0.35, 0.08 * overlap);
    }

    let langBoost = 0;
    if (typeof item.original_language === 'string' && topics.length) {
      const tJoined = topics.join(' ');
      if (tJoined.includes(item.original_language.toLowerCase())) langBoost = 0.06;
    }

    let topical = 0;
    const text = ((item.title ?? '') + ' ' + (item.overview ?? '')).toLowerCase();
    for (const t of topics) {
      if (!t) continue;
      if (text.includes(t)) topical += 0.05;
    }
    topical = Math.min(0.25, topical);

    const personalizationMultiplier = 1 + 0.25 * personalization;
    const sentimentMultiplier = 1 + sentimentScore * 0.12;

    let intentMultiplier = 1;
    if (intent.includes('mood')) intentMultiplier += 0.06;
    if (intent.includes('classic') || intent.includes('older')) intentMultiplier += 0.04;

    let safetyPenalty = 1;
    if (analysis.safety?.nsfw && item.adult) safetyPenalty = 0.2;

    let score = baseScore + genreBoost + langBoost + topical;
    const preMultiplier = score;
    score = score * personalizationMultiplier * sentimentMultiplier * intentMultiplier * safetyPenalty;

    const explainParts: string[] = [];
    explainParts.push(`base=${preMultiplier.toFixed(3)}`);
    if (genreBoost > 0) explainParts.push(`genre+${genreBoost.toFixed(3)}`);
    if (langBoost > 0) explainParts.push(`lang+${langBoost.toFixed(3)}`);
    if (topical > 0) explainParts.push(`topic+${topical.toFixed(3)}`);
    if (personalizationMultiplier !== 1) explainParts.push(`personalization*x${personalizationMultiplier.toFixed(3)}`);
    if (sentimentMultiplier !== 1) explainParts.push(`sentiment*x${sentimentMultiplier.toFixed(3)}`);
    if (intentMultiplier !== 1) explainParts.push(`intent*x${intentMultiplier.toFixed(3)}`);
    if (safetyPenalty !== 1) explainParts.push(`safety*x${safetyPenalty.toFixed(3)}`);
    explainParts.push(`final=${score.toFixed(3)}`);

    return { ...c, _score: score, _explanation: explainParts.join('; ') };
  });

  scored.sort((a, b) => (b._score ?? 0) - (a._score ?? 0));
  const out = scored.slice(0, topK);

  // cache the reranked result briefly (2 minutes)
  try {
    const ids = candidates.map((c) => c?.item?.id ?? JSON.stringify(c?.item)).join(',');
    const keyObj = {
      ids,
      intent: analysis.intent,
      topics: analysis.topics,
      personalization: (analysis as any).personalizationScore ?? null,
      sentiment: analysis.sentiment?.score ?? null,
      explicitFilters: analysis.explicitFilters ?? null,
      safety: analysis.safety ?? null,
      topK,
    };
    const cacheKey = crypto.createHash('sha256').update(JSON.stringify(keyObj)).digest('hex');
    cacheSet(cacheKey, out, 120);
    if (process.env.AI_FALLBACK_DEBUG === '1') {
      // eslint-disable-next-line no-console
      console.log('[reranker] cached rerank result', cacheKey, `items=${out.length}`);
    }
  } catch (_err) {}

  return out;
}

export default { rerankRecommendations };
