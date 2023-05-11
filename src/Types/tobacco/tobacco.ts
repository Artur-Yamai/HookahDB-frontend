export interface ITobacco {
  id: string;
  name: string;
  fabricator: string;
  description: string;
  photoUrl: string;
  userId: string;
  isFavorite: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface INewTobacco {
  name: string;
  fabricator: string;
  description: string;
}
