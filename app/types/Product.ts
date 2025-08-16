// types/Inventory.ts

export interface CategoryGroup {
  image: any;
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  category_group: CategoryGroup;
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  category: Category;
}

export interface Inventory {
  inventory_id: number;
  id: number;
  title: string;
  slug: string;
  sku: string;
  product_id: number;
  image: string;
  status: number;
  status_name: string;
  purchase_price: string;      // ví dụ: "N/A"
  sale_price: string;          // ví dụ: "59,000₫"
  offer_price?: string | null;
  stock_quantity: number;
  min_order_quantity: number;
  available_from: string;
  meta_title: string | null;
  meta_description: string | null;
  init_sold_count: number;
  sold_count: number;
  created_at: string;
  updated_at: string;
  quantity_in_unit: number;

  product?: Product;

  subcategories?: Subcategory[];
  unit_type?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  code: string;
  description: string | null;
  primary_image: string;
  media?: any[];

  brand: {
    id: number;
    name: string;
    image: string;
  };

  subcategories: Subcategory[];

  inventories: Inventory[];

  created_at: string;
  updated_at: string;
}

// frontend CartItem type
export type CartItem= {
  offer_price: string | null | undefined;
  sale_price: string | undefined;
  image: string | undefined;
  title: string | undefined;
  id: number;
  inventory_id: number;
  quantity: number;
  total_price: number; // tổng giá trị của mặt hàng trong giỏ hàng
  inventory?: Inventory; // ✅ inventory optional
};

