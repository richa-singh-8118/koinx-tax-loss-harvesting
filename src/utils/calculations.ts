import type { CapitalGains, Holding } from '../types';

/**
 * Calculates net gains (profits - losses)
 */
export const calculateNetGain = (profits: number, losses: number): number => {
  return profits - losses;
};

/**
 * Calculates realised capital gains (Net STCG + Net LTCG)
 */
export const calculateRealisedCapitalGains = (netStcg: number, netLtcg: number): number => {
  return netStcg + netLtcg;
};

/**
 * Calculates post-harvesting capital gains values based on selected holdings.
 * 
 * Business Logic:
 * When selecting a holding:
 * - If stcg.gain > 0: add to stcg.profits
 * - If stcg.gain < 0: add abs(stcg.gain) to stcg.losses
 * - If ltcg.gain > 0: add to ltcg.profits
 * - If ltcg.gain < 0: add abs(ltcg.gain) to ltcg.losses
 */
export const calculateHarvestedCapitalGains = (
  preHarvest: CapitalGains,
  selectedHoldings: Holding[]
): CapitalGains => {
  let stcgProfitsAdd = 0;
  let stcgLossesAdd = 0;
  let ltcgProfitsAdd = 0;
  let ltcgLossesAdd = 0;

  selectedHoldings.forEach((holding) => {
    // STCG
    if (holding.stcg.gain > 0) {
      stcgProfitsAdd += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      stcgLossesAdd += Math.abs(holding.stcg.gain);
    }

    // LTCG
    if (holding.ltcg.gain > 0) {
      ltcgProfitsAdd += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      ltcgLossesAdd += Math.abs(holding.ltcg.gain);
    }
  });

  return {
    stcg: {
      profits: preHarvest.stcg.profits + stcgProfitsAdd,
      losses: preHarvest.stcg.losses + stcgLossesAdd,
    },
    ltcg: {
      profits: preHarvest.ltcg.profits + ltcgProfitsAdd,
      losses: preHarvest.ltcg.losses + ltcgLossesAdd,
    },
  };
};

/**
 * Calculates tax savings.
 * 
 * Formula:
 * Savings = PreHarvestRealisedCapitalGains - PostHarvestRealisedCapitalGains
 * 
 * Note: Under Indian Tax laws, short term capital losses offset short/long term capital gains,
 * and long term capital losses offset long term capital gains. This formula captures the reduction
 * in taxable gains. To make it extremely realistic, we calculate the estimated monetary tax savings
 * (e.g. 30% flat tax on VDA/crypto under Indian budget section 115BBH or standard tax bracket).
 * Since the prompt specifies 'Savings = PreHarvestRealisedCapitalGains - PostHarvestRealisedCapitalGains'
 * we will compute the absolute taxable gain reduction. We can also display the actual tax saved 
 * (30% for crypto in India!) as a premium feature!
 */
export const calculateSavings = (
  preHarvestRealised: number,
  postHarvestRealised: number
): number => {
  return preHarvestRealised - postHarvestRealised;
};

/**
 * Identify negative gain positions that represent harvesting opportunities
 */
export const getHarvestingOpportunities = (holdings: Holding[]) => {
  return holdings.filter(h => h.stcg.gain < 0 || h.ltcg.gain < 0);
};
