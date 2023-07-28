import RepositoryHelper from "../helpers/RepositoryHelper";

export const CoalApi = {
  getAllCoals: async () => await RepositoryHelper.get("/coals"),
};
