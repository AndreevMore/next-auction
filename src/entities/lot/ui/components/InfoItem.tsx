type InfoItemProps = {
  label: string;
  value: string | number | null;
  variant?: 'badge-green' | 'badge-red' | 'with-badge' | 'default';
  badgeText?: string | number | null;
};

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  variant = 'default',
  badgeText,
}) => {
  const getBadgeClass = (type: 'green' | 'red') => {
    if (type === 'green') {
      return 'text-green-700 border border-green-300 bg-green-50 px-1.5 py-0.4 rounded text-sm';
    }
    return 'text-red-600 border border-red-300 bg-red-50 px-1.5 py-0.5 rounded text-sm';
  };

  return (
    <div className="flex h-full flex-col items-start gap-1">
      <span className="text-gray text-sm">{label} TODO</span>

      {variant === 'badge-green' && <span className={getBadgeClass('green')}>{value}</span>}
      {variant === 'badge-red' && <span className={getBadgeClass('red')}>{value}</span>}
      {variant === 'with-badge' && (
        <div className="flex items-center gap-2">
          <span className="text-black">{value}</span>
          {badgeText && <span className={getBadgeClass('red')}>{badgeText}</span>}
        </div>
      )}
      {variant === 'default' && <span className="text-[14px] break-all text-black">{value}</span>}
    </div>
  );
};
