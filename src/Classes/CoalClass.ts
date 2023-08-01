import { Coal } from "../Types";
import { ProductClass } from "./ProductClass";

export class CoalClass extends ProductClass {
  constructor(coal?: Coal | null) {
    super(coal);
  }
}
