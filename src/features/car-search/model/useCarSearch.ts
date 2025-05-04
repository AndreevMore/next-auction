'use client';

import { useEffect, useMemo } from 'react';
import { useFilterStore } from '@/features/filters/model/filter.store';
import { useLotsStore } from '@/features/lots/model/lots.store';
import { useMakesStore } from '@/features/makes/model/makes.store';
import { FilterChangeEvent } from '@/features/filters/model/types';

export function useCarSearch() {
  // Фильтры
  const { make, setFilter } = useFilterStore();

  // Стор марок
  const { makes, loadMakes } = useMakesStore();

  // Стор лотов
  const { lots, page, loading, setPage, resetLots } = useLotsStore();

  // Хендлер изменения фильтров
  const handleFilterChange = (event: FilterChangeEvent) => {
    if (event.type === 'year') {
      const { year_from, year_to } = event.selectedItems as { year_from: number; year_to: number };
      setFilter('year_from', year_from);
      setFilter('year_to', year_to);
    } else if (event.type === 'site') {
      const sites = (event.selectedItems as string[])
        .map((s) => (s === 'Copart' ? 1 : s === 'IAAI' ? 2 : null))
        .filter(Boolean) as number[];
      setFilter('site', sites);
    } else if (event.type === 'make') {
      setFilter('make', event.selectedItems as string[]);
      // сброс моделей
      setFilter('model', []);
    } else if (event.type === 'model') {
      setFilter('model', event.selectedItems as string[]);
    }
    // при смене фильтра сбрасываем пагинацию
    resetLots();
  };

  useEffect(() => {
    loadMakes();
  }, [loadMakes]);

  // Опции для фильтров
  const makeOptions = useMemo(() => makes.map((m) => m.make), [makes]);
  const singleMake = useMemo(
    () => (make.length === 1 ? makes.find((m) => m.make === make[0]) : null),
    [make, makes]
  );
  const modelOptions = singleMake ? singleMake.models : [];

  return {
    lots,
    page,
    make,
    makes,
    singleMake,
    loading,
    setPage,
    handleFilterChange,
    makeOptions,
    modelOptions,
  };
}
