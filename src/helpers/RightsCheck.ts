import UserStore from "../store/user";

export enum RoleCodes {
  user = 0,
  moderator = 5,
  admin = 10,
}

export const rightsCheck = (roleCode: RoleCodes): boolean =>
  UserStore.userCodeRole >= roleCode;
