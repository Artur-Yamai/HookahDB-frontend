export interface AuthorizationUserData {
  login: string;
  password: string;
}

export interface RegistrationUserData extends AuthorizationUserData {
  email: string;
}
