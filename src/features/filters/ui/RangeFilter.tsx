import { DropMenuIcon } from '@/shared/ui/icons';
import { getYearRange } from '@/shared/utils/getYearRange';
import React, { useState } from 'react';

interface YearRangeFilterProps {
  onChange: (from: number, to: number) => void;
}

const years = getYearRange();

export const RangeFilter: React.FC<YearRangeFilterProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [fromYear, setFromYear] = useState<number>(years[0]);
  const [toYear, setToYear] = useState<number>(years[years.length - 1]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFrom = parseInt(e.target.value, 10);
    setFromYear(newFrom);
    if (newFrom > toYear) {
      setToYear(newFrom);
    }
    onChange(newFrom, Math.max(newFrom, toYear));
  };

  const handleToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTo = parseInt(e.target.value, 10);
    setToYear(newTo);
    if (newTo < fromYear) {
      setFromYear(newTo);
    }
    onChange(Math.min(fromYear, newTo), newTo);
  };

  return (
    <div className="mb-4 w-full rounded-lg border border-gray-200 bg-white shadow-md">
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-4"
        onClick={handleToggle}
      >
        <h3 className="text-sm text-gray-800">Year</h3>
        <svg
          className={`h-4 w-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="flex justify-evenly border-t border-gray-200 pr-3 pl-3">
          <div className="w-full pt-2 pb-2">
            <div className="relative w-full">
              <select
                value={fromYear}
                onChange={handleFromChange}
                className="w-full cursor-pointer appearance-none rounded-md py-2 pr-8 pl-1 text-sm focus:outline-none"
              >
                {years.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className={year > toYear ? 'text-gray-400' : 'text-black'}
                  >
                    {year}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
                <DropMenuIcon isOpen={false} />
              </div>
            </div>
          </div>
          <div className="mx-2 w-px bg-gray-300" />
          <div className="relative w-full pt-2 pb-2">
            <select
              value={toYear}
              onChange={handleToChange}
              className="w-full cursor-pointer appearance-none rounded-md py-2 pr-8 pl-1 text-sm focus:outline-none"
            >
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                  className={year < fromYear ? 'text-gray-400' : 'text-black'}
                >
                  {year}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
              <DropMenuIcon isOpen={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
