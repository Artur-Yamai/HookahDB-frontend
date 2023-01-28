import { makeAutoObservable } from "mobx";
import { ITobacco } from "../Types";
import { TobaccoApi } from "../API";

class Tobacco {
  private _tobaccos: ITobacco[] = [];

  public get tobaccos(): ITobacco[] {
    return this._tobaccos;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public async getAllTobaccos() {
    try {
      const { data } = await TobaccoApi.getAllTobaccos();
      if (data.success) {
        this._tobaccos = data.body;
      }
    } catch (error) {}
  }
}

export default new Tobacco();
