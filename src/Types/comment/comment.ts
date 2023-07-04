import { GUID } from "../GUID";

export interface Comment {
  id: GUID;
  tobaccoId: string;
  userId: string;
  login: string;
  userAvatarUrl: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
