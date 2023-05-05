import { runInAction, makeAutoObservable } from "mobx";
import { ITobacco, IComment } from "../Types";
import { TobaccoApi, CommentApi } from "../API";
import { catchHelper } from "../helpers";
import { TobaccoClass } from "../Classes";

class Tobacco {
  private _tobaccos: ITobacco[] = [];
  private _tobacco: ITobacco | null = null;
  private _comments: IComment[] = [];

  public get tobaccos(): ITobacco[] {
    return this._tobaccos;
  }

  public get tobacco(): ITobacco | null {
    return this._tobacco;
  }

  public get comments(): IComment[] {
    return this._comments;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public clearTobaccoData() {
    this._tobacco = null;
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

  public clearTobaccoList() {
    this._tobaccos = [];
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

  public async sendNewComment(id: string, comment: string): Promise<boolean> {
    try {
      const { success }: { success: boolean } = await CommentApi.createComment(
        id,
        comment
      );

      if (success) {
        await this.getComments(id);
      }

      return success;
    } catch (error) {
      catchHelper(error);
      return false;
    }
  }

  public async createTobacco(
    tobacco: TobaccoClass,
    photo: File
  ): Promise<void> {
    const data = await TobaccoApi.saveTobacco(tobacco, photo);
    if (data.success) {
      this.getAllTobaccos();
    }
  }

  public async updateTobacco(
    tobacco: TobaccoClass,
    photo: File | undefined
  ): Promise<void> {
    const data = await TobaccoApi.saveTobacco(tobacco, photo);
    if (data.success) {
      runInAction(() => {
        this._tobacco = data.body;
      });
    }
  }

  public async deleteTobacco(id: string): Promise<void> {
    return await TobaccoApi.deleteTobacco(id);
  }
}

export default new Tobacco();
