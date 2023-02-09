export interface ITobacco {
  _id: string;
  name: string;
  fabricator: string;
  description: string;
  photoUrl: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface INewTobacco {
  name: string;
  fabricator: string;
  description: string;
}
