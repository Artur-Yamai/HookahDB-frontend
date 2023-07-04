import { GUID } from "../GUID";

export interface User {
  createdAt: string;
  email: string;
  login: string;
  roleCode: number;
  avatarUrl: string;
  updatedAt: string;
  id: GUID;
}
