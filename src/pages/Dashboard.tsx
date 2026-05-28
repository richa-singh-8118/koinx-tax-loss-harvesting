import { useEffect } from 'react';
import { useHarvesting } from '../hooks/useHarvesting';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { HarvestCard } from '../components/cards/HarvestCard';
import { SavingsBanner } from '../components/cards/SavingsBanner';
import { HoldingsTable } from '../components/holdings/HoldingsTable';
import { 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  Plus,
  Info,
  ChevronDown
} from 'lucide-react';
import { formatINR } from '../utils/currency';

export const Dashboard: React.FC = () => {
  const harvesting = useHarvesting();
  
  const {
    isLoading,
    error,
    summary,
    selectedCoins,
    harvestingOpportunities,
    simulateError,
    loadAllData,
    toggleSimulateError,
    toggleHoldingSelection,
    resetAll
  } = harvesting;

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-darkBg text-slate-100 flex items-center justify-center p-6">
        <Loader message="Fetching portfolio holdings & calculating capital gains offsets..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-darkBg text-slate-100 flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 max-w-xl border border-slate-800">
          <ErrorState
            message={error}
            onRetry={loadAllData}
            simulateError={simulateError}
            onToggleSimulate={() => {
              toggleSimulateError();
              setTimeout(() => loadAllData(), 50);
            }}
          />
        </div>
      </div>
    );
  }

  const unselectedOpportunities = harvestingOpportunities.filter(
    (h) => !selectedCoins.includes(h.coin)
  );

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 pb-20 font-sans">
      {/* Top Premium Sticky Navigation Header */}
      <header className="sticky top-0 bg-[#0B0E14]/90 backdrop-blur-md border-b border-slate-800/60 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brandBlue-600 to-brandGreen-500 flex items-center justify-center shadow-lg shadow-brandBlue-600/20">
              <span className="font-black text-white text-base tracking-tighter">K</span>
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight">Koin<span className="text-brandBlue-500">X</span></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                toggleSimulateError();
                setTimeout(() => loadAllData(), 50);
              }}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                simulateError
                  ? 'bg-brandRed-500/10 border-brandRed-500/30 text-brandRed-500 hover:bg-brandRed-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{simulateError ? 'Simulating Error' : 'Simulate API Error'}</span>
            </button>

            <button
              onClick={resetAll}
              className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Title and Intro Section */}
        <div className="flex items-end gap-4 mb-2">
          <h1 className="text-[28px] font-bold text-white tracking-tight leading-none">
            Tax Optimisation
          </h1>
          <a href="#" className="text-brandBlue-500 hover:text-brandBlue-400 text-sm font-medium underline underline-offset-4 mb-1">
            How it works?
          </a>
        </div>

        {/* Important Notes Banner */}
        <div className="bg-[#141C30] border border-[#213158] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-[#1A2540] transition-colors">
          <div className="flex items-center gap-2.5 text-brandBlue-400">
            <Info className="w-[18px] h-[18px]" />
            <span className="font-semibold text-[15px] text-slate-200">Important Notes And Disclaimers</span>
          </div>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </div>

        {/* Dynamic Tax Savings Banner (renders when savings > 0) */}
        {summary && (
          <SavingsBanner
            savings={summary.savings}
            preGains={summary.preHarvest.realised}
            postGains={summary.postHarvest.realised}
            selectedCount={selectedCoins.length}
          />
        )}

        {/* Side-by-Side Comparison Cards Grid */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Pre-Harvesting Card */}
            <HarvestCard
              title="Pre Harvesting"
              stcg={summary.preHarvest.stcg}
              ltcg={summary.preHarvest.ltcg}
              realised={summary.preHarvest.realised}
              isPostHarvest={false}
            />

            {/* Post-Harvesting Card */}
            <HarvestCard
              title="After Harvesting"
              stcg={summary.postHarvest.stcg}
              ltcg={summary.postHarvest.ltcg}
              realised={summary.postHarvest.realised}
              isPostHarvest={true}
              selectedCount={selectedCoins.length}
            />
          </div>
        )}

        {/* Suggested Harvesting Opportunities Box */}
        {unselectedOpportunities.length > 0 && (
          <div className="bg-gradient-to-r from-brandYellow-500/5 to-transparent border border-brandYellow-500/15 rounded-2xl p-6 shadow-md mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brandYellow-500 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-brandYellow-500">
                Suggested Tax-Loss Harvesting Opportunities
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unselectedOpportunities.slice(0, 3).map((opportunity) => {
                const totalLoss = Math.abs(opportunity.stcg.gain + opportunity.ltcg.gain);
                return (
                  <div
                    key={opportunity.coin}
                    onClick={() => toggleHoldingSelection(opportunity.coin)}
                    className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-brandYellow-500/30 rounded-xl cursor-pointer transition-all duration-200 group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={opportunity.logo}
                        alt={opportunity.coinName}
                        className="w-8 h-8 object-contain rounded-full bg-white p-0.5"
                      />
                      <div>
                        <span className="font-bold text-slate-100 group-hover:text-brandYellow-500 transition-colors text-sm">
                          {opportunity.coin}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-brandRed-400 font-semibold block">
                        -{formatINR(totalLoss)} loss
                      </span>
                      <span className="text-[9px] text-brandYellow-500 font-semibold uppercase flex items-center justify-end gap-0.5 mt-0.5">
                        <Plus className="w-2.5 h-2.5" /> Offset Tax
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Portfolio Holdings Section with Search & Select Table */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-white mb-2">Holdings</h2>
          <HoldingsTable harvesting={harvesting} />
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
