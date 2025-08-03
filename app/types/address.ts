export type Province = {
  code: string;
  name: string;
  full_name?: string;
};

export type District = {
  code: string;
  name: string;
  full_name?: string;

};

export type Ward = {
  code: string;
  name: string;
  full_name?: string;
  district_code?: string;

};

export type WardAPI = {
  code: string;
  full_name: string;
  district_code: string;
};


// Kiểu dữ liệu API trả về
export type APIItem = {
  id: number;
  code: string;       // API trả string
  full_name: string;  // API trả full_name
};

export type APIResponse = {
  success: boolean;
  data: APIItem[];
};


export type AddressItem = {
  id: number;
  user: { id: number };
  name: string;
  phone: string;
  address_line: string;
  note?: string;

  province_code?: string;
  district_code?: string;
  ward_code?: string;

  province: { code: string; name: string };
  district: { code: string; name: string };
  ward: { code: string; name: string };

  is_default: number;
  created_at: string;
  updated_at: string;

};

export type AddressListResponse = {
  success: boolean;
  data: AddressItem[];
};
