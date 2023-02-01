import { AxiosError } from "axios";
import { runInAction, makeAutoObservable } from "mobx";
import { IUser } from "../Types/user/User";
import { notify } from "../UI/Functions";
import { UserApi } from "../API";
import { catchHelper } from "../helpers";

class User {
  public userData: IUser | null = null;

  public get getUserData(): IUser | null {
    return this.userData;
  }

  public get getAvatar(): string | null {
    return this.userData?.avatarUrl ?? null;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public async toAuthorization(login: string, password: string) {
    try {
      const { data } = await UserApi.auth(login, password);

      if (data.success) {
        runInAction(() => {
          this.userData = data.data.userData;
          localStorage.setItem("token", data.data.token);
          return { success: data.success };
        });
      } else {
        return data;
      }
    } catch (err) {
      const error = err as AxiosError;
      const data: any = error.response?.data;
      const message =
        data?.message ?? "Ошибка, попробуйте авторизироваться позже";
      return {
        success: false,
        message,
      };
    }
  }

  public async toRegistration(login: string, password: string, email: string) {
    try {
      const { data } = await UserApi.register(login, password, email);
      return data.success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async autoAuth() {
    if (!localStorage.token) return;
    try {
      const { data } = await UserApi.autoAuth();
      if (data.success) {
        runInAction(() => {
          this.userData = data.userData;
        });
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async saveNewAvatar(avatar: File): Promise<void> {
    try {
      let formData = new FormData();
      formData.append("avatar", avatar);
      const { data } = await UserApi.saveNewAvatar(formData);
      if (data.success) {
        runInAction(() => {
          this.userData = data.userData;
        });
      } else {
        notify(data.message, "error");
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public toSignOut(): void {
    localStorage.removeItem("token");

    const user = this.getUserData;
    if (user) {
      localStorage.setItem("login", user.login);
    }
    this.userData = null;
  }
}

export default new User();
