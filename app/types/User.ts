export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone_number: string;
  birthday: Date;
  genders: number;
  access_channel_type?: number;
  token?: string; 
};


// Dùng khi gọi API đăng ký
export type RegisterPayload = {
  name: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation?: string;
  genders: number;
  birthday: string; // yyyy-mm-dd
};


// Dùng khi API login trả về
export type LoginResponse = {
  access_token: string; // Laravel JWT token
  token_type: string;
  expires_in: number;
  user: User; // Laravel trả thêm thông tin user
};