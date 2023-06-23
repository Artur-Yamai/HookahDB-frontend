import "./TobaccoItem.scss";
import { ITobacco } from "../../../../Types";
import { Picture } from "../../../../UI";
import { useNavigate } from "react-router";

interface ITobaccoCard {
  data: ITobacco;
}

export function TobaccoItem({ data }: ITobaccoCard): JSX.Element {
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
      data-rating={+data.rating}
      className={`tc ${getClassName(+data.rating)}`}
      onClick={() => goToTobaccoPage(data.id)}
    >
      <div className="tc__image-wrapper">
        <Picture url={data.photoUrl} />
      </div>
      <p className="tc__name">{data.name}</p>
    </div>
  );
}
