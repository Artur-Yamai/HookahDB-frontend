import { makeAutoObservable } from "mobx";
import { catchHelper } from "../helpers";

import { RatingApi } from "../API";
import { CoalRating, TobaccoRating } from "../Types";

class RatingStore {
  constructor() {
    makeAutoObservable(this);
  }

  async changeTobaccoRating(
    tobaccoRatingData: TobaccoRating
  ): Promise<boolean> {
    try {
      return await RatingApi.saveTobaccoRating(tobaccoRatingData).then(
        (r) => r.success
      );
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  async changeCoalRating(coalRatingData: CoalRating): Promise<boolean> {
    try {
      return await RatingApi.saveCoalRating(coalRatingData).then(
        (r) => r.success
      );
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }
}

const reting = new RatingStore();

export default reting;
