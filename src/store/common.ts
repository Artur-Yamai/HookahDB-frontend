import { makeAutoObservable } from "mobx";

class Common {
  private _loading: boolean = false;

  public get loading(): boolean {
    return this._loading;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public toggleLoading(loading: boolean): void {
    this._loading = loading;
  }
}

export default new Common();
