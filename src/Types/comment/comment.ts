export interface IComment {
  text: string;
  user: {
    id: string;
    login: string;
    avatarUrl: string;
  };
  tobaccoId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
