export interface AuctionTimeInfo {
  formattedDate: string;
  timeLeft: string;
}

export function getAuctionTimeInfo(auctionDateStr?: string | null): AuctionTimeInfo {
  if (!auctionDateStr) {
    return { formattedDate: 'N/A', timeLeft: 'N/A' };
  }

  const dateUtc = new Date(auctionDateStr);
  if (isNaN(dateUtc.getTime())) {
    return { formattedDate: 'N/A', timeLeft: 'N/A' };
  }

  const formattedDate = dateUtc
    .toLocaleString(undefined, {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    })
    .replace(',', '');

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
