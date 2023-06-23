import { makeAutoObservable } from "mobx";
import { catchHelper } from "../helpers";

import { RatingApi } from "../API";
import { IRating } from "../Types";

class Rating {
  constructor() {
    makeAutoObservable(this);
  }

  async changeRating(rating: IRating): Promise<boolean> {
    try {
      return await RatingApi.saveRating(rating).then((r) => r.success);
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }
}

const reting = new Rating();

export default reting;
