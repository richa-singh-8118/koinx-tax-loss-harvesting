import { create } from 'zustand';
import type { Holding, CapitalGains, HarvestingSummary } from '../types';
import { fetchHoldings } from '../api/holdings';
import { fetchCapitalGains } from '../api/capitalGains';
import { 
  calculateNetGain, 
  calculateRealisedCapitalGains, 
  calculateHarvestedCapitalGains, 
  calculateSavings 
} from '../utils/calculations';

interface HarvestStore {
  holdings: Holding[];
  capitalGains: CapitalGains | null;
  selectedCoins: string[];
  isLoadingHoldings: boolean;
  isLoadingGains: boolean;
  errorHoldings: string | null;
  errorGains: string | null;
  searchQuery: string;
  filterOpportunitiesOnly: boolean;
  simulateError: boolean;

  // Actions
  fetchHoldingsData: () => Promise<void>;
  fetchGainsData: () => Promise<void>;
  loadAllData: () => Promise<void>;
  toggleHoldingSelection: (coin: string) => void;
  selectAllHoldings: (coins: string[]) => void;
  deselectAllHoldings: () => void;
  setSearchQuery: (query: string) => void;
  setFilterOpportunitiesOnly: (filter: boolean) => void;
  toggleSimulateError: () => void;
  resetAll: () => void;

  // Derived State Getters (calculated on the fly for reliability)
  getSummary: () => HarvestingSummary | null;
}

export const useHarvestStore = create<HarvestStore>((set, get) => ({
  holdings: [],
  capitalGains: null,
  selectedCoins: [],
  isLoadingHoldings: false,
  isLoadingGains: false,
  errorHoldings: null,
  errorGains: null,
  searchQuery: '',
  filterOpportunitiesOnly: false,
  simulateError: false,

  fetchHoldingsData: async () => {
    set({ isLoadingHoldings: true, errorHoldings: null });
    try {
      const data = await fetchHoldings(get().simulateError);
      set({ holdings: data, isLoadingHoldings: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch holdings';
      set({ errorHoldings: message, isLoadingHoldings: false });
    }
  },

  fetchGainsData: async () => {
    set({ isLoadingGains: true, errorGains: null });
    try {
      const data = await fetchCapitalGains(get().simulateError);
      set({ capitalGains: data, isLoadingGains: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch capital gains';
      set({ errorGains: message, isLoadingGains: false });
    }
  },

  loadAllData: async () => {
    set({ selectedCoins: [] }); // Reset selections on refresh
    await Promise.all([
      get().fetchHoldingsData(),
      get().fetchGainsData()
    ]);
  },

  toggleHoldingSelection: (coin: string) => {
    set((state) => {
      const selectedCoins = [...state.selectedCoins];
      const index = selectedCoins.indexOf(coin);
      if (index > -1) {
        selectedCoins.splice(index, 1);
      } else {
        selectedCoins.push(coin);
      }
      return { selectedCoins };
    });
  },

  selectAllHoldings: (coins: string[]) => {
    set({ selectedCoins: coins });
  },

  deselectAllHoldings: () => {
    set({ selectedCoins: [] });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setFilterOpportunitiesOnly: (filter: boolean) => {
    set({ filterOpportunitiesOnly: filter });
  },

  toggleSimulateError: () => {
    set((state) => ({ simulateError: !state.simulateError }));
  },

  resetAll: () => {
    set({
      selectedCoins: [],
      searchQuery: '',
      filterOpportunitiesOnly: false,
    });
    get().loadAllData();
  },

  getSummary: (): HarvestingSummary | null => {
    const { holdings, capitalGains, selectedCoins } = get();
    if (!capitalGains || holdings.length === 0) return null;

    // 1. Calculate Pre-Harvest Summary
    const preNetStcg = calculateNetGain(capitalGains.stcg.profits, capitalGains.stcg.losses);
    const preNetLtcg = calculateNetGain(capitalGains.ltcg.profits, capitalGains.ltcg.losses);
    const preRealised = calculateRealisedCapitalGains(preNetStcg, preNetLtcg);

    // 2. Map selected coins to actual holdings
    const selectedHoldings = holdings.filter((h) => selectedCoins.includes(h.coin));

    // 3. Calculate Post-Harvest capital gains values
    const postHarvestGains = calculateHarvestedCapitalGains(capitalGains, selectedHoldings);
    
    const postNetStcg = calculateNetGain(postHarvestGains.stcg.profits, postHarvestGains.stcg.losses);
    const postNetLtcg = calculateNetGain(postHarvestGains.ltcg.profits, postHarvestGains.ltcg.losses);
    const postRealised = calculateRealisedCapitalGains(postNetStcg, postNetLtcg);

    // 4. Savings = PreHarvestRealised - PostHarvestRealised
    const savings = calculateSavings(preRealised, postRealised);

    return {
      preHarvest: {
        stcg: {
          profits: capitalGains.stcg.profits,
          losses: capitalGains.stcg.losses,
          net: preNetStcg,
        },
        ltcg: {
          profits: capitalGains.ltcg.profits,
          losses: capitalGains.ltcg.losses,
          net: preNetLtcg,
        },
        realised: preRealised,
      },
      postHarvest: {
        stcg: {
          profits: postHarvestGains.stcg.profits,
          losses: postHarvestGains.stcg.losses,
          net: postNetStcg,
        },
        ltcg: {
          profits: postHarvestGains.ltcg.profits,
          losses: postHarvestGains.ltcg.losses,
          net: postNetLtcg,
        },
        realised: postRealised,
      },
      savings,
    };
  },
}));
