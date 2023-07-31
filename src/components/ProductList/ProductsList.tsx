import { observer } from "mobx-react-lite";
import "./ProductsList.scss";

interface ProductsListProps {
  children: JSX.Element[];
}

const ProductsList = ({ children }: ProductsListProps): JSX.Element => {
  return <div className="propduct-list">{children}</div>;
};

export default observer(ProductsList);
