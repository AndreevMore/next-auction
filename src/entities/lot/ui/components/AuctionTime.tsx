import { CalendarIcon, ClockIcon } from '@/shared/ui/icons';
import { getAuctionTimeInfo } from '@/shared/utils/auctionTime';

export const AuctionTime = ({ auctionDate }: { auctionDate?: string | null }) => {
  const { formattedDate, timeLeft } = getAuctionTimeInfo(auctionDate);
  return (
    <>
      <div className="flex items-center gap-3">
        <ClockIcon />
        <span>{formattedDate}</span>
      </div>
      <div className="flex items-center gap-3">
        <CalendarIcon />
        <span className="safe">{timeLeft}</span>
      </div>
    </>
  );
};
