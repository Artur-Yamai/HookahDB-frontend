import { GUID } from "../GUID";

export interface User {
  id: GUID;
  createdAt: string;
  email: string;
  login: string;
  roleCode: number;
  refCode: string | null;
  avatarUrl: string;
  updatedAt: string;
}
