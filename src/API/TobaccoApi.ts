import { INewTobacco, ITobacco } from "../Types";
import axios from "./axios";

export const TobaccoApi = {
  getAllTobaccos: async () => await axios.get("/tobaccos"),

  createTobacco: async (tobaccoData: INewTobacco, photo: File) => {
    const formData = new FormData();

    const object: any = { ...tobaccoData };
    for (const key in object) {
      formData.append(key, object[key]);
    }

    formData.append("photos", photo);

    return await axios.post("/tobacco");
  },

  getTobaccoEndpoint: (id: string) => `/tobacco/${id}`,

  async updateTobacco(tobacco: ITobacco, photo: File | undefined) {
    const formData = new FormData();

    const object: any = { ...tobacco };
    for (const key in object) {
      formData.append(key, object[key]);
    }

    if (photo) {
      formData.append("photo", photo);
    }

    return await axios.put(this.getTobaccoEndpoint(object._id), formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  },

  async getTobacco(id: string) {
    return await axios.get(this.getTobaccoEndpoint(id));
  },

  async delteTobacco(id: string) {
    return await axios.delete(this.getTobaccoEndpoint(id));
  },
};
