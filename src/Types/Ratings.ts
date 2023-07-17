import { GUID } from "./GUID";

export interface Rating {
  id: string | null;
  rating: number;
}

export interface TobaccoRating extends Rating {
  tobaccoId: GUID;
}
