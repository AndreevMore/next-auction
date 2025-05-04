import React from 'react';
import { Lot } from '@/shared/types/lot';
import { CopartIcon, IAAIcon } from '@/shared/ui/icons';
import { isCopart, isIAAI } from '@/shared/utils/auction';
import Image from 'next/image';
import { AuctionTime, InfoItem } from './components';
import { BidPriceComponent } from './components/BidPrice';
import { useCurrentBid } from '../model/useCurrentBid';

export const LotCard = ({ lot }: { lot: Lot }) => {
  const currentBid = useCurrentBid(lot.lot_id, lot.site);

  return (
    <div className="mb-3 flex w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="max-w-[340px] overflow-hidden">
        <Image
          src={lot.link_img_small?.[0] || '/file.svg'}
          alt={lot.title}
          height={240}
          width={340}
          className="h-full min-h-[240px] w-full object-cover"
          priority={true}
        />
      </div>
      {/* Right Section: Details */}
      <div className="flex w-full flex-col">
        {/* Top Row: Title and Auction Time */}
        <div className="flex items-start justify-between border-b border-gray-200">
          <h2 className="777 flex items-center gap-3 p-[22px] text-base text-[20px] text-black">
            {lot.title}

            {isCopart(lot.site) ? <CopartIcon /> : isIAAI(lot.site) ? <IAAIcon /> : null}
          </h2>
        </div>

        {/* Details Grid */}
        <div className="grid auto-rows-fr grid-cols-4 gap-x-1 gap-y-4 py-6 pr-0 pl-6 text-xs text-gray-800">
          <InfoItem
            label="Status:"
            value={lot.status}
            variant={lot.status === 'Run & Drive' ? 'badge-green' : 'badge-red'}
          />

          <InfoItem label="Lot ID:" value={lot.lot_id} />

          <InfoItem label="Damage:" value={lot.damage_pr} />

          <InfoItem
            label="Dealer Type:"
            value={lot.seller_type}
            variant={lot.seller_type === 'insurance' ? 'badge-green' : 'badge-red'}
          />

          <InfoItem
            label="Key:"
            value={lot.keys}
            variant={lot.keys === 'Yes' ? 'badge-green' : 'badge-red'}
          />

          <InfoItem label="VIN Code:" value={lot.vin} />

          <InfoItem
            label="Odometer:"
            value={`${lot.odometer?.toLocaleString() || '0'} miles`}
            variant={lot.odobrand === 'Actual' ? 'default' : 'with-badge'}
            badgeText={lot.odobrand !== 'Actual' ? lot.odobrand : undefined}
          />

          <InfoItem label="Location:" value={lot.location_old} />
        </div>
      </div>
      {/* Bid Section */}
      <div className="flex min-w-[320px] flex-col justify-between border-l border-gray-200 p-6">
        <div className="flex flex-col gap-3">
          <AuctionTime auctionDate={lot.auction_date} />
        </div>

        <div className="flex items-center gap-1">
          <BidPriceComponent amount={currentBid?.pre_bid ?? 0} type="current" />
          {lot.price_new ? <BidPriceComponent amount={lot.price_new} type="buy" /> : null}
        </div>

        <button className="button-main w-full">Bid Now</button>
      </div>
    </div>
  );
};
