export function formatRuntime(minutes?: number | null): string {
  return formatMinutesInternal(minutes);
}

export function formatRuntimeMinutes(runtime?: number | number[] | null): string {
  return formatMinutesInternal(runtime);
}

function formatMinutesInternal(value?: number | number[] | null): string {
  if (value == null) return '—';
  const minutes = Array.isArray(value) ? value[0] : value;
  if (!minutes || minutes < 1) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}