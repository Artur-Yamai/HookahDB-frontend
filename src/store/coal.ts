import { makeAutoObservable, runInAction } from "mobx";
import { Coal } from "../Types";
import { catchHelper } from "../helpers";
import { CoalApi } from "../API";

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
}

const coal = new CoalStore();

export default coal;
