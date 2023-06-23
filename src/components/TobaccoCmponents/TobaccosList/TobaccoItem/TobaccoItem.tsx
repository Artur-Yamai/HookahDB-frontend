import "./TobaccoItem.scss";
import { ITobacco } from "../../../../Types";
import { Picture } from "../../../../UI";
import { useNavigate } from "react-router";

interface ITobaccoCard {
  tobacco: ITobacco;
}

export function TobaccoItem({ tobacco }: ITobaccoCard): JSX.Element {
  const navigate = useNavigate();
  const goToTobaccoPage = (id: string) => navigate(`/tobacco/${id}`);

  const getClassName = (rating: number): string =>
    rating >= 4
      ? "green"
      : rating >= 3
      ? "yellow"
      : rating > 0
      ? "red"
      : "gray";

  return (
    <div
      data-rating={+tobacco.rating}
      className={`tc ${getClassName(+tobacco.rating)}`}
      onClick={() => goToTobaccoPage(tobacco.id)}
    >
      <div className="tc__image-wrapper">
        <Picture url={tobacco.photoUrl} />
      </div>
      <p className="tc__name">{tobacco.name}</p>
    </div>
  );
}
