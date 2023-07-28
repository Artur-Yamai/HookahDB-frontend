import { observer } from "mobx-react-lite";
import { Tobacco } from "../../../Types";
import { TobaccoItem } from "./TobaccoItem";

interface TobaccosListProps {
  tobaccoList: Tobacco[];
}

const TobaccosList = ({ tobaccoList }: TobaccosListProps): JSX.Element => {
  return (
    <div className="propduct-list">
      {!!tobaccoList.length &&
        tobaccoList.map((tobacco: Tobacco) => (
          <TobaccoItem key={tobacco.id} tobacco={tobacco} />
        ))}
    </div>
  );
};

export default observer(TobaccosList);
