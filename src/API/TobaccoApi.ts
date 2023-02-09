import axios from "./axios";
import { TobaccoClass } from "../Classes";

export const TobaccoApi = {
  getAllTobaccos: async () => await axios.get("/tobaccos"),

  createTobacco: async (tobaccoData: TobaccoClass, photo: File) => {
    const formData = new FormData();

    const object: any = { ...tobaccoData };
    for (const key in object) {
      formData.append(key, object[key]);
    }

    formData.append("photo", photo);

    return await axios.post("/tobacco", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  },

  getTobaccoEndpoint: (id: string) => `/tobacco/${id}`,

  async updateTobacco(tobacco: TobaccoClass, photo: File | undefined) {
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
