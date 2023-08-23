import { TobaccoClass } from "../Classes";
import RepositoryHelper from "../helpers/RepositoryHelper";

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
  async deleteTobacco(id: string) {
    return await RepositoryHelper.delete(id, this.getTobaccoEndpoint());
  },

  getTobaccoComments: async (id: string) =>
    await RepositoryHelper.get(`/tobacco/${id}/comments`),

  addToFavoriteList: async (tobaccoId: string) =>
    await RepositoryHelper.save({ tobaccoId }, "/favorite/tobacco"),

  deleteFromFavoriteList: async (tobaccoId: string) =>
    await RepositoryHelper.delete(tobaccoId, "/favorite/tobacco"),
};
