import capitalGainsData from '../data/capitalGains.json';
import type { CapitalGains } from '../types';

/**
 * Mock API to fetch capital gains.
 * Simulates a real API response with an 800ms delay.
 * Allows triggering an error state for testing error UI.
 */
export const fetchCapitalGains = async (shouldFail: boolean = false): Promise<CapitalGains> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch pre-harvesting capital gains data from server."));
      } else {
        resolve(capitalGainsData as CapitalGains);
      }
    }, 800);
  });
};
