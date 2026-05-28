import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Holdings Found",
  description = "No digital assets in your portfolio match your active search terms or filters.",
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-darkCard/40 border border-darkBorder/40 rounded-xl max-w-lg mx-auto my-8">
      <div className="p-4 bg-slate-800/50 rounded-full text-slate-400 mb-4 border border-slate-700/50">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Filters & Search
        </button>
      )}
    </div>
  );
};
