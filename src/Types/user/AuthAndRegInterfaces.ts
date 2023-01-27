export interface IAuthorizationUserData {
  login: string;
  password: string;
}

export interface IRegistrationUserData extends IAuthorizationUserData {
  email: string;
}
