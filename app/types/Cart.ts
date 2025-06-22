export interface Cart {
  id: number;
  user_id: number;
  updated_at: string; // Hoặc Date nếu bạn parse về Date object
  created_at: string;
}
