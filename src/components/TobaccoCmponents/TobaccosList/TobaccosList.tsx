import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import TobaccoStore from "../../../store/tobacco";
import { ITobacco } from "../../../Types";
import { TobaccoItem } from "./TobaccoItem/TobaccoItem";
import "./TobaccosList.scss";

interface ITobaccosList {
  toggleLoading: (value: boolean) => void;
}

function TobaccosList({ toggleLoading }: ITobaccosList): JSX.Element {
  useEffect(() => {
    getData();

    return function () {
      TobaccoStore.clearTobaccoList();
    };
    // eslint-disable-next-line
  }, []);

  async function getData() {
    toggleLoading(true);
    await TobaccoStore.getAllTobaccos();

    setTimeout(() => {
      toggleLoading(false);
    }, 200);
  }

  return (
    <div className="tl">
      {!!TobaccoStore.tobaccos.length &&
        TobaccoStore.tobaccos.map((tobacco: ITobacco) => (
          <TobaccoItem key={tobacco.id} data={tobacco} />
        ))}
    </div>
  );
}

export default observer(TobaccosList);
