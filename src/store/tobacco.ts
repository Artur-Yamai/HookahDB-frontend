import { runInAction, makeAutoObservable } from "mobx";
import { Tobacco, Comment } from "../Types";
import { TobaccoApi, CommentApi } from "../API";
import { catchHelper } from "../helpers";
import { TobaccoClass } from "../Classes";

class TobaccoStore {
  private _tobaccos: Tobacco[] = [];
  private _tobacco: Tobacco | null = null;
  private _comments: Comment[] = [];

  public get tobaccos(): Tobacco[] {
    return this._tobaccos;
  }

  public get tobacco(): Tobacco | null {
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
        runInAction(() => {
          this._comments = data.body;
        });
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
      const { success }: { success: boolean } = await CommentApi.saveComment(
        id,
        tobaccoId,
        "tobacco",
        comment
      );

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
      await CommentApi.deleteComment(id);
      if (this.tobacco) {
        await this.getComments(this.tobacco.id);
      }
      return;
    } catch (error) {
      catchHelper(error);
    }
  }

  public async createTobacco(
    tobacco: TobaccoClass,
    photo: File
  ): Promise<void> {
    try {
      const data = await TobaccoApi.saveTobacco(tobacco, photo);
      if (data.success) {
        this.getAllTobaccos();
      }
    } catch (error) {
      catchHelper(error);
    }
  }

  public async updateTobacco(
    tobacco: TobaccoClass,
    photo: File | undefined
  ): Promise<void> {
    try {
      const data = await TobaccoApi.saveTobacco(tobacco, photo);
      if (data.success) {
        runInAction(() => {
          this._tobacco = data.body;
        });
      }
    } catch (error) {
      catchHelper(error);
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
      const res: boolean = await TobaccoApi.deleteFromFavoriteList(tobaccoId);
      if (res) {
        await this.getTobacco(tobaccoId);
      }
    } catch (error) {
      catchHelper(error);
    }
  }
}

const tobacco = new TobaccoStore();

export default tobacco;
