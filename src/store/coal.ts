import { makeAutoObservable, runInAction } from "mobx";
import { Coal, GUID } from "../Types";
import { catchHelper } from "../helpers";
import { CoalApi } from "../API";
import { CoalClass } from "../Classes";

class CoalStore {
  private _coals: Coal[] = [];
  private _coal: Coal | null = null;

  public get coals(): Coal[] {
    return this._coals;
  }

  public get coal(): Coal | null {
    return this._coal;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public clearCoalList(): void {
    this._coals = [];
  }

  public clearCoalData(): void {
    this._coal = null;
  }

  public async getAllCoals(): Promise<void> {
    try {
      const { data } = await CoalApi.getAllCoals();
      if (data.success) {
        runInAction(() => (this._coals = data.body));
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async getCoal(id: string): Promise<void> {
    try {
      const { data } = await CoalApi.getCoal(id);
      if (data.success) {
        runInAction(() => {
          this._coal = data.body;
        });
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async createCoal(coal: CoalClass, photo: File): Promise<void> {
    try {
      const data = await CoalApi.saveCoal(coal, photo);
      if (data.success) {
        this.getAllCoals();
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async updateCoal(coal: CoalClass, photo?: File): Promise<void> {
    try {
      const data = await CoalApi.saveCoal(coal, photo);
      if (data.success) {
        runInAction(() => (this._coal = data.body));
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async deleteCoal(id: GUID): Promise<void> {
    try {
      await CoalApi.deleteCoal(id);
    } catch (error) {
      catchHelper(error);
    }
  }

  public async addToFavoriteList(coalId: GUID): Promise<void> {
    try {
      const res = await CoalApi.addToFavoriteList(coalId);
      if (res) {
        await this.getCoal(coalId);
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async deleteFromFavoriteList(coalId: GUID): Promise<void> {
    try {
      await CoalApi.deleteFromFavoriteList(coalId);
      await this.getCoal(coalId);
    } catch (error) {
      catchHelper(error);
    }
  }
}

const coal = new CoalStore();

export default coal;
