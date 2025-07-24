export type Voucher = {
  id: number;
  title: string;
  code: string;
  discount_type: number;
  discount_value: number;
  start_date: string;
  end_date: string;
  status: number;
  terms: string;
}
