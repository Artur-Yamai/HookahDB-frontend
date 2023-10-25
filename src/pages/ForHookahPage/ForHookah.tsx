import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useMount, useUnmount } from "hooks";
import TobaccoStore from "store/tobacco";
import CoalStore from "store/coal";
import {
  FilterPanel,
  TobaccosList,
  CoalList,
  AddSelectionDialog,
} from "components";
import { ProductListName, SelectOption, AddedEntitiesTypes } from "Types";
import { TobaccoEditDialog, CoalEditDialog } from "components";
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
  const [isVisibleSelectionDialog, toggleVisibleSelectionDialog] =
    useState<boolean>(false);
  const [entityDialogType, setEntityDialogType] =
    useState<AddedEntitiesTypes>();

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

  const openEntityDialog = (entity: AddedEntitiesTypes) => {
    toggleVisibleSelectionDialog(false);
    setEntityDialogType(entity);
    toggleVisibleDialog(true);
  };

  return (
    <>
      <Helmet>
        <title>HookahDB</title>
      </Helmet>
      <div className="w100 for-hookah">
        <FilterPanel
          onChangeFilterValue={onChange}
          options={options}
          value={selectedOption}
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
              onClick={() => toggleVisibleSelectionDialog(true)}
            >
              +
            </button>
            <AddSelectionDialog
              isVisible={isVisibleSelectionDialog}
              closeDialog={() => toggleVisibleSelectionDialog(false)}
              agree={(entity: AddedEntitiesTypes) => openEntityDialog(entity)}
            />
            {(entityDialogType === "tobacco" && (
              <TobaccoEditDialog
                tobacco={TobaccoStore.tobacco}
                isVisible={isVisibleDialog}
                closeDialog={() => toggleVisibleDialog(false)}
              />
            )) ||
              (entityDialogType === "coal" && (
                <CoalEditDialog
                  coal={CoalStore.coal}
                  isVisible={isVisibleDialog}
                  closeDialog={() => toggleVisibleDialog(false)}
                />
              ))}
          </>
        )}
      </div>
    </>
  );
});
