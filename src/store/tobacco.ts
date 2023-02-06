import { runInAction, makeAutoObservable } from "mobx";
import { INewTobacco, ITobacco } from "../Types";
import { TobaccoApi } from "../API";
import { notify } from "../UI";
import { catchHelper } from "../helpers";

class Tobacco {
  private _tobaccos: ITobacco[] = [];
  private _tobacco: ITobacco | null = null;

  public get tobaccos(): ITobacco[] {
    return this._tobaccos;
  }

  public get tobacco(): ITobacco | null {
    return this._tobacco;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public clearTobaccoData() {
    this._tobacco = null;
  }

  public async getAllTobaccos() {
    try {
      const { data } = await TobaccoApi.getAllTobaccos();
      if (data.success) {
        runInAction(() => {
          this._tobaccos = data.body;
        });
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async getTobacco(id: string) {
    try {
      const { data } = await TobaccoApi.getTobacco(id);
      if (data.success) {
        runInAction(() => {
          this._tobacco = data.body;
        });
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async createTobacco(tobacco: INewTobacco, photo: File) {
    try {
      const { data } = await TobaccoApi.createTobacco(tobacco, photo);
      notify(data.message, data.success ? "info" : "error");
      if (data.success) {
        this._tobacco = data.body;
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async updateTobacco(tobacco: ITobacco, photo: File | undefined) {
    try {
      const { data } = await TobaccoApi.updateTobacco(tobacco, photo);
      notify(data.message, data.success ? "info" : "error");
      if (data.success) {
        this._tobacco = data.body;
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async deleteTobacco(id: string): Promise<void> {
    try {
      const { data } = await TobaccoApi.delteTobacco(id);
      notify(data.message, data.success ? "info" : "error");
    } catch (error) {
      catchHelper(error);
    }
  }
}

export default new Tobacco();
