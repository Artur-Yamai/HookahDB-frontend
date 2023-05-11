import { useState, useRef, useEffect } from "react";
import "./ForHookah.scss";
import TobaccoStore from "../../store/tobacco";
import { TobaccosList } from "../../components/TobaccoCmponents";
import { FilterPanel } from "../../components";
import { ISelectOption } from "../../Types";
import { TobaccoEditDialog } from "../../components";

export function ForHookah(): JSX.Element {
  const [selectedList, toggleSelectedList] = useState<string>("Tobaccos");
  const refTobaccoEditDialog: React.MutableRefObject<
    { show: () => boolean } | undefined
  > = useRef();

  function onChange(option: ISelectOption) {
    toggleSelectedList(option.value);
  }

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
      TobaccoStore.clearTobaccoList();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [selectedList]);

  const getData = async () => {
    if (selectedList === "Tobaccos") {
      await TobaccoStore.getAllTobaccos();
    }

    setTimeout(() => {}, 200);
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
