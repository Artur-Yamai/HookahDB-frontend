import Repository from "./axios";
import RepositoryHelper from "../helpers/RepositoryHelper";
import { RegistrationUserData } from "../Types";

export const UserApi = {
  auth: async (login: string, password: string) =>
    await Repository.post("/user/auth", { password, login }),

  autoAuth: async () => await Repository.get("/user/authByToken"),

  register: async (regData: RegistrationUserData) =>
    await RepositoryHelper.save(regData, "/user/register"),

  async saveNewAvatar(data: { id: string; photo: File }) {
    return await RepositoryHelper.save(data, "/user/saveAvatar");
  },

  loginExists: async (login: string) =>
    await Repository.get(`/user/loginExists/${login}`),
  emailExists: async (email: string) =>
    await Repository.get(`/user/emailExists/${email}`),
  refCodeExists: async (refCode: string) =>
    await Repository.get(`/user/refCOdeExists/${refCode}`),

  getFavoriteTobaccoByUserId: async (userId: string) =>
    await Repository.get(`/user/${userId}/favoriteTobaccos`),

  getFavoriteCoalByUserId: async (userId: string) =>
    await Repository.get(`/user/${userId}/favoriteCoals`),

  sendNewPasswordToEmail: async (email: string) =>
    await RepositoryHelper.save({ email }, "/user/restorePassword"),
};
