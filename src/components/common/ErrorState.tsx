import React from 'react';
import { AlertTriangle, RefreshCw, ShieldAlert } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  simulateError: boolean;
  onToggleSimulate: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  simulateError,
  onToggleSimulate,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8 text-center">
      <div className="p-4 bg-brandRed-500/10 rounded-full text-brandRed-500 mb-6 border border-brandRed-500/20 animate-bounce">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <h2 className="text-xl font-bold text-slate-100 mb-2">Syncing Interrupted</h2>
      <p className="text-slate-400 max-w-md mb-8 text-sm leading-relaxed">
        {message || "We encountered an unexpected error while loading your real-time tax data. Please check your network connection and try again."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2.5 bg-brandBlue-600 hover:bg-brandBlue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-brandBlue-600/20 transition-all duration-200 group active:scale-95"
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          Retry Connection
        </button>

        {simulateError && (
          <button
            onClick={onToggleSimulate}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg font-medium transition-all duration-200 active:scale-95"
          >
            <ShieldAlert className="w-4 h-4 text-brandYellow-500" />
            Disable Error Simulation
          </button>
        )}
      </div>

      <div className="mt-8 text-xs text-slate-500 max-w-xs">
        Tip: The Error Simulation mode allows recruiters to evaluate application resiliency. Disable it to load mock data normally.
      </div>
    </div>
  );
};
