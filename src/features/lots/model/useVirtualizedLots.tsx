import { useVirtualizer } from '@tanstack/react-virtual';
import { useFilteredLots } from './useFilteredLots';
import { useRef } from 'react';

export function useVirtualizedLots() {
  const { lots, page, loading, setPage } = useFilteredLots();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: lots.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 252,
    overscan: 5,
    paddingEnd: 21,
  });

  return { lots, page, loading, setPage, parentRef, rowVirtualizer };
}
