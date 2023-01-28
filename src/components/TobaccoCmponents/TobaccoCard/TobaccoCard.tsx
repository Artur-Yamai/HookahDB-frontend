import "./TobaccoCard.scss";
import { ITobacco } from "../../../Types";
import { Image } from "../../../UI";
import { notify } from "../../../UI/Functions";

interface ITobaccoCard {
  data: ITobacco;
}

export function TobaccoCard({ data }: ITobaccoCard): JSX.Element {
  function goToTabaccoPage() {
    notify("Страница табака на данный момент недоступна", "warning");
  }

  return (
    <div className="tc" onClick={goToTabaccoPage}>
      <div className="tc__image-wrapper">
        <Image url={data.photosUrl[0]} />
      </div>
      <p className="tc__name">{data.name}</p>
      <p className="tc__desc">{data.description}</p>
    </div>
  );
}
