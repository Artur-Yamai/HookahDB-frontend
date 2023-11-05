import { runInAction, makeAutoObservable } from "mobx";
import { Product, Comment, ProductForSave } from "Types";
import { TobaccoApi, CommentApi } from "API";
import { catchHelper } from "helpers";

class TobaccoStore {
  private _tobaccos: Product[] = [];
  private _tobacco: Product | null = null;
  private _comments: Comment[] = [];

  public get tobaccos(): Product[] {
    return this._tobaccos;
  }

  public get tobacco(): Product | null {
    return this._tobacco;
  }

  public get comments(): Comment[] {
    return this._comments;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public clearTobaccoData() {
    this._tobacco = null;
  }

  public clearTobaccoComments() {
    this._comments = [];
  }

  public clearTobaccoList() {
    this._tobaccos = [];
  }

  public async getAllTobaccos(): Promise<void> {
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

  public async getTobacco(id: string): Promise<void> {
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

  public async getComments(id: string): Promise<void> {
    try {
      const { data } = await TobaccoApi.getTobaccoComments(id);
      if (data.success) {
        runInAction(() => (this._comments = data.body));
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async saveComment(
    comment: string,
    id: string | null,
    tobaccoId: string
  ): Promise<boolean> {
    try {
      const { success }: { success: boolean } =
        await CommentApi.saveTobaccoComment(id, tobaccoId, comment);

      if (success) {
        await this.getComments(tobaccoId);
      }

      return success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await CommentApi.deleteTobaccoComment(id);
      if (this.tobacco) {
        await this.getComments(this.tobacco.id);
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async createTobacco(
    tobacco: ProductForSave,
    photo: File
  ): Promise<boolean> {
    try {
      const data = await TobaccoApi.saveTobacco(tobacco, photo);
      if (data.success) {
        this.getAllTobaccos();
      }

      return !!data?.success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async updateTobacco(
    tobacco: ProductForSave,
    photo?: File
  ): Promise<boolean> {
    try {
      const data = await TobaccoApi.saveTobacco(tobacco, photo);
      if (data.success) {
        runInAction(() => (this._tobacco = data.body));
      }

      return !!data?.success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async deleteTobacco(id: string): Promise<void> {
    try {
      await TobaccoApi.deleteTobacco(id);
    } catch (error) {
      catchHelper(error);
    }
  }

  public async addToFavoriteList(tobaccoId: string): Promise<void> {
    try {
      const res = await TobaccoApi.addToFavoriteList(tobaccoId);
      if (res) {
        await this.getTobacco(tobaccoId);
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async deleteFromFavoriteList(tobaccoId: string): Promise<void> {
    try {
      await TobaccoApi.deleteFromFavoriteList(tobaccoId);
      await this.getTobacco(tobaccoId);
    } catch (error) {
      catchHelper(error);
    }
  }
}

const tobacco = new TobaccoStore();

export default tobacco;
