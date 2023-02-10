import Repository from "./axios";
import RepositoryHelper from "../helpers/RepositoryHelper";

export const UserApi = {
  auth: async (login: string, password: string) =>
    await Repository.post("/user/auth", {
      password,
      login,
    }),

  autoAuth: async () => await Repository.get("/user/authByToken"),

  register: async (login: string, password: string, email: string) =>
    await RepositoryHelper.save(
      {
        login,
        email,
        password,
      },
      "/user/register"
    ),

  saveNewAvatar: async (formData: FormData) =>
    await Repository.put("/user/saveAvatar", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),

  loginExists: async (login: string) =>
    await Repository.post("/user/loginExists", { login }),
  emailExists: async (email: string) =>
    await Repository.post("/user/emailExists", { email }),
};
