export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone_number: string;
  birthday: Date;
  genders: number;
  access_channel_type?: number;
};