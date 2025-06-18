import { useState } from 'react';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DateSelector = ({ selectedDate, onDateChange }: DateSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Convert string to Date object
  const dateObj = selectedDate ? new Date(selectedDate) : new Date();
  
  // Format date for display
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Navigate to adjacent dates
  const goToPreviousDay = () => {
    const prevDay = new Date(dateObj);
    prevDay.setDate(prevDay.getDate() - 1);
    onDateChange(prevDay.toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const nextDay = new Date(dateObj);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    onDateChange(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm">
        {/* Previous day button */}
        <button
          onClick={goToPreviousDay}
          className="flex items-center justify-center h-10 w-10 hover:bg-gray-100 rounded-l-lg"
          aria-label="Previous day"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Date display */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none min-w-[180px]"
        >
          <span className="font-medium">{formattedDate}</span>
        </button>
        
        {/* Next day button */}
        <button
          onClick={goToNextDay}
          className="flex items-center justify-center h-10 w-10 hover:bg-gray-100 rounded-r-lg"
          aria-label="Next day"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Date picker dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            
            <div className="flex justify-between mt-2">
              <button
                onClick={goToToday}
                className="px-3 py-1 text-sm bg-nba-blue text-white rounded-md hover:bg-blue-700"
              >
                Today
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;