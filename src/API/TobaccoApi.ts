import axios from "./axios";

export const TobaccoApi = {
  getAllTobaccos: async () => await axios.get("/tobaccos"),

  getTobaccoEndpoint: (id: string) => `/tobacco/${id}`,
  async getTobacco(id: string) {
    return await axios.get(this.getTobaccoEndpoint(id));
  },
  async updateTobacco(id: string) {
    return await axios.delete(this.getTobaccoEndpoint(id));
  },
  async createTobacco(id: string) {
    return await axios.delete(this.getTobaccoEndpoint(id));
  },
  async delteTobacco(id: string) {
    return await axios.delete(this.getTobaccoEndpoint(id));
  },
};
