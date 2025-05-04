import { formatNumber } from '@/shared/utils/formatNumber';

interface BidPriceComponentProps {
  amount: string | number | null;
  type: 'current' | 'buy';
}

export const BidPriceComponent: React.FC<BidPriceComponentProps> = ({ amount, type }) => {
  const isCurrent = type === 'current';
  const borderColor = isCurrent ? 'border-blue-400' : 'border-red-200';
  const backgroundColor = isCurrent ? 'bg-blue-100' : 'bg-red-100';
  const textColor = isCurrent ? 'text-gray-800' : 'text-red-300';
  const label = isCurrent ? 'Current Bid:' : 'Buy Now:';
  return (
    <div
      className={`flex w-full flex-col items-start rounded-lg px-4 py-1 leading-6 ${backgroundColor} border ${borderColor} `}
    >
      <span className="text-gray">{label}</span>
      <span className={` ${textColor}`}>${formatNumber(Number(amount))}</span>
    </div>
  );
};
