import React from 'react';
import SelectAllCheckbox from './SelectAllCheckbox';

interface TableHeaderProps {
  checked: boolean;
  indeterminate: boolean;
  onSelectAll: () => void;
  disabled?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  checked,
  indeterminate,
  onSelectAll,
  disabled = false,
}) => {
  return (
    <thead className="bg-[#0B0E14] border-b border-slate-800 z-20">
      <tr>
        <th className="px-6 py-4 text-left w-12 border-b-2 border-[#161C2A]">
          <SelectAllCheckbox
            checked={checked}
            indeterminate={indeterminate}
            onChange={onSelectAll}
            disabled={disabled}
          />
        </th>
        <th className="px-6 py-4 text-left text-[14px] font-semibold text-white border-b-2 border-[#161C2A]">
          Asset
        </th>
        <th className="px-6 py-3 text-center text-[14px] font-semibold text-white border-b-2 border-[#161C2A]">
          <div className="flex flex-col items-center leading-tight">
            <span>Holdings</span>
            <span className="text-[11px] text-slate-400 font-normal">Avg Buy Price</span>
          </div>
        </th>
        <th className="px-6 py-4 text-center text-[14px] font-semibold text-white border-b-2 border-[#161C2A]">
          Current Price
        </th>
        <th className="px-6 py-4 text-center text-[14px] font-semibold text-white border-b-2 border-[#161C2A]">
          Short-Term
        </th>
        <th className="px-6 py-4 text-center text-[14px] font-semibold text-white border-b-2 border-[#161C2A]">
          Long-Term
        </th>
        <th className="px-6 py-4 text-right text-[14px] font-semibold text-white border-b-2 border-[#161C2A]">
          Amount to Sell
        </th>
      </tr>
    </thead>
  );
};
export default TableHeader;
