export type ProductData = {
  id: number;
  name: string;
  primary_image: string;
};

export type InventoryData = {
  id: number;
  title: string;
  image: string;
  product: ProductData;
};

export type OrderItemData = {
  id: number;
  quantity: number;
  price: string;
  total_price: string;
  inventory: InventoryData;
};

export type OrderData = {
  id: number;
  order_code: string;
  uuid: string;
  fullname: string;
  email: string;
  phone: string;
  address_line: string;
  city_name: string;
  total_item: number;
  total_quantity: number;
  total_price: string;
  grand_total?: string | number;
  payment_status: string;
  order_status: number;
  created_at: string;
  updated_at: string;
  items: OrderItemData[];
};
