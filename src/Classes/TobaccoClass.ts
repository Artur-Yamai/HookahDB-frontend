import { Tobacco } from "../Types";
import { ProductClass } from "./ProductClass";

export class TobaccoClass extends ProductClass {
  // eslint-disable-next-line
  constructor(tobacco?: Tobacco | null) {
    super(tobacco);
  }
}
