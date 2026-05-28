/**
 * Formats a coin quantity to a clean decimal representation.
 * Example: 0.08500000 -> 0.085
 */
export const formatCoinAmount = (amount: number, maxDecimals: number = 6): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  }).format(amount);
};

/**
 * Formats a percentage change.
 * Example: 0.155 -> +15.5%
 */
export const formatPercent = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${value >= 0 ? '+' : ''}${formatter.format(value)}`;
};
