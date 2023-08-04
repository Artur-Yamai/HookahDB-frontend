import { Coal } from "../Types";
import { ProductClass } from "./ProductClass";

export class CoalClass extends ProductClass {
  // eslint-disable-next-line
  constructor(coal?: Coal | null) {
    super(coal);
  }
}
