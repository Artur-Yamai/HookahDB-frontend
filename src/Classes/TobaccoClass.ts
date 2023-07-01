import { ITobacco } from "../Types";

export class TobaccoClass
  implements
    Pick<ITobacco, "name" | "fabricatorId" | "description" | "photoUrl" | "id">
{
  name: string = "";
  fabricatorId: string = "";
  description: string = "";
  photoUrl: string = "";
  id: string = "";

  constructor(tobacco: ITobacco | null) {
    if (!tobacco) return;

    this.name = tobacco.name;
    this.fabricatorId = tobacco.fabricatorId;
    this.description = tobacco.description;
    this.photoUrl = tobacco.photoUrl;
    this.id = tobacco.id;
  }
}
