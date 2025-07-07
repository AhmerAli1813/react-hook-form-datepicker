import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { DatePickerProps } from '../types/datepicker.types';
import { formatDate } from '../utils/dateUtils';
import Calendar from './Calendar';

const DatePicker: React.FC<DatePickerProps> = ({
  control,
  className = '',
  inputName,
  selectedDate,
  onChange,
  label,
  placeholder = 'Select a date',
  minDate,
  maxDate,
  isClearable = true,
  disabled = false,
  error,
  format="dd/mm/yyyy",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (date: Date | null, fieldOnChange?: (value: Date | null) => void) => {
    if (fieldOnChange) {
      fieldOnChange(date);
    }
    if (onChange) {
      onChange(date);
    }
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent, fieldOnChange?: (value: Date | null) => void) => {
    e.stopPropagation();
    if (fieldOnChange) {
      fieldOnChange(null);
    }
    if (onChange) {
      onChange(null);
    }
  };

  const handleMonthChange = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
  };

  const handleYearChange = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const renderDatePicker = (field?: any, hasError?: boolean) => {
    const currentValue = field?.value || selectedDate;
    
    return (
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            w-full px-3 py-2 bg-white border rounded-lg shadow-sm
            flex items-center justify-between text-left transition-all duration-200
            ${hasError || error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-slate-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500'
            }
            ${disabled 
              ? 'cursor-not-allowed opacity-50' 
              : 'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer'
            }
            ${className}
          `}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label="Open date picker"
        >
          <div className="flex items-center flex-1">
            <span className={currentValue ? 'text-slate-900  ' : 'text-slate-500'}>
              {currentValue ? formatDate(currentValue, format) : placeholder}
            </span>
            <CalendarIcon className="w-5 h-5 text-slate-500 ms-auto me-1" />
          </div>
          
          {currentValue && !disabled && isClearable && (
            <button
              type="button"
              onClick={(e) => handleClear(e, field?.onChange)}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Clear date"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <Calendar
              currentDate={currentDate}
              selectedDate={currentValue}
              onDateSelect={(date) => handleDateSelect(date, field?.onChange)}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full mb-3">
      {/* Label */}
      {label && (
        <label className=" font-semibold mb-2 ">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Date Picker Component */}
      <div className="relative">
        {control ? (
          <Controller
            name={inputName}
            control={control}
            rules={{
              required: required ? `${label || 'This field'} is required` : false
            }}
            render={({ field, fieldState }) => (
              <div>
                {renderDatePicker(field, !!fieldState.error)}
                {/* Error message display */}
                {fieldState.error && (
                  <div className="mt-2">
                    <span className="text-red-500 text-sm font-medium">
                      {fieldState.error.message}
                    </span>
                  </div>
                )}
              </div>
            )}
          />
        ) : (
          <div>
            {renderDatePicker()}
            {/* Manual error display (when not using react-hook-form) */}
            {error && (
              <div className="mt-2">
                <span className="text-red-500 text-sm font-medium">{error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;