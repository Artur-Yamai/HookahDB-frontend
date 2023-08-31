import { ProductForSave } from "Types";
import RepositoryHelper from "../helpers/RepositoryHelper";

export const CoalApi = {
  getAllCoals: async () => await RepositoryHelper.get("/coals"),

  getCoalEndpoint: () => "/coals",
  getCoal: async (id: string) => await RepositoryHelper.get(`/coal/${id}`),

  async saveCoal(coalData: ProductForSave, photo?: File) {
    return await RepositoryHelper.save(
      { ...coalData, photo },
      this.getCoalEndpoint()
    );
  },

  async deleteCoal(id: string) {
    return await RepositoryHelper.delete(id, this.getCoalEndpoint());
  },

  getCoalComments: async (id: string) =>
    await RepositoryHelper.get(`/coal/${id}/comments`),

  addToFavoriteList: async (coalId: string) =>
    await RepositoryHelper.save({ coalId }, "/favorite/coal"),

  deleteFromFavoriteList: async (coalId: string) =>
    await RepositoryHelper.delete(coalId, "/favorite/coal"),
};
