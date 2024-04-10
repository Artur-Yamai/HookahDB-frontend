import { runInAction, makeAutoObservable } from "mobx";
import { Product, User, RegistrationUserData } from "Types";
import { notify } from "UI";
import { UserApi } from "API";
import { catchHelper } from "helpers";

class UserStore {
  private _userData: User | null = null;
  private _favoriteTobacco: Product[] = [];
  private _favoriteCoal: Product[] = [];

  public get userData(): User | null {
    return this._userData;
  }

  public get getAvatar(): string | null {
    return this._userData?.avatarUrl ?? null;
  }

  public get favoriteTobacco(): Product[] {
    return this._favoriteTobacco;
  }

  public get favoriteCoal(): Product[] {
    return this._favoriteCoal;
  }

  public get isAuth(): boolean {
    return !!this._userData;
  }

  public get userCodeRole(): number {
    return this._userData?.roleCode ?? -1;
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

  public async toRegistration(regData: RegistrationUserData): Promise<boolean> {
    return await UserApi.register(regData).then((r) => r.success);
  }

  public async autoAuth(): Promise<void> {
    if (!localStorage.token) return;
    try {
      const { data } = await UserApi.autoAuth();
      if (data.success) {
        runInAction(() => {
          this._userData = data.body;
        });
      }
    } catch (error) {
      localStorage.setItem("token", "");
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

  public async updatePassword(
    currentPass: string,
    newPass: string
  ): Promise<boolean> {
    try {
      await UserApi.updatePassword(currentPass, newPass);
      return true;
    } catch (error) {
      catchHelper(error);
      return false;
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

  public async getFavoriteTobaccoByUserId(userId: string): Promise<void> {
    try {
      const { data } = await UserApi.getFavoriteTobaccoByUserId(userId);

      runInAction(() => (this._favoriteTobacco = data.body));
    } catch (error) {
      catchHelper(error);
    }
  }

  public async getFavoriteCoalByUserId(userId: string): Promise<void> {
    try {
      const { data } = await UserApi.getFavoriteCoalByUserId(userId);

      runInAction(() => (this._favoriteCoal = data.body));
    } catch (error) {
      catchHelper(error);
    }
  }

  public clearFavoriteTobaccoList(): void {
    this._favoriteTobacco = [];
  }

  public clearFavoriteCoalList(): void {
    this._favoriteCoal = [];
  }
}

const user = new UserStore();

export default user;
