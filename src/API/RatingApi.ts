import { Rating } from "../Types";
import RepositoryHelper from "../helpers/RepositoryHelper";
const resource = "/rating";

export const RatingApi = {
  saveTobaccoRating: async (rating: Rating) =>
    await RepositoryHelper.save(rating, `${resource}/tobacco`),

  saveCoalRating: async (rating: Rating) =>
    await RepositoryHelper.save(rating, `${resource}/coal`),
};
