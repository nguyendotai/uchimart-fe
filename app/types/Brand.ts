export interface Brand {
  id:number; 
  name: string;
  image: string;
  order: string;
  status: string;
  updated_at: string; // Hoặc Date nếu bạn parse về Date object
  created_at: string;
}