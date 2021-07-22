import { StoreRef } from './StoreRef';

export interface Monitor {
  id: string;
  brand: string;
  model: string;
  size: number;
  width: number;
  height: number;
  refresh_rate: number;
  response_time: number;
  panel_type: string;
  aspect_ratio: string;
  resolution: string;
  stores: [StoreRef];
  price: number;
}
