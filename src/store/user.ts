import { makeAutoObservable, makeObservable } from "mobx";

class User {
  public userData = null;

  constructor() {
    makeAutoObservable(this);
  }

  public async getUserData(login: string, password: string) {}

  public async toRegistrationUser(
    login: string,
    password: string,
    email: string
  ) {}
}

export default new User();
