/**
 * Formats a number to INR currency string using the Indian numbering system.
 * Example: 70200.88 -> ₹70,200.88
 * Example: 1000000 -> ₹10,00,000.00
 */
export const formatINR = (value: number, includeDecimals: boolean = true): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  });
  return formatter.format(value);
};

/**
 * Formats gains or losses with appropriate sign (+/-) and color support.
 */
export const formatGainLoss = (value: number, includeDecimals: boolean = true): string => {
  const formatted = formatINR(Math.abs(value), includeDecimals);
  return `${value >= 0 ? '+' : '-'}${formatted}`;
};
