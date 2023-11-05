import { Rating } from "Types";
import RepositoryHelper from "helpers/RepositoryHelper";
const resource = "/rating";

export const RatingApi = {
  saveTobaccoRating: async (tobaccoRatingData: Rating) =>
    await RepositoryHelper.save(tobaccoRatingData, `${resource}/tobacco`),

  saveCoalRating: async (coalRatingData: Rating) =>
    await RepositoryHelper.save(coalRatingData, `${resource}/coal`),
};
