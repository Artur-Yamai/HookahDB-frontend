import { observer } from "mobx-react-lite";
import { Tobacco } from "../../../Types";
import { TobaccoItem } from "./TobaccoItem/TobaccoItem";
import "./TobaccosList.scss";

interface TobaccosListProps {
  tobaccoList: Tobacco[];
}

function TobaccosList({ tobaccoList }: TobaccosListProps): JSX.Element {
  return (
    <div className="tl">
      {!!tobaccoList.length &&
        tobaccoList.map((tobacco: Tobacco) => (
          <TobaccoItem key={tobacco.id} tobacco={tobacco} />
        ))}
    </div>
  );
}

export default observer(TobaccosList);
