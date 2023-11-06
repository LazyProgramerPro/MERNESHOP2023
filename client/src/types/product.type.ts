/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Product {
  name: string | null;
  description?: string | null;
  price?: number | null;
  category?: any | null;
  subCategory?: any | null;
  quantity?: number | null;
  shipping?: boolean | null;
  color?: string | null;
  images?:any;
  brand?: string | null;
  _id?: string;
  slug?: string | null;
}
