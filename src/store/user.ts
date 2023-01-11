import axios from "./axios";
import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";

interface IUserData {
  createdAt: string;
  email: string;
  login: string;
  roleCode: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

class User {
  public userData: IUserData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public async toAuthorization(login: string, password: string) {
    try {
      const { data } = await await axios.post("/user/auth", {
        password,
        login,
      });

      if (data.success) {
        this.userData = data.userData;
        localStorage.setItem("token", data.data.token);
        return { success: data.success };
      } else {
        return data;
      }
    } catch (error) {
      return {
        success: false,
        message: "Ошибка, попробуйте авторизироваться позже",
      };
    }
  }

  public async toRegistration(login: string, password: string, email: string) {
    try {
      const { data } = await axios.post("/user/register", {
        email,
        password,
        login,
      });
      return data;
    } catch (error: any) {
      const err = error as AxiosError;
      return {
        success: false,
        message: err.response?.data,
      };
    }
  }
}

export default new User();
