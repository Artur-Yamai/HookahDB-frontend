import { CoalClass } from "../Classes";
import RepositoryHelper from "../helpers/RepositoryHelper";
import { GUID } from "../Types";

export const CoalApi = {
  getAllCoals: async () => await RepositoryHelper.get("/coals"),

  getCoalEndpoint: () => "/coals",
  getCoal: async (id: string) => await RepositoryHelper.get(`/coal/${id}`),

  async saveCoal(coalData: CoalClass, photo?: File) {
    return await RepositoryHelper.save(
      { ...coalData, photo },
      this.getCoalEndpoint()
    );
  },

  async deleteCoal(id: GUID) {
    return await RepositoryHelper.delete(id, this.getCoalEndpoint());
  },

  getCoalComments: async (id: string) =>
    await RepositoryHelper.get(`coal/${id}/comments`),

  addToFavoriteList: async (coalId: GUID) =>
    await RepositoryHelper.save({ coalId }, "/favorite/coal"),

  deleteFromFavoriteList: async (coalId: GUID) =>
    await RepositoryHelper.delete(coalId, "/favorite/coal"),
};
