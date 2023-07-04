import Repository from "./axios";
import RepositoryHelper from "../helpers/RepositoryHelper";
import { GUID } from "../Types";

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

  async saveNewAvatar(data: { id: GUID; photo: File }) {
    return await RepositoryHelper.save(data, "/user/saveAvatar");
  },

  loginExists: async (login: string) =>
    await Repository.get(`/user/loginExists/${login}`),
  emailExists: async (email: string) =>
    await Repository.get(`/user/emailExists/${email}`),

  getFavoriteTobaccoByUserId: async (userId: GUID) =>
    await Repository.get(`/user/${userId}/favoriteTobaccos`),
};
