import { GUID, Tobacco } from "../Types";
import { ProductClass } from "./ProductClass";

export class TobaccoClass extends ProductClass {
  constructor(tobacco?: Tobacco | null) {
    super(tobacco);
  }
}
