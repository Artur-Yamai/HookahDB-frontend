import "./ForHookah.scss";
import { TobaccosList } from "../../components/TobaccoCmponents";

export function ForHookah(): JSX.Element {
  const selectedList: string = "tobacco-list";

  return (
    <div className="for-hookah">
      <div className="for-hookah__filter-panel"></div>
      {selectedList === "tobacco-list" && <TobaccosList />}
    </div>
  );
}
