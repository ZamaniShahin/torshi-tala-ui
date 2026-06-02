/**
 * Persian-digit + price formatting. All conversions are deterministic (explicit
 * digit map, not toLocaleString) so server and client render identical strings —
 * no hydration mismatch, no dependence on platform locale data.
 */

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** Convert ASCII digits in a string (or number) to Persian digits. */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/**
 * Format a Toman amount for display: grouped by thousands with the Arabic
 * thousands separator (٬) and Persian digits — e.g. 180000 → «۱۸۰٬۰۰۰».
 * The «تومان» word is rendered separately in the markup (as in the design).
 */
export function formatToman(toman: number): string {
  const grouped = Math.round(toman)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toPersianDigits(grouped);
}

/**
 * Toman → Rial (ISO-4217 IRR) for structured data. 1 Toman = 10 Rial.
 * Returns a plain integer string with Western digits, e.g. 180000 → "1800000".
 */
export function tomanToRial(toman: number): string {
  return String(Math.round(toman) * 10);
}
