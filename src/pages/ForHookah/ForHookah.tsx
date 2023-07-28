import { useState, useRef } from "react";
import "./ForHookah.scss";
import { observer } from "mobx-react-lite";
import { useMount, useUnmount } from "../../hooks";
import TobaccoStore from "../../store/tobacco";
import CoalStore from "../../store/coal";
import { TobaccosList, CoalList } from "../../components";
import { FilterPanel } from "../../components";
import { ProductListName, SelectOption } from "../../Types";
import { TobaccoEditDialog } from "../../components";
import { RoleCodes, rightsCheck } from "../../helpers";

const ForHookah = (): JSX.Element => {
  const [selectedList, toggleSelectedList] =
    useState<ProductListName>("tobaccos");
  const refTobaccoEditDialog: React.MutableRefObject<
    { show: () => boolean } | undefined
  > = useRef();

  const onChange = (option: SelectOption): void => {
    toggleSelectedList(option.value);
    getData(option.value);
  };

  const add = async (): Promise<void> => {
    if (selectedList === "tobaccos") {
      if (!refTobaccoEditDialog.current) return;

      const res: boolean = await refTobaccoEditDialog.current.show();
      console.log(res);
    }
  };

  useMount(() => {
    getData(selectedList);
  });

  useUnmount(() => {
    clearData();
  });

  const getData = async (selectedList: ProductListName): Promise<void> => {
    clearData();

    switch (selectedList) {
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
    <div className="for-hookah">
      <FilterPanel
        onChangeFilterValue={onChange}
        add={add}
        showAddButton={rightsCheck(RoleCodes.moderator)}
      />
      {selectedList === "tobaccos" && (
        <TobaccosList tobaccoList={TobaccoStore.tobaccos} />
      )}
      {selectedList === "coals" && <CoalList coalList={CoalStore.coals} />}
      <TobaccoEditDialog ref={refTobaccoEditDialog} />
    </div>
  );
};

export default observer(ForHookah);
