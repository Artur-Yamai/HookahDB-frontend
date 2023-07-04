import { makeAutoObservable } from "mobx";
import { catchHelper } from "../helpers";

import { RatingApi } from "../API";
import { Rating } from "../Types";

class RatingStore {
  constructor() {
    makeAutoObservable(this);
  }

  async changeRating(rating: Rating): Promise<boolean> {
    try {
      return await RatingApi.saveRating(rating).then((r) => r.success);
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }
}

const reting = new RatingStore();

export default reting;
