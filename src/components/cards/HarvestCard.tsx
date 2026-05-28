import { formatINR } from '../../utils/currency';

interface GainsSection {
  profits: number;
  losses: number;
  net: number;
}

interface HarvestCardProps {
  title: string;
  stcg: GainsSection;
  ltcg: GainsSection;
  realised: number;
  isPostHarvest: boolean;
  selectedCount?: number;
}

export const HarvestCard: React.FC<HarvestCardProps> = ({
  title,
  stcg,
  ltcg,
  realised,
  isPostHarvest,
}) => {
  const isBlue = isPostHarvest;

  const textStyle = isBlue ? "text-white" : "text-slate-200";
  const labelStyle = isBlue ? "text-white/90" : "text-slate-400";
  const headerStyle = isBlue ? "text-white" : "text-slate-100";

  return (
    <div className={`rounded-xl p-6 sm:p-8 shadow-lg h-full flex flex-col justify-between transition-colors ${
      isBlue ? 'bg-brandBlue-500' : 'bg-[#181C27] border border-slate-800/50'
    }`}>
      <div>
        <h3 className={`text-lg font-bold mb-8 ${headerStyle}`}>{title}</h3>
        
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-y-4 mb-8">
          {/* Header Row */}
          <div></div>
          <div className={`text-right text-[15px] font-semibold ${headerStyle}`}>Short-term</div>
          <div className={`text-right text-[15px] font-semibold ${headerStyle}`}>Long-term</div>

          {/* Profits Row */}
          <div className={`text-[15px] font-medium ${labelStyle}`}>Profits</div>
          <div className={`text-right text-[15px] font-medium tabular-nums ${textStyle}`}>{formatINR(stcg.profits)}</div>
          <div className={`text-right text-[15px] font-medium tabular-nums ${textStyle}`}>{formatINR(ltcg.profits)}</div>

          {/* Losses Row */}
          <div className={`text-[15px] font-medium ${labelStyle}`}>Losses</div>
          <div className={`text-right text-[15px] font-medium tabular-nums ${textStyle}`}>{formatINR(stcg.losses)}</div>
          <div className={`text-right text-[15px] font-medium tabular-nums ${textStyle}`}>{formatINR(ltcg.losses)}</div>

          {/* Net Row */}
          <div className={`text-[15px] font-medium mt-1 ${labelStyle}`}>Net Capital Gains</div>
          <div className={`text-right text-[15px] font-medium tabular-nums mt-1 ${textStyle}`}>{formatINR(stcg.net)}</div>
          <div className={`text-right text-[15px] font-medium tabular-nums mt-1 ${textStyle}`}>{formatINR(ltcg.net)}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-6">
        <span className={`text-[17px] font-bold ${headerStyle}`}>
          {isPostHarvest ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}
        </span>
        <span className={`text-[22px] font-bold tabular-nums ${headerStyle}`}>
          {formatINR(realised)}
        </span>
      </div>
    </div>
  );
};
export default HarvestCard;
