import { z } from 'zod';

export const LotSchema = z.object({
  id: z.string(),
  lot_id: z.number(),
  site: z.number(),
  base_site: z.string(),
  salvage_id: z.number().nullable(),
  odometer: z.number().nullable(),
  price_new: z.number().nullable(),
  price_future: z.number().nullable(),
  reserve_price: z.number().nullable(),
  current_bid: z.number().nullable(),
  auction_date: z.string().nullable(),
  cost_priced: z.number().nullable(),
  cost_repair: z.number().nullable(),
  year: z.number(),
  cylinders: z.number().nullable(),
  state: z.string(),
  vehicle_type: z.string(),
  auction_type: z.string(),
  make: z.string(),
  model: z.string(),
  series: z.string().nullable(),
  damage_pr: z.string().nullable(),
  damage_sec: z.string().nullable(),
  keys: z.string().nullable(),
  odobrand: z.string().nullable(),
  fuel: z.string().nullable(),
  drive: z.string().nullable(),
  transmission: z.string().nullable(),
  color: z.string().nullable(),
  status: z.string(),
  title: z.string(),
  vin: z.string(),
  engine: z.string().nullable(),
  engine_size: z.number().nullable(),
  location: z.string().nullable(),
  location_old: z.string().nullable(),
  location_id: z.number().nullable(),
  country: z.string(),
  document: z.string().nullable(),
  document_old: z.string().nullable(),
  currency: z.string(),
  seller: z.string().nullable(),
  is_buynow: z.boolean(),
  iaai_360: z.any().nullable(),
  copart_exterior_360: z.array(z.string()).nullable(),
  copart_interior_360: z.string().nullable(),
  video: z.any().nullable(),
  link_img_hd: z.array(z.string()).nullable(),
  link_img_small: z.array(z.string()).nullable(),
  is_offsite: z.boolean(),
  location_offsite: z.any().nullable(),
  link: z.string(),
  body_type: z.string().nullable(),
  seller_type: z.string().nullable(),
  vehicle_score: z.any().nullable(),
  hash_data: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const LotsResponseSchema = z.object({
  size: z.number(),
  page: z.number(),
  pages: z.number(),
  count: z.number(),
  data: z.array(LotSchema),
});

export type Lot = z.infer<typeof LotSchema>;

export interface CurrentBid {
  pre_bid: number;
  buy_now?: number;
}
