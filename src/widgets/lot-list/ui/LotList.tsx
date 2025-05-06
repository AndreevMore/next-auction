'use client';
import React from 'react';
import { LotCard } from '@/entities/lot/ui/LotCard';
import { useFilteredLots } from '@/features/lots/model/useFilteredLots';

export const LotList = () => {
  const { lots, setPage, page, loading } = useFilteredLots();

  return (
    <div>
      {lots.map((lot) => (lot?.lot_id ? <LotCard key={lot.lot_id} lot={lot} /> : null))}

      {lots.length ? (
        <div className="mt-4 flex justify-center">
          <button onClick={() => setPage(page + 1)} className="button-secondary" disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      ) : (
        <h1 className="mb-3 text-center text-2xl">There is no lots found</h1>
      )}
    </div>
  );
};
