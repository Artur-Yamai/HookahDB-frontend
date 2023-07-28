import { GUID } from "./GUID";

export interface Product {
  id: GUID;
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
