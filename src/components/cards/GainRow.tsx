import React from 'react';
import { formatINR } from '../../utils/currency';

interface GainRowProps {
  label: string;
  value: number;
  type?: 'neutral' | 'profit' | 'loss' | 'net' | 'total';
  subText?: string;
}

export const GainRow: React.FC<GainRowProps> = ({
  label,
  value,
  type = 'neutral',
  subText,
}) => {
  const getStyles = () => {
    switch (type) {
      case 'profit':
        return {
          text: 'text-brandGreen-500 font-medium glow-text-green',
          bg: '',
        };
      case 'loss':
        return {
          text: 'text-brandRed-500 font-medium glow-text-red',
          bg: '',
        };
      case 'net':
        return {
          text: `font-bold ${value >= 0 ? 'text-brandGreen-500 glow-text-green' : 'text-brandRed-500 glow-text-red'}`,
          bg: 'bg-slate-950/20 px-3 py-1.5 rounded-lg border border-slate-800/40',
        };
      case 'total':
        return {
          text: `text-lg font-extrabold ${value >= 0 ? 'text-brandGreen-500 glow-text-green' : 'text-brandRed-500 glow-text-red'}`,
          bg: 'bg-brandBlue-600/5 px-4 py-2.5 rounded-xl border border-brandBlue-500/20 shadow-sm shadow-brandBlue-500/5',
        };
      default:
        return {
          text: 'text-slate-200 font-medium',
          bg: '',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`flex items-center justify-between py-2 transition-all duration-200 ${styles.bg}`}
    >
      <div className="flex flex-col">
        <span className={`text-sm ${type === 'total' ? 'font-bold text-slate-100' : 'text-slate-400 font-medium'}`}>
          {label}
        </span>
        {subText && <span className="text-[10px] text-slate-500 font-medium mt-0.5">{subText}</span>}
      </div>

      <span className={`text-sm tabular-nums tracking-tight ${styles.text}`}>
        {/* For losses, we display it as a negative value or clean abs depending on view, but standard is signed or standard currency formatting */}
        {type === 'loss' && value > 0 ? `-${formatINR(value)}` : formatINR(value)}
      </span>
    </div>
  );
};
export default GainRow;
