import axios from "./axios";

export const TobaccoApi = {
  getAllTobaccos: async () => await axios.get("/tobaccos"),
};
