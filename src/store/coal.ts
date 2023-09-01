import { makeAutoObservable, runInAction } from "mobx";
import { Coal, Comment, ProductForSave } from "../Types";
import { catchHelper } from "../helpers";
import { CoalApi, CommentApi } from "../API";

class CoalStore {
  private _coals: Coal[] = [];
  private _coal: Coal | null = null;
  private _comments: Comment[] = [];

  public get coals(): Coal[] {
    return this._coals;
  }

  public get coal(): Coal | null {
    return this._coal;
  }

  public get comments(): Comment[] {
    return this._comments;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public clearCoalList(): void {
    this._coals = [];
  }

  public clearCoalComments(): void {
    this._comments = [];
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

  public async getComments(id: string): Promise<void> {
    try {
      const { data } = await CoalApi.getCoalComments(id);
      if (data.success) {
        runInAction(() => (this._comments = data.body));
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async saveComment(comment: string, id: string | null, coalId: string) {
    try {
      const { success }: { success: boolean } =
        await CommentApi.saveCoalComment(id, coalId, comment);

      if (success) {
        await this.getComments(coalId);
      }

      return success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await CommentApi.deleteCoalComment(id);
      if (this.coal) {
        await this.getComments(this.coal.id);
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async createCoal(coal: ProductForSave, photo: File): Promise<void> {
    try {
      const data = await CoalApi.saveCoal(coal, photo);
      if (data.success) {
        this.getAllCoals();
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async updateCoal(coal: ProductForSave, photo?: File): Promise<void> {
    try {
      const data = await CoalApi.saveCoal(coal, photo);
      if (data.success) {
        runInAction(() => (this._coal = data.body));
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async deleteCoal(id: string): Promise<void> {
    try {
      await CoalApi.deleteCoal(id);
    } catch (error) {
      catchHelper(error);
    }
  }

  public async addToFavoriteList(coalId: string): Promise<void> {
    try {
      const res = await CoalApi.addToFavoriteList(coalId);
      if (res) {
        await this.getCoal(coalId);
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async deleteFromFavoriteList(coalId: string): Promise<void> {
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
