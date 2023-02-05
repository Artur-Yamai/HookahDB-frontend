import { useNavigate } from "react-router";
import { ITobacco } from "../../../Types";
import { Picture } from "../../../UI";
import TobaccoStore from "../../../store/tobacco";
import "./TobaccoInfo.scss";
import { confirm } from "../../../UI/Dialogs";

interface ITobaccoInfo {
  tobacco: ITobacco;
}

export function TobaccoInfo({ tobacco }: ITobaccoInfo): JSX.Element {
  const navigate = useNavigate();

  async function deleteTobacco(id: string) {
    const res = await confirm(
      "Вы уверены что хотите удалить этот табак из списка?"
    );
    if (res) {
      await TobaccoStore.deleteTobacco(id);
      navigate("/for-hookah");
    }
  }

  function updateTobacco() {
    console.log("updateTobacco");
  }

  return (
    <div className="tobacco-info">
      <div className="tobacco-info__photo-place">
        <h1>{tobacco.name}</h1>
        <div className="tobacco-info__controllers-place">
          <span
            className="tobacco-info__controller"
            onClick={() => updateTobacco()}
          >
            изменить
          </span>
          <span
            className="tobacco-info__controller"
            onClick={() => deleteTobacco(tobacco._id)}
          >
            удалить
          </span>
        </div>
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
  );
}
