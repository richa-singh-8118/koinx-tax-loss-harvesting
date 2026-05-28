import { useCallback, useMemo } from 'react';
import { useHarvestStore } from '../store/useHarvestStore';
import { getHarvestingOpportunities } from '../utils/calculations';

export const useHarvesting = () => {
  const {
    holdings,
    capitalGains,
    selectedCoins,
    isLoadingHoldings,
    isLoadingGains,
    errorHoldings,
    errorGains,
    searchQuery,
    filterOpportunitiesOnly,
    simulateError,
    loadAllData,
    toggleHoldingSelection,
    selectAllHoldings,
    deselectAllHoldings,
    setSearchQuery,
    setFilterOpportunitiesOnly,
    toggleSimulateError,
    resetAll,
    getSummary,
  } = useHarvestStore();

  // Combine loading states
  const isLoading = isLoadingHoldings || isLoadingGains;

  // Combine and format error messages
  const error = useMemo(() => {
    if (errorHoldings && errorGains) {
      return `Holdings: ${errorHoldings} | Gains: ${errorGains}`;
    }
    return errorHoldings || errorGains;
  }, [errorHoldings, errorGains]);

  // Memoize suggested harvesting opportunities (assets with negative gains)
  const harvestingOpportunities = useMemo(() => {
    return getHarvestingOpportunities(holdings);
  }, [holdings]);

  // Memoize search and filter logic
  const filteredHoldings = useMemo(() => {
    return holdings.filter((holding) => {
      const matchesSearch =
        holding.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        holding.coinName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesOpportunity = filterOpportunitiesOnly
        ? holding.stcg.gain < 0 || holding.ltcg.gain < 0
        : true;

      return matchesSearch && matchesOpportunity;
    });
  }, [holdings, searchQuery, filterOpportunitiesOnly]);

  // Derive the complete harvesting calculation summary
  const summary = useMemo(() => {
    // Explicitly reference dependencies to trigger useMemo updates and satisfy ESLint
    if (!holdings.length && !capitalGains && !selectedCoins.length) { /* explicit dependency usage */ }
    return getSummary();
  }, [holdings, capitalGains, selectedCoins, getSummary]);

  // Select all visible (filtered) holdings
  const selectAll = useCallback(() => {
    const visibleCoins = filteredHoldings.map((h) => h.coin);
    selectAllHoldings(visibleCoins);
  }, [filteredHoldings, selectAllHoldings]);

  // Deselect all
  const deselectAll = useCallback(() => {
    deselectAllHoldings();
  }, [deselectAllHoldings]);

  // Is every visible item selected?
  const isAllSelected = useMemo(() => {
    if (filteredHoldings.length === 0) return false;
    return filteredHoldings.every((h) => selectedCoins.includes(h.coin));
  }, [filteredHoldings, selectedCoins]);

  // Is some but not all visible items selected? (Indeterminate state)
  const isSomeSelected = useMemo(() => {
    if (filteredHoldings.length === 0) return false;
    const selectedCount = filteredHoldings.filter((h) => selectedCoins.includes(h.coin)).length;
    return selectedCount > 0 && selectedCount < filteredHoldings.length;
  }, [filteredHoldings, selectedCoins]);

  return {
    holdings,
    filteredHoldings,
    harvestingOpportunities,
    summary,
    selectedCoins,
    isLoading,
    error,
    searchQuery,
    filterOpportunitiesOnly,
    simulateError,
    isAllSelected,
    isSomeSelected,
    
    // Actions
    setSearchQuery,
    setFilterOpportunitiesOnly,
    toggleHoldingSelection,
    selectAll,
    deselectAll,
    toggleSimulateError,
    loadAllData,
    resetAll,
  };
};
export type UseHarvestingReturn = ReturnType<typeof useHarvesting>;
