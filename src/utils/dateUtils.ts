export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Formats a date according to the given format string.
 * Supported formats: "dd/mm/yyyy", "mm/dd/yyyy", "yyyy-mm-dd"
 * Defaults to "dd/mm/yyyy" if no format is provided.
 */
export const formatDate = (date: Date, format: string = "dd/mm/yyyy"): string => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  switch (format) {
    case "mm/dd/yyyy":
      return `${month}/${day}/${year}`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    case "dd/mm/yyyy":
    default:
      return `${day}/${month}/${year}`;
  }
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const generateYearOptions = (minYear?: number, maxYear?: number) => {
  const currentYear = new Date().getFullYear();
  const startYear = minYear || currentYear - 100;
  const endYear = maxYear || currentYear + 10;
  
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push({ value: year, label: year.toString() });
  }
  return years;
};

export const generateMonthOptions = () => {
  return MONTHS.map((month, index) => ({
    value: index,
    label: month
  }));
};

export const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (minDate && date < minDate) return false;
  if (maxDate && date > maxDate) return false;
  return true;
};