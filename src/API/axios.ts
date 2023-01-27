import axios, { AxiosRequestConfig } from "axios";
import config from "../configuration";

type IConfig = AxiosRequestConfig & {
  headers?: {
    authorization?: string;
  };
};

type ConfigType = string | undefined | null;

const instanse = axios.create({ baseURL: config.apiUrl });

instanse.interceptors.request.use((config: AxiosRequestConfig): IConfig => {
  const token: ConfigType = localStorage.getItem("token");
  if (typeof token === "string") {
    const newConfig: IConfig = { ...config };
    if (!newConfig.headers) {
      newConfig.headers = {};
    }
    newConfig.headers.authorization = token;

    return newConfig;
  }
  return config;
});

export default instanse;
