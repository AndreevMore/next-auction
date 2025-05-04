'use client';

import React from 'react';
import { LotCard } from '@/entities/lot/ui/LotCard';
import { useVirtualizedLots } from '@/features/lots/model/useVirtualizedLots';

export const LotList = () => {
  const { lots, parentRef, rowVirtualizer, setPage, page, loading } = useVirtualizedLots();

  return (
    <div>
      <div ref={parentRef}>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const lot = lots[virtualRow.index];
            if (!lot?.lot_id) return null;

            return (
              <div
                key={lot.lot_id}
                className="mb-3"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <LotCard lot={lot} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button onClick={() => setPage(page + 1)} className="button-secondary" disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};
