import { useState, useRef } from "react";
import "./ForHookah.scss";
import { TobaccosList } from "../../components/TobaccoCmponents";
import { FilterPanel } from "../../components";
import { ISelectOption } from "../../Types";
import { TobaccoEditDialog } from "../../components";

export function ForHookah(): JSX.Element {
  const [selectedList, toggleSelectedList] = useState<string>("Tobaccos");
  const [loading, toggleLoading] = useState<boolean>(false);
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

  return (
    <div className="for-hookah">
      <FilterPanel onChangeFilterValue={onChange} add={add} />
      {loading && <div>Loading...</div>}
      {selectedList === "Tobaccos" && (
        <TobaccosList toggleLoading={toggleLoading} />
      )}
      <TobaccoEditDialog ref={refTobaccoEditDialog} />
    </div>
  );
}
