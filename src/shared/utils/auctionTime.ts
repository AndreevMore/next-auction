export interface AuctionTimeInfo {
  /** Локально отформатированная дата, например "Sat 03 May 15:56 GMT+3" */
  formattedDate: string;
  /** Оставшееся время, например "2 d 5 h 12 min left" или "Expired" / "N/A" */
  timeLeft: string;
}

/**
 * Преобразует UTC-строку auctionDateStr в локальную дату и таймер до события.
 *
 * @param auctionDateStr — ISO-строка UTC (напр. "2025-05-03T13:56:00.000Z")
 * @returns {AuctionTimeInfo}
 */
export function getAuctionTimeInfo(auctionDateStr?: string | null): AuctionTimeInfo {
  if (!auctionDateStr) {
    return { formattedDate: 'N/A', timeLeft: 'N/A' };
  }

  const dateUtc = new Date(auctionDateStr);
  if (isNaN(dateUtc.getTime())) {
    return { formattedDate: 'N/A', timeLeft: 'N/A' };
  }

  // 1) Форматируем локальную дату с коротким названием зоны (GMT+X)
  const formattedDate = dateUtc
    .toLocaleString(undefined, {
      weekday: 'short', // "Sat"
      day: '2-digit', // "03"
      month: 'short', // "May"
      hour: '2-digit', // "15"
      minute: '2-digit', // "56"
      hour12: false,
      timeZoneName: 'short', // "GMT+3"
    })
    .replace(',', ''); // убираем запятую после day

  // 2) Считаем таймер: разница между аукционом и «сейчас»
  const now = new Date();
  const diffMs = dateUtc.getTime() - now.getTime();

  let timeLeft: string;
  if (diffMs <= 0) {
    timeLeft = 'Expired';
  } else {
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diffMs / (1000 * 60)) % 60);
    timeLeft = `${days} d ${hours} h ${mins} min left`;
  }

  return { formattedDate, timeLeft };
}
