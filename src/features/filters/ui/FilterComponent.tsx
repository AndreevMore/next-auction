import { DropMenuIcon } from '@/shared/ui/icons';
import React from 'react';

type SimpleFilterType = 'site' | 'make' | 'model';
interface FilterProps {
  title: string;
  type: SimpleFilterType;
  // type: string;
  data: string[];
  isMulti: boolean;
  isSearch: boolean;
  onChange: (event: FilterChangeEvent) => void;
}

type FilterChangeEvent =
  | { type: 'year'; selectedItems: { year_from: number; year_to: number } }
  | { type: 'site'; selectedItems: string[] }
  | { type: 'make'; selectedItems: string[] }
  | { type: 'model'; selectedItems: string[] };

// interface FilterChangeEvent {
//   type: string;
//   selectedItems: string[];
// }
export const FilterComponent: React.FC<FilterProps> = ({
  title,
  type,
  data,
  isMulti,
  isSearch,
  onChange,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const handleToggle = (): void => setIsOpen(!isOpen);

  const handleSelection = (item: string): void => {
    let newSelection: string[];
    if (isMulti) {
      if (selectedItems.includes(item)) {
        newSelection = selectedItems.filter((i) => i !== item);
      } else {
        newSelection = [...selectedItems, item];
      }
    } else {
      newSelection = [item];
    }
    setSelectedItems(newSelection);
    onChange({
      type: type,
      selectedItems: newSelection,
    });
  };
  const filteredData: string[] = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-4 w-full rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="flex cursor-pointer items-center justify-between p-4" onClick={handleToggle}>
        <h3 className="text-sm text-gray-800">{title}</h3>
        <DropMenuIcon isOpen={isOpen} />
      </div>
      {isOpen && (
        <div className="border-t border-gray-200 pr-0 pb-0 pl-0">
          {isSearch && (
            <div className="border-b border-gray-200 pt-0 pt-3 pr-0 pb-0 pl-0">
              <input
                type="text"
                placeholder="Search"
                className="mb-2 w-full rounded-md border-gray-300 pt-1 pr-0 pb-1 pl-4 text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          <div className="max-h-76 min-h-18 overflow-y-auto pt-3 pl-3">
            {filteredData.map((item: string, index: number) => (
              <label
                key={index}
                className="flex cursor-pointer items-center space-x-3 p-1 pb-3 text-sm"
              >
                <input
                  type={isMulti ? 'checkbox' : 'radio'}
                  name={isMulti ? `checkbox-${item}` : 'radio-group'}
                  checked={selectedItems.includes(item)}
                  onChange={() => handleSelection(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
