export type Voucher = {
  id: number;
  title: string;
  code: string;
  discount_type: number;
  discount_value: string;
  usage_limit: string;
  used: number;
  start_date: string;
  end_date: string;
  content?: string | null;
  target?: string | null;
  scope?: string | null;
  status: number;
  min_order_value?: number;
}