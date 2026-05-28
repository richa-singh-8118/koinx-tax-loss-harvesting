import React from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = "Analyzing portfolio & tax regulations..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8">
      {/* Premium Orbiting Glowing Spinner */}
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-brandBlue-500/10"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-brandBlue-500 border-r-brandBlue-600 animate-spin shadow-cardGlow"></div>
        <div className="absolute inset-2 rounded-full border-4 border-b-brandGreen-500 border-l-transparent animate-spin duration-700"></div>
      </div>
      
      <p className="text-slate-400 font-medium animate-pulse tracking-wide text-sm">{message}</p>
      
      {/* Skeletons to mimic the holdings list loading */}
      <div className="w-full max-w-4xl mt-12 space-y-4 opacity-50">
        <div className="h-8 bg-slate-800/40 rounded animate-pulse w-1/4"></div>
        <div className="space-y-2">
          <div className="h-14 bg-slate-800/30 rounded animate-pulse w-full"></div>
          <div className="h-14 bg-slate-800/30 rounded animate-pulse w-full"></div>
          <div className="h-14 bg-slate-800/30 rounded animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  );
};
