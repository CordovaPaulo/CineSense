export function formatCurrency(
  amount?: number | null,
  locale = 'en-US',
  currency = 'USD',
  maximumFractionDigits = 0
): string {
  if (amount == null || amount <= 0) return '—';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(amount);
}