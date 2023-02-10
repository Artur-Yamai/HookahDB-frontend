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

  async saveNewAvatar(data: { id: string; photo: File }) {
    return await RepositoryHelper.save(data, "/user/saveAvatar");
  },

  loginExists: async (login: string) =>
    await Repository.get(`/user/loginExists/${login}`),
  emailExists: async (email: string) =>
    await Repository.get(`/user/emailExists/${email}`),
};
