import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import TobaccoStore from "../../../store/tobacco";
import { ITobacco } from "../../../Types";
import { TobaccoCard } from "../TobaccoCard/TobaccoCard";
import "./TobaccosList.scss";

function TobaccosList(): JSX.Element {
  const [isLoading, toggleLoading] = useState<boolean>(true);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await TobaccoStore.getAllTobaccos();
    setTimeout(() => {
      toggleLoading(false);
    }, 200);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tl">
      {TobaccoStore.tobaccos.length &&
        TobaccoStore.tobaccos.map((tobacco: ITobacco) => (
          <TobaccoCard key={tobacco._id} data={tobacco} />
        ))}
    </div>
  );
}

export default observer(TobaccosList);
