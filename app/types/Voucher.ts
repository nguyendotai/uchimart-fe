export type Voucher = {
  id: number;
  title: string;
  code: string;
  discount_type: number;
  discount_value: number;
  start_date: string;
  end_date: string;
  status: number;
  target: string;
  scope: string;
  content: string;
  min_order_value?: number;
}
