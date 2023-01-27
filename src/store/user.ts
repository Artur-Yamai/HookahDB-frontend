import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../Types/user/User";
import config from "../configuration";
import { notify } from "../UI/Functions";
import { UserApi } from "../API";

class User {
  public userData: IUser | null = null;

  public getUserData(): IUser | null {
    return this.userData;
  }

  public getAvatar(): string | null {
    return this.userData?.avatarUrl ?? null;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public setAvatarUrlPrefix(userData: IUser): void {
    if (userData === null) {
      this.userData = null;
      return;
    }

    const avatarUrl: string = userData?.avatarUrl;

    if (!avatarUrl || avatarUrl.indexOf(config.photoUrl) !== -1) {
      this.userData = userData;
      return;
    }

    userData.avatarUrl = config.photoUrl + avatarUrl;

    this.userData = userData;
  }

  public async toAuthorization(login: string, password: string) {
    try {
      const { data } = await UserApi.auth(login, password);

      if (data.success) {
        this.setAvatarUrlPrefix(data.data.userData);
        localStorage.setItem("token", data.data.token);
        return { success: data.success };
      } else {
        return data;
      }
    } catch (_) {
      return {
        success: false,
        message: "Ошибка, попробуйте авторизироваться позже",
      };
    }
  }

  public async toRegistration(login: string, password: string, email: string) {
    try {
      const { data } = await UserApi.register(login, password, email);
      return data;
    } catch (error: any) {
      const err = error as AxiosError;
      return {
        success: false,
        message: err.response?.data,
      };
    }
  }

  public async autoAuth() {
    if (!localStorage.token) return;
    try {
      const { data } = await UserApi.autoAuth();
      if (data.success) {
        this.setAvatarUrlPrefix(data.userData);
        // this.userData = data.userData;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      console.log("err", err);
    }
  }

  public async saveNewAvatar(avatar: File): Promise<void> {
    try {
      let formData = new FormData();
      formData.append("avatar", avatar);
      const { data } = await UserApi.saveNewAvatar(formData);
      if (data.success) {
        this.setAvatarUrlPrefix(data.userData);
      } else {
        notify(data.message, "error");
      }
    } catch (err: any) {
      if (err?.response?.data) {
        notify(err?.response?.data?.message, "error");
      }
    }
  }

  public toSignOut(): void {
    localStorage.removeItem("token");

    const user = this.getUserData();
    if (user) {
      localStorage.setItem("login", user.login);
    }
    this.userData = null;
  }

  // public async emailExists(email: string): Promise<boolean> {
  //
  // }
}

export default new User();
