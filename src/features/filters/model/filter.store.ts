import { create } from 'zustand';

export type FilterKeys = 'site' | 'make' | 'model' | 'year_from' | 'year_to';

export interface FiltersState {
  site: number[];
  make: string[];
  model: string[];
  year_from?: number;
  year_to?: number;
  setFilter: <K extends FilterKeys>(type: K, value: FiltersState[K]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FiltersState>((set) => ({
  site: [],
  make: [],
  model: [],
  year_from: undefined,
  year_to: undefined,

  setFilter: (type, value) => set((state) => ({ ...state, [type]: value })),
  resetFilters: () =>
    set({
      site: [],
      make: [],
      model: [],
      year_from: undefined,
      year_to: undefined,
    }),
}));
