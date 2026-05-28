import TableHeader from './TableHeader';
import HoldingRow from './HoldingRow';
import { EmptyState } from '../common/EmptyState';
import type { UseHarvestingReturn } from '../../hooks/useHarvesting';
import { Search, Sparkles, Filter, X } from 'lucide-react';

interface HoldingsTableProps {
  harvesting: UseHarvestingReturn;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ harvesting }) => {
  const {
    filteredHoldings,
    selectedCoins,
    searchQuery,
    filterOpportunitiesOnly,
    isAllSelected,
    isSomeSelected,
    setSearchQuery,
    setFilterOpportunitiesOnly,
    toggleHoldingSelection,
    selectAll,
    deselectAll,
    resetAll,
  } = harvesting;

  const totalPositions = harvesting.holdings.length;
  const filteredCount = filteredHoldings.length;
  const selectedCount = selectedCoins.length;

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  return (
    <div className="w-full glass-card rounded-2xl overflow-hidden shadow-premium border border-slate-800/80">
      {/* Search and Filters Header */}
      <div className="p-6 border-b border-darkBorder bg-slate-900/35 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>Portfolio Asset Holdings</span>
            <span className="px-2 py-0.5 text-xs bg-slate-800 text-slate-400 rounded-full font-semibold border border-slate-700">
              {totalPositions}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Select positions with unrealized losses to offset gains and reduce tax liability.
          </p>
        </div>

        {/* Selected Counter and quick action */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-3 px-4 py-1.5 bg-brandBlue-600/10 border border-brandBlue-500/25 rounded-lg animate-fade-in self-start md:self-auto">
            <span className="text-xs font-semibold text-brandBlue-500">
              {selectedCount} of {totalPositions} selected
            </span>
            <button
              onClick={deselectAll}
              className="p-1 hover:bg-brandBlue-600/20 text-brandBlue-500 hover:text-brandBlue-400 rounded transition-colors"
              title="Deselect all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Controls Container */}
      <div className="px-6 py-4 bg-slate-900/20 border-b border-darkBorder/40 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search coin by name or symbol (e.g. BTC, Solana)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 bg-slate-950/80 border border-slate-800 focus:border-brandBlue-500/50 hover:border-slate-700 text-slate-100 placeholder-slate-500 text-sm rounded-xl focus:ring-1 focus:ring-brandBlue-500/25 transition-all duration-200 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-500 hover:text-slate-300 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Suggestion Filter Toggle */}
        <button
          onClick={() => setFilterOpportunitiesOnly(!filterOpportunitiesOnly)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
            filterOpportunitiesOnly
              ? 'bg-brandYellow-500/10 border-brandYellow-500/30 text-brandYellow-500 shadow-sm shadow-brandYellow-500/5'
              : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${filterOpportunitiesOnly ? 'animate-pulse text-brandYellow-500' : ''}`} />
          <span>Suggested Harvesting Opportunities</span>
          {filterOpportunitiesOnly && (
            <span className="ml-1 px-1.5 py-0.2 bg-brandYellow-500 text-darkBg font-bold text-[10px] rounded-full">
              Losses
            </span>
          )}
        </button>
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto w-full scrollbar-thin">
        {filteredCount === 0 ? (
          <EmptyState
            title={filterOpportunitiesOnly ? "No Harvesting Candidates" : "No Assets Match"}
            description={
              filterOpportunitiesOnly
                ? "Excellent! You don't have any holdings currently trading at an unrealized loss to harvest."
                : "We couldn't find any positions matching your query. Try adjusting your filters or typing another ticker."
            }
            onReset={resetAll}
          />
        ) : (
          <table className="w-full border-collapse">
            <TableHeader
              checked={isAllSelected}
              indeterminate={isSomeSelected}
              onSelectAll={handleSelectAllChange}
            />
            <tbody className="divide-y divide-darkBorder/30">
              {filteredHoldings.map((holding) => (
                <HoldingRow
                  key={holding.coin}
                  holding={holding}
                  isSelected={selectedCoins.includes(holding.coin)}
                  onToggle={() => toggleHoldingSelection(holding.coin)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Table Footer Stats Info */}
      <div className="p-4 bg-slate-900/10 border-t border-darkBorder/30 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing {filteredCount} of {totalPositions} total assets.
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" />
          <span>Use checkbox to include in harvesting calculation.</span>
        </div>
      </div>
    </div>
  );
};
export default HoldingsTable;
