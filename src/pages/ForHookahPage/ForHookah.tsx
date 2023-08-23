import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useMount, useUnmount } from "../../hooks";
import TobaccoStore from "../../store/tobacco";
import CoalStore from "../../store/coal";
import { FilterPanel, TobaccosList, CoalList } from "../../components";
import { ProductListName, SelectOption } from "../../Types";
import { TobaccoEditDialog, CoalEditDialog } from "../../components";
import { RoleCodes, rightsCheck } from "../../helpers";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

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

  useMount(() => {
    getData(selectedOption.value);
  });

  useUnmount(() => {
    clearData();
  });

  const getData = async (productName: ProductListName): Promise<void> => {
    clearData();

    switch (productName) {
      case "tobaccos":
        await TobaccoStore.getAllTobaccos();
        break;
      case "coals":
        await CoalStore.getAllCoals();
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
      <div className="w100">
        <FilterPanel
          onChangeFilterValue={onChange}
          options={options}
          value={selectedOption}
          add={() => toggleVisibleDialog(true)}
          showAddButton={rightsCheck(RoleCodes.moderator)}
        />
        {(selectedOption.value === "tobaccos" && (
          <>
            <TobaccoEditDialog
              tobacco={TobaccoStore.tobacco}
              isVisible={isVisibleDialog}
              closeDialog={() => toggleVisibleDialog(false)}
            />
            <TobaccosList tobaccos={TobaccoStore.tobaccos} />
          </>
        )) ||
          (selectedOption.value === "coals" && (
            <>
              <CoalEditDialog
                coal={CoalStore.coal}
                isVisible={isVisibleDialog}
                closeDialog={() => toggleVisibleDialog(false)}
              />
              <CoalList coals={CoalStore.coals} />
            </>
          ))}
      </div>
    </>
  );
});
