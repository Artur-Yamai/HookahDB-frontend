import { INewTobacco, ITobacco } from "../Types";
import axios from "./axios";

export const TobaccoApi = {
  getAllTobaccos: async () => await axios.get("/tobaccos"),

  createTobacco: async (
    userId: string,
    tobaccoData: INewTobacco,
    photos: File[]
  ) => {
    const formData = new FormData();

    formData.append("userId", userId);

    const object: any = { ...tobaccoData };
    for (const key in object) {
      formData.append(key, object[key]);
    }

    photos.map((photo: File) => formData.append("photos", photo));

    return await axios.post("/tobacco");
  },

  getTobaccoEndpoint: (id: string) => `/tobacco/${id}`,

  async updateTobacco(
    updaterUserId: string,
    tobaccoData: ITobacco,
    photos: File[]
  ) {
    const formData = new FormData();

    formData.append("updaterUserId", updaterUserId);

    const object: any = { ...tobaccoData };
    for (const key in object) {
      formData.append(key, object[key]);
    }

    photos.map((photo: File) => formData.append("photos", photo));

    return await axios.put(this.getTobaccoEndpoint(object._id));
  },

  async getTobacco(id: string) {
    return await axios.get(this.getTobaccoEndpoint(id));
  },

  async delteTobacco(id: string) {
    return await axios.delete(this.getTobaccoEndpoint(id));
  },
};
