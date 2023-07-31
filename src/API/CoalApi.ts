import RepositoryHelper from "../helpers/RepositoryHelper";

export const CoalApi = {
  getAllCoals: async () => await RepositoryHelper.get("/coals"),

  getCoal: async (id: string) => await RepositoryHelper.get(`/coal/${id}`),
};
