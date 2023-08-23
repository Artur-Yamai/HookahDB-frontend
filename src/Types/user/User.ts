export interface User {
  id: string;
  createdAt: string;
  email: string;
  login: string;
  roleCode: number;
  refCode: string | null;
  avatarUrl: string;
  updatedAt: string;
}
