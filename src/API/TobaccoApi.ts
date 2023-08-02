import { TobaccoClass } from "../Classes";
import RepositoryHelper from "../helpers/RepositoryHelper";
import { GUID } from "../Types";

export const TobaccoApi = {
  getAllTobaccos: async () => await RepositoryHelper.get("/tobaccos"),

  getTobaccoEndpoint: () => "/tobaccos",
  getTobacco: async (id: string) =>
    await RepositoryHelper.get(`/tobacco/${id}`),

  async saveTobacco(tobaccoData: TobaccoClass, photo?: File) {
    return await RepositoryHelper.save(
      { ...tobaccoData, photo },
      this.getTobaccoEndpoint()
    );
  },
  async deleteTobacco(id: GUID) {
    return await RepositoryHelper.delete(id, this.getTobaccoEndpoint());
  },

  getTobaccoComments: async (id: string) =>
    await RepositoryHelper.get(`/tobacco/${id}/comments`),

  addToFavoriteList: async (tobaccoId: GUID) =>
    await RepositoryHelper.save({ tobaccoId }, "/favoriteTobacco"),

  deleteFromFavoriteList: async (tobaccoId: GUID) =>
    await RepositoryHelper.delete(tobaccoId, "/favoriteTobacco"),
};
