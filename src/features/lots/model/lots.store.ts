import { create } from 'zustand';
import { axios } from '@/shared/lib/axios';
import { Lot, LotsResponseSchema } from '@/shared/types/lot';

interface LotsState {
  lots: Lot[];
  page: number;
  loading: boolean;
  loadLots: (params: Record<string, string | number>) => void;
  setPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
  resetLots: () => void;
}

export const useLotsStore = create<LotsState>((set) => ({
  lots: [],
  page: 1,
  loading: false,
  loadLots: async (params) => {
    set({ loading: true });
    try {
      const response = await axios.get('/cars', { params });
      const parsed = LotsResponseSchema.parse(response.data);
      set((state) => ({
        lots: [...state.lots, ...parsed.data],
        loading: false,
      }));
    } catch (err) {
      console.error('Failed to load lots', err);
      set({ loading: false });
    }
  },
  setPage: (page) => set({ page }),
  setLoading: (loading) => set({ loading }),
  resetLots: () => set({ lots: [], page: 1 }),
}));
