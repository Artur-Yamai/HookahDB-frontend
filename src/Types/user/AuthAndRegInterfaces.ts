export interface AuthorizationData {
  login: string;
  password: string;
}

export interface RegistrationData extends AuthorizationData {
  email: string;
}
