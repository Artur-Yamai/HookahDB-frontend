import RepositoryHelper from "../helpers/RepositoryHelper";
import { GUID } from "../Types";

export const CoalApi = {
  getAllCoals: async () => await RepositoryHelper.get("/coals"),

  getCoal: async (id: string) => await RepositoryHelper.get(`/coal/${id}`),

  deleteCoal: async (id: GUID) => await RepositoryHelper.delete(id, "/coals"),
};
