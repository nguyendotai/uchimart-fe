export interface Category {
  id: number;
  name: string;
  image: string;
  imgLarge: string;
  description: string;
}

export interface CategoryChild{
  id: number;
  name: string;
  image: string;
  categoryId: string;
}
