import { INewTobacco } from "../Types";

export class TobaccoClass implements INewTobacco {
  name: string;
  fabricator: string;
  description: string;
  photoUrl: string;
  id?: string;
  userId?: string;

  constructor(tobacco: TobaccoClass | null) {
    this.name = tobacco?.name ?? "";
    this.fabricator = tobacco?.fabricator ?? "";
    this.description = tobacco?.description ?? "";
    this.id = tobacco?.id ?? "";
    this.photoUrl = tobacco?.photoUrl ?? "";
    this.userId = tobacco?.userId ?? "";
  }
}
