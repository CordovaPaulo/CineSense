import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

function extractJson(text: string): any {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = (fenced ? fenced[1] : text).trim();

  const grabBalanced = (s: string, open: "{" | "[", close: "}" | "]") => {
    const start = s.indexOf(open);
    if (start < 0) return null;
    let depth = 0;
    for (let i = start; i < s.length; i++) {
      if (s[i] === open) depth++;
      else if (s[i] === close) {
        depth--;
        if (depth === 0) return s.slice(start, i + 1);
      }
    }
    return null;
  };

  const jsonish =
    grabBalanced(candidate, "{", "}") ??
    grabBalanced(candidate, "[", "]") ??
    candidate;

  try {
    return JSON.parse(jsonish);
  } catch {
    const unescaped = jsonish
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(unescaped);
  }
}

export async function parseContents(prompt: string, schema?: any) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
      ...(schema ? { responseSchema: schema } : {}),
    },
  });
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      return JSON.parse(text);
    } catch {
      return extractJson(text);
    }
  } catch (err: any) {
    // If Gemini fails (quota/network), fall back to configured inference API
    if (process.env.AI_FALLBACK_DEBUG === '1') {
      // eslint-disable-next-line no-console
      console.log('[gemini] primary model failed, attempting fallback', String(err?.message ?? err));
    }
    try {
      const { parseContentsFallback } = await import('./fallback-model');
      const out = await parseContentsFallback(prompt, schema);
      if (process.env.AI_FALLBACK_DEBUG === '1') {
        // eslint-disable-next-line no-console
        console.log('[gemini] fallback result type', typeof out === 'object' ? 'object' : typeof out);
        try {
          // eslint-disable-next-line no-console
          console.log('[gemini] fallback raw:', JSON.stringify(out).slice(0, 2000));
        } catch (_) {
          // ignore circular
        }
      }
        // If fallback returned an object, try to normalize common shapes into parsed JSON
        if (out && typeof out === 'object') {
          // If already contains recommendations, assume correct
          if ((out as any).recommendations) return out;

          // Common keys that may contain textual JSON
          const candidateTexts: string[] = [];
          // direct content field (e.g., { role, content: '...json...' })
          if (typeof (out as any).content === 'string') candidateTexts.push((out as any).content);
          if (typeof (out as any).text === 'string') candidateTexts.push((out as any).text);
          if (typeof (out as any).output === 'string') candidateTexts.push((out as any).output);
          if (Array.isArray((out as any).output)) {
            candidateTexts.push((out as any).output.map((o: any) => (o?.content ?? o?.text ?? JSON.stringify(o))).join('\n'));
          }
          if (Array.isArray((out as any).choices)) {
            candidateTexts.push((out as any).choices.map((c: any) => c?.message?.content ?? c?.text ?? JSON.stringify(c)).join('\n'));
          }

          // last resort: stringify the object
          candidateTexts.push(JSON.stringify(out));

          for (const t of candidateTexts) {
            if (!t) continue;
            try {
              return JSON.parse(t);
            } catch {
              try {
                const parsed = extractJson(t);
                if (parsed) return parsed;
              } catch {
                // continue
              }
            }
          }
        }

        return out;
    } catch (fbErr: any) {
      if (process.env.AI_FALLBACK_DEBUG === '1') {
        // eslint-disable-next-line no-console
        console.log('[gemini] fallback failed', String(fbErr?.message ?? fbErr));
      }
      throw err;
    }
  }
}
