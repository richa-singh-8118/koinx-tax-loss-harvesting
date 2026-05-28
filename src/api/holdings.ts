import holdingsData from '../data/holdings.json';
import type { Holding } from '../types';

/**
 * Mock API to fetch current holdings.
 * Simulates a real API response with a 1000ms delay.
 * Allows triggering an error state for testing error UI.
 */
export const fetchHoldings = async (shouldFail: boolean = false): Promise<Holding[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch holdings. The server returned a 500 Internal Server Error."));
      } else {
        resolve(holdingsData as Holding[]);
      }
    }, 1000);
  });
};
