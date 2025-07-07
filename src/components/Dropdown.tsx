import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { DropdownProps } from '../types/datepicker.types';

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onToggle,
  label,
  value,
  options,
  onSelect,
  className = ''
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
    if (event.key === 'Escape' && isOpen) {
      onToggle();
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm 
                   hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                   flex items-center justify-between text-left"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Select ${label}`}
      >
        <span className="text-slate-700 font-medium">{value}</span>
        <ChevronDown 
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 
                        rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto animate-in fade-in 
                        slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                onToggle();
              }}
              className="w-full px-4 py-2.5 text-left hover:bg-blue-50 hover:text-blue-700 
                         focus:bg-blue-50 focus:text-blue-700 focus:outline-none
                         transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
              role="option"
              aria-selected={option.value.toString() === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;