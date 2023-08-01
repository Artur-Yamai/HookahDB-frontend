import { GUID, Product } from "../Types";

export class ProductClass
  implements
    Pick<Product, "name" | "fabricatorId" | "description" | "photoUrl">
{
  name: string = "";
  fabricatorId: string = "";
  description: string = "";
  photoUrl: string = "";
  id: GUID | null = null;

  constructor(tobacco?: Product | null) {
    if (!tobacco) return;

    this.name = tobacco.name;
    this.fabricatorId = tobacco.fabricatorId;
    this.description = tobacco.description;
    this.photoUrl = tobacco.photoUrl;
    this.id = tobacco.id;
  }
}
