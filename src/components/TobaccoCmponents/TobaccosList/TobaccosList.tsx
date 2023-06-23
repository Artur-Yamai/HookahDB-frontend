import { observer } from "mobx-react-lite";
import { ITobacco } from "../../../Types";
import { TobaccoItem } from "./TobaccoItem/TobaccoItem";
import "./TobaccosList.scss";

interface ITobaccosList {
  tobaccoList: ITobacco[];
}

function TobaccosList({ tobaccoList }: ITobaccosList): JSX.Element {
  return (
    <div className="tl">
      {!!tobaccoList.length &&
        tobaccoList.map((tobacco: ITobacco) => (
          <TobaccoItem key={tobacco.id} tobacco={tobacco} />
        ))}
    </div>
  );
}

export default observer(TobaccosList);
