export interface IUserAuthorizationData {
  login: string;
  password: string;
}

export interface IUserRegistrationData extends IUserAuthorizationData {
  email: string;
}
