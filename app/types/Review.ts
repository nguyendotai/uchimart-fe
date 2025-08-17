export type Review = {
  id: number;
  name: string;
  avatar: string | null;
  status: number;
  status_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type RatingCounts = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};
