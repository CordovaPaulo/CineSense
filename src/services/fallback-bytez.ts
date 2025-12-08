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

export async function parseContentsBytez(prompt: string, schema?: any) {
  const sdkKey = process.env.BYTEZ_API_KEY;
  if (sdkKey) {
    try {
      const BytezModule = await import('bytez.js');
      const Bytez = (BytezModule && (BytezModule.default || BytezModule)) as any;
      const sdk = new Bytez(sdkKey);
      const modelId = process.env.BYTEZ_MODEL_ID ?? 'Qwen/Qwen3-4B-Instruct-2507';
      const model = sdk.model(modelId);

      const input = [
        {
          role: 'user',
          content: prompt,
        },
      ];


      const res: any = await model.run(input);

      if (process.env.AI_FALLBACK_DEBUG === '1') {
        console.log('[fallback-bytez] SDK raw response:', JSON.stringify(res).slice(0, 2000));
      }

      if (res?.error) {
        throw new Error(String(res.error));
      }

      let text = '';
      if (Array.isArray(res.output)) {
        text = res.output.map((o: any) => (o?.content ? o.content : JSON.stringify(o))).join('\n');
      } else if (typeof res.output === 'string') {
        text = res.output;
      } else if (res.output && typeof res.output === 'object') {
        if (typeof res.output.content === 'string') {
          text = res.output.content;
        } else {
          text = res.output.text ?? JSON.stringify(res.output);
        }
      } else {
        text = JSON.stringify(res.output ?? res);
      }

      try {
        return JSON.parse(text);
      } catch {
        return extractJson(text);
      }
    } catch (sdkErr) {
    }
  }

  const url = process.env.BYTEZ_API_URL ?? process.env.FALLBACK_API_URL;
  const key = process.env.BYTEZ_API_KEY ?? process.env.FALLBACK_API_KEY;
  if (!url) throw new Error('BYTEZ_API_URL or FALLBACK_API_URL not configured for ByteZ fallback');

  const body = {
    input: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    ...(schema ? { schema } : {}),
  };

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (key) headers['Authorization'] = `Bearer ${key}`;

  if (process.env.AI_FALLBACK_DEBUG === '1') {
    console.log('[fallback-bytez] HTTP POST', { url, body: schema ? '[schema]' : '[prompt-only]' });
  }

  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  const text = await res.text();

  if (process.env.AI_FALLBACK_DEBUG === '1') {
    console.log('[fallback-bytez] HTTP raw response (truncated):', String(text).slice(0, 2000));
  }

  try {
    return JSON.parse(text);
  } catch {
    return extractJson(text);
  }
}

export default { parseContentsBytez };
