import { makeAutoObservable, runInAction } from "mobx";
import { Coal } from "../Types";
import { catchHelper } from "../helpers";
import { CoalApi } from "../API";

class CoalStore {
  private _coals: Coal[] = [];

  public get coals(): Coal[] {
    return this._coals;
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
}

const coal = new CoalStore();

export default coal;
