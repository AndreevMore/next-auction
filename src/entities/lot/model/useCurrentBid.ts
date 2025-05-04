import { useEffect, useState } from 'react';
import { axios } from '@/shared/lib/axios';
import type { CurrentBid } from '@/shared/types/lot';

export function useCurrentBid(lotId?: number, site?: number) {
  const [data, setData] = useState<CurrentBid>({ pre_bid: 0 });

  useEffect(() => {
    if (lotId != null && site != null) {
      axios
        .get<CurrentBid>('/cars/current-bid', { params: { lot_id: lotId, site } })
        .then((res) => setData(res.data))
        .catch(console.error);
    }
  }, [lotId, site]);

  return data;
}
