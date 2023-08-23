export interface Rating {
  id: string | null;
  rating: number;
}

export interface TobaccoRating extends Rating {
  tobaccoId: string;
}

export interface CoalRating extends Rating {
  coalId: string;
}
