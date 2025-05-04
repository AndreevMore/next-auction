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
      return 'text-green-700 border border-green-200 bg-green-100 px-1.5 py-0.4 rounded text-sm';
    }
    return 'text-red-500 border border-red-200 bg-red-100 px-1.5 py-0.4 rounded text-sm';
  };

  return (
    <div className="flex h-full flex-col items-start gap-1">
      <span className="text-gray text-sm">{label}</span>

      {variant === 'badge-green' && <span className={getBadgeClass('green')}>{value}</span>}
      {variant === 'badge-red' && <span className={getBadgeClass('red')}>{value}</span>}
      {variant === 'with-badge' && (
        <div className="flex items-center gap-2">
          <span className="text-black">{value}</span>
          {badgeText && <span className={getBadgeClass('red')}>{badgeText}</span>}
        </div>
      )}
      {variant === 'default' && <span className="break-all text-black">{value}</span>}
    </div>
  );
};
