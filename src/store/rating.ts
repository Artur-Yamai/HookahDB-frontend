import { makeAutoObservable } from "mobx";
import { catchHelper } from "../helpers";

import { RatingApi } from "../API";
import { CoalRating, TobaccoRating } from "../Types";

class RatingStore {
  constructor() {
    makeAutoObservable(this);
  }

  async changeTobaccoRating(rating: TobaccoRating): Promise<boolean> {
    try {
      return await RatingApi.saveTobaccoRating(rating).then((r) => r.success);
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  async changeCoalRating(rating: CoalRating): Promise<boolean> {
    try {
      return await RatingApi.saveCoalRating(rating).then((r) => r.success);
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }
}

const reting = new RatingStore();

export default reting;
