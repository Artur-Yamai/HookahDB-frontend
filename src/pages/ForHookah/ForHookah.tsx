import { useState, useRef, useEffect } from "react";
import "./ForHookah.scss";
import { observer } from "mobx-react-lite";
import TobaccoStore from "../../store/tobacco";
import { TobaccosList } from "../../components/TobaccoCmponents";
import { FilterPanel } from "../../components";
import { ISelectOption } from "../../Types";
import { TobaccoEditDialog } from "../../components";

function ForHookah(): JSX.Element {
  const [selectedList, toggleSelectedList] = useState<string>("Tobaccos");
  const refTobaccoEditDialog: React.MutableRefObject<
    { show: () => boolean } | undefined
  > = useRef();

  const onChange = (option: ISelectOption) => {
    toggleSelectedList(option.value);
    getData();
  };

  async function add() {
    if (selectedList === "Tobaccos") {
      if (!refTobaccoEditDialog.current) return;

      const res: boolean = await refTobaccoEditDialog.current.show();
      console.log(res);
    }
  }

  useEffect(() => {
    getData();

    return function () {
      clearData();
    };
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    if (selectedList === "Tobaccos") {
      await TobaccoStore.getAllTobaccos();
    }
  };

  const clearData = () => {
    TobaccoStore.clearTobaccoList();
  };

  return (
    <div className="for-hookah">
      <FilterPanel onChangeFilterValue={onChange} add={add} />
      {selectedList === "Tobaccos" && (
        <TobaccosList tobaccoList={TobaccoStore.tobaccos} />
      )}
      <TobaccoEditDialog ref={refTobaccoEditDialog} />
    </div>
  );
}

export default observer(ForHookah);
