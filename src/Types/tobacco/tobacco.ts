export interface ITobacco {
  id: string;
  name: string;
  fabricator: string;
  description: string;
  photoUrl: string;
  userId: string;
  isFavorite: boolean;
  rating: number;
  ratingsQuantity: number;
  isRated: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface INewTobacco {
  name: string;
  fabricator: string;
  description: string;
}
