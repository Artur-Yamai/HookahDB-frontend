import { hostName } from "./hostName";

interface Configuration {
  apiUrl: string;
  photoUrl: string;
}

const config: Configuration = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? window.location.origin + "/api/"
      : `http://${hostName}:6060/api/`,
  photoUrl:
    process.env.NODE_ENV === "production"
      ? window.location.origin + "/api/"
      : `http://${hostName}:6060/`,
};

export default config;
