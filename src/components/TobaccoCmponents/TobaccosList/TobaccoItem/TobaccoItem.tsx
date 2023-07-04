import { Link } from "react-router-dom";
import "./TobaccoItem.scss";
import { Tobacco } from "../../../../Types";
import { Picture } from "../../../../UI";

interface TobaccoCardProps {
  tobacco: Tobacco;
}

export const TobaccoItem = ({ tobacco }: TobaccoCardProps) => {
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
      to={`/tobacco/${tobacco.id}`}
      data-rating={tobacco.rating}
      className={`tc ${getClassName(tobacco.rating)}`}
    >
      <div className="tc__image-wrapper">
        <Picture url={tobacco.photoUrl} />
      </div>
      <p className="tc__name">{tobacco.name}</p>
    </Link>
  );
};
