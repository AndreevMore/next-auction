import { formatNumber } from '@/shared/utils/formatNumber';

interface BidPriceComponentProps {
  amount: string | number | null;
  type: 'current' | 'buy';
}

export const BidPriceComponent: React.FC<BidPriceComponentProps> = ({ amount, type }) => {
  const isCurrent = type === 'current';
  const backgroundColor = isCurrent ? 'bg-blue-100' : 'bg-red-100';
  const textColor = isCurrent ? 'text-gray-800' : 'text-red-600';
  const label = isCurrent ? 'Current Bid:' : 'Buy Now:';

  return (
    <div
      className={`flex w-full flex-col items-start rounded-lg px-4 py-1 leading-6 ${backgroundColor} border border-blue-400`}
    >
      <span className="text-gray">{label} TODO</span>
      <span className={` ${textColor}`}>${formatNumber(Number(amount))}</span>
    </div>
  );
};
