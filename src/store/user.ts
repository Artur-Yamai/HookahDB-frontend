import axios from "./axios";
import { AxiosError } from "axios";
import {
  makeAutoObservable,
  // makeObservable
} from "mobx";

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
  ) {
    try {
      const { data } = await axios.post("/user/register", {
        email,
        password,
        login,
      });
      return data;
    } catch (error: any) {
      const err = error as AxiosError;
      return err.response?.data;
    }
  }
}

export default new User();
