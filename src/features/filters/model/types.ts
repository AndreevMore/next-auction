export type FilterChangeEvent =
  | { type: 'year'; selectedItems: { year_from: number; year_to: number } }
  | { type: 'site'; selectedItems: string[] }
  | { type: 'make'; selectedItems: string[] }
  | { type: 'model'; selectedItems: string[] };

export type SimpleFilterType = 'site' | 'make' | 'model';
export interface FilterProps {
  title: string;
  type: SimpleFilterType;
  data: string[];
  isMulti: boolean;
  isSearch: boolean;
  onChange: (event: FilterChangeEvent) => void;
}
