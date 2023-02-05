import "./TobaccoItem.scss";
import { ITobacco } from "../../../../Types";
import { Picture } from "../../../../UI";
import { useNavigate } from "react-router";

interface ITobaccoCard {
  data: ITobacco;
}

export function TobaccoItem({ data }: ITobaccoCard): JSX.Element {
  const navigate = useNavigate();
  function goToTobaccoPage(id: string) {
    navigate(`/tobacco/${id}`);
  }

  return (
    <div className="tc" onClick={() => goToTobaccoPage(data._id)}>
      <div className="tc__image-wrapper">
        <Picture url={data.photosUrl[0]} />
      </div>
      <p className="tc__name">{data.name}</p>
      <p className="tc__desc">{data.description}</p>
    </div>
  );
}
