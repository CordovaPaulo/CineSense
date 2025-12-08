import fetch from 'node-fetch';

function extractJson(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const candidate = (fenced ? fenced[1] : text).trim();
    try {
      return JSON.parse(candidate);
    } catch {
      const unescaped = candidate.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/,\s*([}\]])/g, '$1');
      return JSON.parse(unescaped);
    }
  }
}

export async function parseContentsFallback(prompt: string, schema?: any) {
  if (process.env.BYTEZ_API_KEY || process.env.BYTEZ_API_URL) {
    const { parseContentsBytez } = await import('./fallback-bytez');
    return await parseContentsBytez(prompt, schema);
  }

  const url = process.env.FALLBACK_API_URL;
  const key = process.env.FALLBACK_API_KEY;
  if (!url) throw new Error('FALLBACK_API_URL not configured');

  const body = { prompt, ...(schema ? { schema } : {}) } as any;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (key) headers['Authorization'] = `Bearer ${key}`;

  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return extractJson(text);
  }
}

export default { parseContentsFallback };
