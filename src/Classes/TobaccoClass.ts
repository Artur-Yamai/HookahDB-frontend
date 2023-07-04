import { GUID, Tobacco } from "../Types";

export class TobaccoClass
  implements
    Pick<Tobacco, "name" | "fabricatorId" | "description" | "photoUrl">
{
  name: string = "";
  fabricatorId: string = "";
  description: string = "";
  photoUrl: string = "";
  id: GUID | null = null;

  constructor(tobacco?: Tobacco) {
    if (!tobacco) return;

    this.name = tobacco.name;
    this.fabricatorId = tobacco.fabricatorId;
    this.description = tobacco.description;
    this.photoUrl = tobacco.photoUrl;
    this.id = tobacco.id;
  }
}
