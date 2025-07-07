import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarProps } from '../types/datepicker.types';
import { 
  MONTHS, 
  DAYS, 
  getDaysInMonth, 
  getFirstDayOfMonth, 
  isSameDay, 
  isToday,
  generateYearOptions,
  generateMonthOptions,
  isDateInRange,
  formatDate,
} from '../utils/dateUtils';
import Dropdown from './Dropdown';

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
  onYearChange,
  minDate,
  maxDate
}) => {
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const yearOptions = generateYearOptions(
    minDate?.getFullYear(),
    maxDate?.getFullYear()
  );
  const monthOptions = generateMonthOptions();

  const handlePrevMonth = () => {
    if (month === 0) {
      onYearChange(year - 1);
      onMonthChange(11);
    } else {
      onMonthChange(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      onYearChange(year + 1);
      onMonthChange(0);
    } else {
      onMonthChange(month + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    if (isDateInRange(date, minDate, maxDate)) {
      onDateSelect(date);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isTodayDate = isToday(date);
      const isDisabled = !isDateInRange(date, minDate, maxDate);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          className={`
            h-6 w-6 rounded text-xs font-medium transition-all duration-200
            hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-1
            ${isSelected 
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
              : 'text-slate-700'
            }
            ${isTodayDate && !isSelected 
              ? 'bg-blue-50 text-blue-600 border border-blue-200' 
              : ''
            }
            ${isDisabled 
              ? 'text-slate-300 cursor-not-allowed hover:bg-transparent hover:text-slate-300' 
              : 'cursor-pointer'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-slate-200 p-2 w-full max-w-[280px] min-w-[200px]">
      {/* Header with dropdowns and navigation */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 hover:bg-slate-100 rounded transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>

        <div className="flex items-center space-x-1 flex-1 mx-1 min-w-0">
          <Dropdown
            isOpen={monthDropdownOpen}
            onToggle={() => setMonthDropdownOpen(!monthDropdownOpen)}
            label="month"
            value={MONTHS[month]}
            options={monthOptions}
            onSelect={(value) => onMonthChange(value as number)}
            className="flex-1 min-w-0 text-xs  py-0.5"
          />
          
          <Dropdown
            isOpen={yearDropdownOpen}
            onToggle={() => setYearDropdownOpen(!yearDropdownOpen)}
            label="year"
            value={year.toString()}
            options={yearOptions}
            onSelect={(value) => onYearChange(value as number)}
            className="flex-1 min-w-0 text-xs  py-0.5"
          />
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-slate-100 rounded transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map((day) => (
          <div key={day} className="h-5 flex items-center justify-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {renderCalendarDays()}
      </div>

      {/* Today indicator */}
      <div className="mt-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onDateSelect(new Date())}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium 
                   hover:underline focus:outline-none focus:underline mt-1"
        >
          Today: {formatDate(new Date(), "dd/mm/yyyy")}
        </button>
      </div>
    </div>
  );
};

export default Calendar;