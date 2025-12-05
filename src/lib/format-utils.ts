/**
 * Utility functions for formatting various data types
 * Used across the application for consistent display formatting
 */

/**
 * Format runtime in minutes to hours and minutes display
 * @param minutes - Runtime in minutes
 * @returns Formatted string like "2h 30m" or "45m"
 */
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${remainingMinutes}m`;
  }
}

/**
 * Format runtime minutes with "min" suffix
 * Handles single numbers or arrays (takes first element)
 * @param minutes - Runtime in minutes (number or number array)
 * @returns Formatted string like "45 min" or "—" if not available
 */
export function formatRuntimeMinutes(minutes: number | number[] | undefined): string {
  if (!minutes) return '—';
  const runtime = Array.isArray(minutes) ? minutes[0] : minutes;
  if (!runtime) return '—';
  return `${runtime} min`;
}

/**
 * Format currency amount to USD format
 * @param amount - Numeric amount to format (can be undefined/null)
 * @returns Formatted currency string like "$1,234,567" or "N/A"
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (!amount || amount === 0) {
    return 'N/A';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
