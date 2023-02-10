import Repository from "./axios";
import { TobaccoClass } from "../Classes";
import RepositoryHelper from "../helpers/RepositoryHelper";

export const TobaccoApi = {
  getAllTobaccos: async () => await Repository.get("/tobaccos"),

  getTobaccoEndpoint: () => "/tobaccos",
  async getTobacco(id: string) {
    return await Repository.get(`/tobacco/${id}`);
  },
  async saveTobacco(tobaccoData: TobaccoClass, photo: File | undefined) {
    return await RepositoryHelper.save(
      { ...tobaccoData, photo },
      this.getTobaccoEndpoint()
    );
  },
  async deleteTobacco(id: string) {
    return await RepositoryHelper.delete(id, this.getTobaccoEndpoint());
  },
};
