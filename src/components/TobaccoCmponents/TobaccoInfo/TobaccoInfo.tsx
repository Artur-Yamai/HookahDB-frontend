import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import UserStore from "../../../store/user";
import { ITobacco } from "../../../Types";
import { Picture } from "../../../UI";
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
  const [className, changeClassName] = useState<string>();

  useEffect(() => {
    const cls = tobacco.isFavorite ? "tobacco-info__favorite-button--fill" : "";
    changeClassName(`${cls} tobacco-info__favorite-button`);
  }, [tobacco.isFavorite]);

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
              <button onClick={() => toggleFavorite()} className={className}>
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

          <p className="tobacco-info__info">
            {/* нужен отдельный компонент оценки и спиннер на время подгрузки */}
            <span className="tobacco-info__label">Оценка:</span>
            <span className="tobacco-info__value">5/10</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default observer(TobaccoInfo);
