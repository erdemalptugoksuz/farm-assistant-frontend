import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (selectedOptions: string[]) => void;
  className?: string;
}

export function MultiSelect({ options, onChange, className }: MultiSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    const updatedOptions = selectedOptions.includes(value) ? selectedOptions.filter((option) => option !== value) : [...selectedOptions, value];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className={cn('grid grid-cols-2 gap-[10px]', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => toggleOption(option.value)}
          className={cn(
            'pl-[20px] py-[11px] rounded-md text-sm font-medium transition-colors w-[250px] text-start h-[50px]',
            selectedOptions.includes(option.value) ? 'bg-[#788596] text-white border-[#80e2a4] border-2' : 'bg-[#94A3B8] text-white'
          )}
        >
          {option.label}
          {selectedOptions.includes(option.value) && <Check className="ml-2 h-4 w-4 inline text-[#80e2a4]" />}
        </button>
      ))}
    </div>
  );
}
