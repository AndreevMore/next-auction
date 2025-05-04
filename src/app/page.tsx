'use client';
// import { useFilterStore } from '@/features/filters/model/filter.store';
// import { RangeFilter } from '@/features/filters/ui/RangeFilter';
// import { FilterComponent } from '@/features/filters/ui/FilterComponent';
// import { LotList } from '@/widgets/lot-list/ui/LotList';
// import { useEffect } from 'react';
// import { useLotsStore } from '@/features/lots/model/lots.store';
// import { useMakesStore } from '@/features/makes/model/makes.store';
// import { FilterChangeEvent } from '@/features/filters/model/types';
import React from 'react';
import { FilterComponent } from '@/features/filters/ui/FilterComponent';
import { RangeFilter } from '@/features/filters/ui/RangeFilter';
import { LotList } from '@/widgets/lot-list/ui/LotList';
import { useCarSearch } from '@/features/car-search/model/useCarSearch';

export default function Home() {
  const { lots, make, handleFilterChange, makeOptions, modelOptions, singleMake } = useCarSearch();

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
          {singleMake && (
            <FilterComponent
              // value={}  TODO
              title="Model"
              type="model"
              data={modelOptions}
              isMulti={true}
              isSearch={true}
              onChange={handleFilterChange}
            />
          )}
        </div>
        <div className="lot-list">
          <LotList />
        </div>
      </div>
    </main>
  );
}
