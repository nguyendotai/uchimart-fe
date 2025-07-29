export interface CategoryGroup {
  id: number;
  name: string;
  slug: string;
  image: string;
  cover: string;
  description: string;
  seo_title: string;
  seo_description: string;
  status: number; // hoặc boolean nếu bạn convert ở backend
  created_at: string; // dạng ISO datetime, ví dụ: '2025-07-14T08:00:00Z'
  updated_at: string;
  categories?: Category[]; // nếu bạn load luôn danh mục con
}


export interface Category {
  subcategories: any;
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  seo_title: string;
  seo_description: string;
  status: number; // hoặc boolean
  category_group_id: number; // tham chiếu đến danh mục cha
}

