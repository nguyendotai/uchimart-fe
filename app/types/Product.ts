// types/Inventory.ts
export interface Product {
  id: number;
  title: string;
  product_id: number;
  slug: string;
  sku: string;
  status: number;
  status_name: string;
  purchase_price: string; // "34,170₫"
  sale_price: string;     // "39,900₫"
  offer_price?: string | null;
  stock_quantity: number;
  min_order_quantity: number;
  available_from: string;
  image: string;
  sold_count: number;
  init_sold_count: number;
  created_at: string;
  updated_at: string;

  product?: {
    code: string;
    category_id?: number;
  };
}


export type CartItem = Product & { cartQuantity: number };
