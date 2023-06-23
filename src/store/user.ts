import { runInAction, makeAutoObservable } from "mobx";
import { ITobacco, IUser } from "../Types";
import { notify } from "../UI";
import { UserApi } from "../API";
import { catchHelper } from "../helpers";

class User {
  private _userData: IUser | null = null;
  private _favoriteTobacco: ITobacco[] = [];

  public get userData(): IUser | null {
    return this._userData;
  }

  public get getAvatar(): string | null {
    return this._userData?.avatarUrl ?? null;
  }

  public get favoriteTobacco(): ITobacco[] {
    return this._favoriteTobacco;
  }

  public get isAuth(): boolean {
    return !!this._userData;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public async toAuthorization(
    login: string,
    password: string
  ): Promise<boolean> {
    try {
      const { data } = await UserApi.auth(login, password);

      if (data.success) {
        runInAction(() => {
          this._userData = data.data.user;
          localStorage.setItem("token", data.data.token);
        });
      }
      return data.success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async toRegistration(login: string, password: string, email: string) {
    return await UserApi.register(login, password, email).then(
      (r) => r.success
    );
  }

  public async autoAuth() {
    if (!localStorage.token) return;
    try {
      const { data } = await UserApi.autoAuth();
      if (data.success) {
        runInAction(() => {
          this._userData = data.body;
        });
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async saveNewAvatar(photo: File): Promise<void> {
    try {
      if (!this.userData) {
        notify("Ошибка доступа", "error");
        return;
      }

      const data = await UserApi.saveNewAvatar({
        id: this.userData?.id,
        photo,
      });

      runInAction(() => {
        this._userData = data.body;
      });
    } catch (error) {
      catchHelper(error);
    }
  }

  public toSignOut(): void {
    localStorage.removeItem("token");

    const user = this.userData;
    if (user) {
      localStorage.setItem("login", user.login);
    }
    this._userData = null;
  }

  public async getFavoriteTobaccoByUserId(userId: string) {
    try {
      const { data } = await UserApi.getFavoriteTobaccoByUserId(userId);

      runInAction(() => {
        this._favoriteTobacco = data.body;
      });
    } catch (error) {
      catchHelper(error);
    }
  }

  public clearFavoriteTobaccoList() {
    this._favoriteTobacco = [];
  }
}

const user = new User();

export default user;
