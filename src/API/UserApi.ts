import Repository from "./axios";
import RepositoryHelper from "../helpers/RepositoryHelper";
import { GUID, RegistrationUserData } from "../Types";

export const UserApi = {
  auth: async (login: string, password: string) =>
    await Repository.post("/user/auth", {
      password,
      login,
    }),

  autoAuth: async () => await Repository.get("/user/authByToken"),

  register: async (regData: RegistrationUserData) =>
    await RepositoryHelper.save(regData, "/user/register"),

  async saveNewAvatar(data: { id: GUID; photo: File }) {
    return await RepositoryHelper.save(data, "/user/saveAvatar");
  },

  loginExists: async (login: string) =>
    await Repository.get(`/user/loginExists/${login}`),
  emailExists: async (email: string) =>
    await Repository.get(`/user/emailExists/${email}`),
  refCodeExists: async (refCode: string) =>
    await Repository.get(`/user/refCOdeExists/${refCode}`),

  getFavoriteTobaccoByUserId: async (userId: GUID) =>
    await Repository.get(`/user/${userId}/favoriteTobaccos`),

  getFavoriteCoalByUserId: async (userId: GUID) =>
    await Repository.get(`/user/${userId}/favoriteCoals`),
};
