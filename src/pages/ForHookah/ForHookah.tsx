import { useState } from "react";
import "./ForHookah.scss";
import { TobaccosList } from "../../components/TobaccoCmponents";
import { FilterPanel } from "../../components";
import { ISelectOption } from "../../Types";

export function ForHookah(): JSX.Element {
  const [selectedList, toggleSelectedList] = useState<string>("Tobacco");
  const [loading, toggleLoading] = useState<boolean>(false);

  function onChange(option: ISelectOption) {
    toggleSelectedList(option.value);
  }

  return (
    <div className="for-hookah">
      <FilterPanel onChange={onChange} />
      {loading && <div>Loading...</div>}
      {selectedList === "Tobacco" && (
        <TobaccosList toggleLoading={toggleLoading} />
      )}
    </div>
  );
}
