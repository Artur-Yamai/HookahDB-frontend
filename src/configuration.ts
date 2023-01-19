interface IConfiguration {
  apiUrl: string;
}

const config: IConfiguration = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? window.location.origin + "/WebApi/"
      : "http://localhost:6060/",
};

export default config;
