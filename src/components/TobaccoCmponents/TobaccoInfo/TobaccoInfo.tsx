import { useState } from "react";
import { useNavigate } from "react-router";
import { ITobacco } from "../../../Types";
import { Image } from "../../../UI";
import TobaccoStore from "../../../store/tobacco";
import { TiDocumentDelete } from "react-icons/ti";
import "./TobaccoInfo.scss";

interface ITobaccoInfo {
  tobacco: ITobacco;
}

export function TobaccoInfo({ tobacco }: ITobaccoInfo): JSX.Element {
  const [selectedPhoto, setPhoto] = useState<string>(tobacco.photosUrl[0]);
  const [selectedPhotoIndex, setPhotoIndex] = useState<number>(0);
  const navigate = useNavigate();

  function toChangePhoto(photoUrl: string, i: number) {
    setPhoto(photoUrl);
    setPhotoIndex(i);
  }

  async function deleteTobacco(id: string) {
    await TobaccoStore.deleteTobacco(id);
    navigate("/for-hookah");
  }

  return (
    <div className="tobacco-info">
      <div className="tobacco-info__photos-area">
        <Image url={selectedPhoto} />
        {tobacco.photosUrl && tobacco.photosUrl.length > 1 && (
          <ul className="tobacco-info__photos-list">
            {tobacco.photosUrl.map((photoUrl: string, i: number) => {
              return (
                <li
                  key={photoUrl}
                  className={`tobacco-info__photo-elem ${
                    selectedPhotoIndex === i
                      ? "tobacco-info__photo-elem--selected"
                      : ""
                  }`}
                  onClick={() => toChangePhoto(photoUrl, i)}
                >
                  <Image url={photoUrl} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="tobacco-info__info-block">
        <h1>
          {tobacco.name}
          {/* <Button click={() => deleteTobacco(tobacco._id)} /> */}
          <span className="tobacco-info__delete-button">
            <TiDocumentDelete onClick={() => deleteTobacco(tobacco._id)} />
          </span>
        </h1>
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
  );
}
