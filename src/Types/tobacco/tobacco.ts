export interface ITobacco {
  id: string;
  name: string;
  fabricator: string;
  fabricatorId: string;
  description: string;
  photoUrl: string;
  userId: string;
  isFavorite: boolean;
  rating: number;
  ratingsQuantity: number;
  markQuantity: number;
  isRated: boolean;
  createdAt?: string;
  updatedAt?: string;
}
