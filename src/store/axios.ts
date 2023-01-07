import axios, { AxiosRequestConfig } from "axios";
const baseURL = "http://localhost:6060";

type IConfig = AxiosRequestConfig & {
  headers?: {
    Authorization?: string;
  };
};

const instanse = axios.create({ baseURL });

instanse.interceptors.request.use((config: AxiosRequestConfig): IConfig => {
  const token: string | undefined | null = localStorage.getItem("token");
  if (typeof token === "string") {
    const newConfig: IConfig = { ...config };
    if (!newConfig.headers) {
      newConfig.headers = {};
    }
    newConfig.headers.Authorization = token;

    return newConfig;
  }
  return config;
});

export default instanse;
