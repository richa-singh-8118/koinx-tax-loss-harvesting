import React, { useEffect, useRef } from 'react';

interface SelectAllCheckboxProps {
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export const SelectAllCheckbox: React.FC<SelectAllCheckboxProps> = ({
  checked,
  indeterminate,
  onChange,
  disabled = false,
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      ref={checkboxRef}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="w-4.5 h-4.5 text-brandBlue-600 bg-slate-800/80 border-slate-700 rounded focus:ring-brandBlue-500/50 focus:ring-offset-slate-900 focus:ring-2 cursor-pointer transition-all duration-150"
      title="Select all rows"
    />
  );
};
export default SelectAllCheckbox;
