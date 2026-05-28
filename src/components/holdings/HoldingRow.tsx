import type { Holding } from '../../types';
import { formatINR, formatGainLoss } from '../../utils/currency';
import { formatCoinAmount } from '../../utils/format';

interface HoldingRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: () => void;
}

export const HoldingRow: React.FC<HoldingRowProps> = ({
  holding,
  isSelected,
  onToggle,
}) => {
  const isLossSTCG = holding.stcg.gain < 0;
  const isLossLTCG = holding.ltcg.gain < 0;

  const totalHoldingValue = holding.totalHolding * holding.currentPrice;

  return (
    <tr
      onClick={onToggle}
      className={`border-b border-[#161C2A] cursor-pointer select-none transition-all duration-200 group ${
        isSelected
          ? 'bg-brandBlue-600/5 hover:bg-brandBlue-600/10'
          : 'hover:bg-[#121824]'
      }`}
    >
      {/* Checkbox column */}
      <td className="px-6 py-4.5 text-left" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="w-4 h-4 text-brandBlue-600 bg-slate-800 border-slate-700 rounded focus:ring-brandBlue-500 focus:ring-offset-slate-900 focus:ring-2 cursor-pointer transition-all duration-150"
        />
      </td>

      {/* Asset name column with logo */}
      <td className="px-6 py-4.5">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white overflow-hidden p-0.5">
            <img
              src={holding.logo}
              alt={holding.coinName}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/100x100/1e293b/ffffff?text=${holding.coin}`;
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] text-white">
              {holding.coinName}
            </span>
            <span className="text-[12px] text-slate-500 font-medium leading-none mt-0.5">
              {holding.coin}
            </span>
          </div>
        </div>
      </td>

      {/* Holdings / Avg Price column */}
      <td className="px-6 py-4.5 text-center">
        <div className="flex flex-col items-center">
          <span className="font-medium text-white text-[14px]">
            {formatCoinAmount(holding.totalHolding)} {holding.coin}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">
            {formatINR(holding.averageBuyPrice)}/{holding.coin}
          </span>
        </div>
      </td>

      {/* Current Price Column */}
      <td className="px-6 py-4.5 text-center">
        <span className="font-medium text-white text-[14px]">
          {formatINR(holding.currentPrice)}
        </span>
      </td>

      {/* STCG Column with gains and balance */}
      <td className="px-6 py-4.5 text-center">
        <div className="flex flex-col items-center">
          <span
            className={`font-semibold text-[14px] ${
              holding.stcg.gain === 0
                ? 'text-white'
                : isLossSTCG
                ? 'text-brandRed-500 glow-text-red'
                : 'text-brandGreen-500 glow-text-green'
            }`}
          >
            {holding.stcg.gain === 0 ? formatINR(0) : formatGainLoss(holding.stcg.gain)}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">
            {formatCoinAmount(holding.stcg.balance)} {holding.coin}
          </span>
        </div>
      </td>

      {/* LTCG Column with gains and balance */}
      <td className="px-6 py-4.5 text-center">
        <div className="flex flex-col items-center">
          <span
            className={`font-semibold text-[14px] ${
              holding.ltcg.gain === 0
                ? 'text-white'
                : isLossLTCG
                ? 'text-brandRed-500 glow-text-red'
                : 'text-brandGreen-500 glow-text-green'
            }`}
          >
            {holding.ltcg.gain === 0 ? formatINR(0) : formatGainLoss(holding.ltcg.gain)}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">
            {formatCoinAmount(holding.ltcg.balance)} {holding.coin}
          </span>
        </div>
      </td>

      {/* Amount to Sell Column */}
      <td className="px-6 py-4.5 text-right pr-12">
        {isSelected ? (
          <div className="animate-fade-in flex flex-col items-end">
            <span className="font-semibold text-brandBlue-500 text-[14px]">
              {formatCoinAmount(holding.totalHolding)} {holding.coin}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5">
              ≈ {formatINR(totalHoldingValue)}
            </span>
          </div>
        ) : (
          <span className="text-slate-500 font-medium text-[14px]">—</span>
        )}
      </td>
    </tr>
  );
};
export default HoldingRow;
