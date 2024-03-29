import { Link } from "react-router-dom";
import "./ProductItem.scss";
import { ProductAtList } from "Types";
import { Picture } from "UI";

interface ProductItemProps {
  data: ProductAtList;
  url: string;
}

export const ProductItem = ({ data, url }: ProductItemProps) => {
  const getClassName = (rating: number): string =>
    rating >= 4
      ? "green"
      : rating >= 3
      ? "yellow"
      : rating > 0
      ? "red"
      : "gray";

  return (
    <Link
      to={url}
      data-rating={data.rating}
      className={`product-item ${getClassName(data.rating)}`}
    >
      <div className="product-item__image-wrapper">
        <Picture className="product-item__image" url={data.photoUrl} />
      </div>
      <p className="product-item__name">{data.name}</p>
    </Link>
  );
};
