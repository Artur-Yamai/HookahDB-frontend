import { Tobacco } from "../Types";

export class TobaccoClass
  implements
    Pick<Tobacco, "name" | "fabricatorId" | "description" | "photoUrl" | "id">
{
  name: string = "";
  fabricatorId: string = "";
  description: string = "";
  photoUrl: string = "";
  id: string = "";

  constructor(tobacco: Tobacco | null) {
    if (!tobacco) return;

    this.name = tobacco.name;
    this.fabricatorId = tobacco.fabricatorId;
    this.description = tobacco.description;
    this.photoUrl = tobacco.photoUrl;
    this.id = tobacco.id;
  }
}
