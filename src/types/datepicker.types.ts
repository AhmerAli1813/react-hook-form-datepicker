import { Control } from 'react-hook-form';

export interface DatePickerProps {
  control?: Control<any, any>; // Control from react-hook-form
  className?: string;
  inputName: string; // Made this required to align with react-hook-form requirements
  selectedDate?: Date | null; // The currently selected date
  onChange?: (date: Date | null) => void; // Callback when the date changes
  label?: string; // Optional label for the date picker
  placeholder?: string; // Optional placeholder
  minDate?: Date; // Minimum selectable date
  maxDate?: Date; // Maximum selectable date
  isClearable?: boolean; // Allows clearing the selected date
  disabled?: boolean; // Disables the date picker
  error?: string; // Optional error message
  required?: boolean;
  format?:"dd/mm/yyyy"|"mm/dd/yyyy"|"yyyy-mm-dd";
}

export interface CalendarProps {
  currentDate: Date;
  selectedDate?: Date | null;
  onDateSelect: (date: Date | null) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
    format?:string;

}

export interface DropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
  value: string;
  options: Array<{ value: string | number; label: string }>;
  onSelect: (value: string | number) => void;
  className?: string;
}