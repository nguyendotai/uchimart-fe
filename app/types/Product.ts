// product.ts
export interface Product {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  description: string;
  price: number;
  promotion_price: number;
  status: string; // Bạn có thể đổi sang enum nếu muốn
  status_text: string;
  image: string;
  group_code: string;
  quantity: number;
  pack_size: number;
  weight: number;
  weight_unit: string;
  sold: string;
  deliveryTime:string;
  unit: string;
  display_unit:string;
  origin: string;
  usage: string;
  slug: string;
  ingredient: string;
  expired_at: string;
  updated_at: string; // Hoặc Date nếu bạn parse về Date object
  created_at: string;
}
