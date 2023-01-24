interface IConfiguration {
  apiUrl: string;
  photoUrl: string;
}

const config: IConfiguration = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? window.location.origin + "/api/"
      : "http://localhost:6060/api/",
  photoUrl:
    process.env.NODE_ENV === "production"
      ? window.location.origin + "/api/"
      : "http://localhost:6060/",
};

export default config;
