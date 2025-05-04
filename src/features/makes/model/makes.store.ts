import { create } from 'zustand';
import { axios } from '@/shared/lib/axios';

export interface MakeItem {
  make: string;
  models: string[];
}

interface MakesState {
  makes: MakeItem[];
  loading: boolean;
  loadMakes: () => Promise<void>;
}

export const useMakesStore = create<MakesState>((set) => ({
  makes: [],
  loading: false,
  loadMakes: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get<MakeItem[]>('/cars/makes-and-models');
      set({ makes: data });
    } finally {
      set({ loading: false });
    }
  },
}));
