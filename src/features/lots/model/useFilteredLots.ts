import { useEffect } from 'react';
import { useFilterStore } from '@/features/filters/model/filter.store';
import { useLotsStore } from '@/features/lots/model/lots.store';

export function useFilteredLots() {
  const { site, make, model, year_from, year_to } = useFilterStore();
  const { lots, page, loading, loadLots, setPage, resetLots } = useLotsStore();

  useEffect(() => {
    resetLots();
  }, [site, make, model, year_from, year_to, resetLots]);

  useEffect(() => {
    const params: Record<string, string | number> = { page, pagesize: 10 };
    if (site.length) params.site = site.join(',');
    if (make.length) params.make = make.join(',');
    if (model.length) params.model = model.join(',');
    if (year_from) params.year_from = year_from;
    if (year_to) params.year_to = year_to;

    loadLots(params);
  }, [page, site, make, model, year_from, year_to, loadLots]);

  return { lots, page, loading, setPage };
}
