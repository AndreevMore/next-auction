'use client';
import { useFilterStore } from '@/features/filters/model/filter.store';
import { RangeFilter } from '@/features/filters/ui/RangeFilter';
import { FilterComponent } from '@/features/filters/ui/FilterComponent';
import { LotList } from '@/widgets/lot-list/ui/LotList';
import { useEffect } from 'react';
import { useLotsStore } from '@/features/lots/model/lots.store';
import { useMakesStore } from '@/features/makes/model/makes.store';

// interface FilterChangeEvent {
//   type: string;
//   selectedItems: string[] | { year_from: number; year_to: number };
// }

type FilterChangeEvent =
  | { type: 'year'; selectedItems: { year_from: number; year_to: number } }
  | { type: 'site'; selectedItems: string[] }
  | { type: 'make'; selectedItems: string[] }
  | { type: 'model'; selectedItems: string[] };

export default function Home() {
  const { setFilter, make } = useFilterStore();
  const { makes, loadMakes } = useMakesStore();
  const { lots } = useLotsStore();

  useEffect(() => {
    loadMakes();
  }, [loadMakes]);
  const makeOptions = makes.map((m) => m.make);

  const handleFilterChange = (event: FilterChangeEvent) => {
    if (event.type === 'year') {
      const { year_from, year_to } = event.selectedItems as {
        year_from: number;
        year_to: number;
      };
      setFilter('year_from', year_from);
      setFilter('year_to', year_to);
    } else if (event.type === 'site') {
      const sites = (event.selectedItems as string[])
        .map((s) => (s === 'Copart' ? 1 : s === 'IAAI' ? 2 : null))
        .filter(Boolean) as number[];

      setFilter('site', sites);
    } else {
      setFilter(event.type, event.selectedItems);
    }
  };

  return (
    <main className="mx-auto max-w-[1920px] px-6 py-6">
      <h1 className="mb-3 text-2xl">
        {lots.length} Search Results {make.length ? `: ${make}` : ``}
      </h1>

      <div className="grid grid-cols-[302px_1fr] gap-4">
        <div className="filters w-full space-y-4">
          <FilterComponent
            title="Auction Type"
            // value={} TODO
            type="site"
            data={['Copart', 'IAAI']}
            isMulti={true}
            isSearch={false}
            onChange={handleFilterChange}
          />
          <RangeFilter
            // value={[2015, 2025]}  TODO
            onChange={(from, to) =>
              handleFilterChange({
                type: 'year',
                selectedItems: { year_from: from, year_to: to },
              })
            }
          />
          <FilterComponent
            // value={}  TODO
            title="Brand"
            type="make"
            data={makeOptions}
            isMulti={true}
            isSearch={true}
            onChange={handleFilterChange}
          />
          TODO MODELS FILTER
        </div>
        <div className="lot-list">
          <LotList />
        </div>
      </div>
    </main>
  );
}
