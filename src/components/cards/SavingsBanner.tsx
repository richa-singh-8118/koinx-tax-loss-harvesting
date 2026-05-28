import { formatINR } from '../../utils/currency';
import { Sparkles, Lightbulb, PiggyBank } from 'lucide-react';

interface SavingsBannerProps {
  savings: number;
  preGains: number;
  postGains: number;
  selectedCount: number;
}

export const SavingsBanner: React.FC<SavingsBannerProps> = ({
  savings,
  preGains,
  postGains,
  selectedCount,
}) => {
  if (savings <= 0) return null;

  // Real-world additional metric: Crypto tax in India is 30%, or standard stock tax STCG 15%, LTCG 10%.
  // We can show the taxable gain reduction AND the actual flat tax saved (assuming standard 15% STCG or 30% flat tax) as helpful insights!
  const estimatedTaxSaved = savings * 0.30; // 30% VDA crypto tax rate

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-r from-brandGreen-600/10 via-brandGreen-500/15 to-brandGreen-600/5 border border-brandGreen-500/30 rounded-2xl p-6 shadow-lg shadow-brandGreen-950/5 animate-pulse-slow">
      {/* Background graphic elements */}
      <div className="absolute right-0 top-0 w-48 h-48 bg-brandGreen-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-brandGreen-500/5 rounded-full blur-3xl -mb-16 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brandGreen-500 text-darkBg rounded-2xl shadow-md shadow-brandGreen-500/20 shrink-0">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-brandGreen-500/20 text-brandGreen-400 text-[10px] font-extrabold uppercase rounded tracking-wider border border-brandGreen-500/20">
                Tax Optimization Active
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {selectedCount} position{selectedCount > 1 ? 's' : ''} harvested
              </span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-black text-white mt-1.5 leading-tight tracking-tight">
              You're going to save <span className="text-brandGreen-400 underline decoration-brandGreen-500/50 decoration-wavy decoration-2">{formatINR(savings)}</span>
            </h2>
            
            <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              By offsetting gains with selected loss positions, you reduce your taxable realized capital gains from <span className="font-semibold text-slate-200">{formatINR(preGains)}</span> to <span className="font-semibold text-slate-200">{formatINR(postGains)}</span>.
            </p>
          </div>
        </div>

        {/* Action Callout Box */}
        <div className="flex flex-col xs:flex-row md:flex-col justify-center items-stretch xs:items-center md:items-end gap-3 shrink-0 self-stretch md:self-auto border-t md:border-t-0 md:border-l border-brandGreen-500/20 pt-4 md:pt-0 md:pl-6">
          <div className="text-left md:text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Estimated 30% Flat Tax Saved
            </span>
            <span className="text-lg font-extrabold text-brandGreen-400 block tabular-nums">
              ≈ {formatINR(estimatedTaxSaved)}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brandGreen-400 bg-brandGreen-500/10 px-3 py-1.5 rounded-lg border border-brandGreen-500/10">
            <Sparkles className="w-3.5 h-3.5 animate-spin duration-1000" />
            <span>Optimal Tax Efficiency</span>
          </div>
        </div>
      </div>

      {/* Advisory Note */}
      <div className="mt-4 pt-3 border-t border-brandGreen-500/10 flex items-start gap-2 text-[10px] text-slate-400">
        <Lightbulb className="w-4 h-4 text-brandYellow-500 shrink-0 mt-0.5" />
        <p>
          Tax-loss harvesting requires selling the selected assets before the end of the financial year to realize these losses on-chain/in-portfolio. Consult your tax professional for complete compliance guidelines.
        </p>
      </div>
    </div>
  );
};
export default SavingsBanner;
