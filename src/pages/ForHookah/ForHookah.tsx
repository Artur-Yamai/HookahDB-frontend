import "./ForHookah.scss";
import { TobaccosList } from "../../components/TobaccoCmponents";

export function ForHookah(): JSX.Element {
  const selectedList: string = "tobacco-list";

  return (
    <div className="fh">
      <div className="fh__filter-panel"></div>
      {selectedList === "tobacco-list" && <TobaccosList />}
    </div>
  );
}
