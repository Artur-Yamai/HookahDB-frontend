import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import UserStore from "../../../store/user";
import RatingStore from "../../../store/rating";
import TobaccoStore from "../../../store/tobacco";
import { ITobacco } from "../../../Types";
import { Picture, RatingStars } from "../../../UI";
import "./TobaccoInfo.scss";

interface ITobaccoInfo {
  tobacco: ITobacco;
  deleteTobacco: (id: string) => void;
  updateTobacco: () => void;
  toggleFavorite: () => void;
}

function TobaccoInfo({
  tobacco,
  deleteTobacco,
  updateTobacco,
  toggleFavorite,
}: ITobaccoInfo): JSX.Element {
  const favoriteButtonClass = useMemo(() => {
    const cls = tobacco.isFavorite ? "tobacco-info__favorite-button--fill" : "";
    return `tobacco-info__favorite-button ${cls}`;
  }, [tobacco.isFavorite]);

  const changeRating = async (value: number) => {
    const isChange: boolean = await RatingStore.changeRating({
      id: tobacco.isRated ? `${tobacco.id}:${UserStore.userData}` : null,
      entityId: tobacco.id,
      rating: value,
    });
    isChange && TobaccoStore.getTobacco(tobacco.id);
  };

  return (
    <>
      <div className="tobacco-title">
        <h1>{tobacco.name}</h1>
      </div>
      <div className="tobacco-info">
        <div className="tobacco-info__common-data">
          {UserStore.userData && (
            <div className="tobacco-info__controllers-place">
              <span
                className="tobacco-info__controller"
                onClick={() => updateTobacco()}
              >
                изменить
              </span>
              <span
                className="tobacco-info__controller"
                onClick={() => deleteTobacco(tobacco.id)}
              >
                удалить
              </span>
              <button
                onClick={() => toggleFavorite()}
                className={favoriteButtonClass}
              >
                {tobacco.isFavorite ? <BsBookmarkFill /> : <BsBookmark />}
              </button>
            </div>
          )}
          <Picture url={tobacco.photoUrl} />
        </div>
        <div className="tobacco-info__info-block">
          <p className="tobacco-info__info">
            <span className="tobacco-info__label">Изготовитель:</span>
            <span className="tobacco-info__value">{tobacco.fabricator}</span>
          </p>
          <p className="tobacco-info__info">
            <span className="tobacco-info__label">Описание:</span>
            <span className="tobacco-info__value">{tobacco.description}</span>
          </p>
          <RatingStars
            edit={UserStore.isAuth}
            count={5}
            value={tobacco.rating}
            ratingsQuantity={tobacco.ratingsQuantity}
            showDetails={true}
            onChange={changeRating}
          />
        </div>
      </div>
    </>
  );
}

export default observer(TobaccoInfo);
