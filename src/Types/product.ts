export interface Product {
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
  myRating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductForSave
  extends Pick<Product, "name" | "fabricatorId" | "description"> {
  id?: string;
}
