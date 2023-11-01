import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMount, useUnmount } from "hooks";
import TobaccoStore from "store/tobacco";
import CoalStore from "store/coal";
import { TobaccosList, CoalList, EntitySelectionAndCreation } from "components";
import { TabPanel } from "UI";
import { ProductListName, SelectOption } from "Types";
import { RoleCodes, rightsCheck } from "helpers";
import "./ForHookah.scss";

export const ForHookah: React.FC = observer(() => {
  const options: SelectOption[] = [
    { value: "tobaccos", label: "Табаки" },
    { value: "coals", label: "Угли" },
  ];
  const [searchParams, setSearchParams] = useSearchParams();

  const listName = searchParams.get("list-name");
  const option = options.find((opt) => opt.value === listName) ?? options[0];

  const [selectedOption, setSelectedOption] = useState<SelectOption>(option);
  const [isVisibleDialog, toggleVisibleDialog] = useState<boolean>(false);

  const onChange = (option: SelectOption): void => {
    setSelectedOption(option);
    setSearchParams({ "list-name": option.value });
    getData(option.value);
  };

  useMount(() => getData(selectedOption.value));
  useUnmount(() => clearData());

  const getData = (productName: ProductListName): void => {
    clearData();

    switch (productName) {
      case "tobaccos":
        TobaccoStore.getAllTobaccos();
        break;
      case "coals":
        CoalStore.getAllCoals();
        break;
    }
  };

  const clearData = (): void => {
    TobaccoStore.clearTobaccoList();
    CoalStore.clearCoalList();
  };

  return (
    <>
      <Helmet>
        <title>HookahDB</title>
      </Helmet>
      <div className="w100 for-hookah">
        <TabPanel
          options={options}
          onClick={onChange}
          defaultOption={selectedOption}
        />
        {(selectedOption.value === "tobaccos" && (
          <TobaccosList tobaccos={TobaccoStore.tobaccos} />
        )) ||
          (selectedOption.value === "coals" && (
            <CoalList coals={CoalStore.coals} />
          ))}
        {rightsCheck(RoleCodes.moderator) && (
          <>
            <button
              className="for-hookah__add-button"
              onClick={() => toggleVisibleDialog(true)}
            >
              +
            </button>
            <EntitySelectionAndCreation
              visible={isVisibleDialog}
              close={() => toggleVisibleDialog(false)}
            />
          </>
        )}
      </div>
    </>
  );
});
