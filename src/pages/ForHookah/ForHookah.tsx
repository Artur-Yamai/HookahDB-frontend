import { useState, useRef } from "react";
import "./ForHookah.scss";
import { observer } from "mobx-react-lite";
import { useMount, useUnmount } from "../../hooks";
import TobaccoStore from "../../store/tobacco";
import UserStore from "../../store/user";
import { TobaccosList } from "../../components/TobaccoCmponents";
import { FilterPanel } from "../../components";
import { SelectOption } from "../../Types";
import { TobaccoEditDialog } from "../../components";

const ForHookah = (): JSX.Element => {
  const [selectedList, toggleSelectedList] = useState<string>("Tobaccos");
  const refTobaccoEditDialog: React.MutableRefObject<
    { show: () => boolean } | undefined
  > = useRef();

  const onChange = (option: SelectOption) => {
    toggleSelectedList(option.value);
    getData();
  };

  const add = async () => {
    if (selectedList === "Tobaccos") {
      if (!refTobaccoEditDialog.current) return;

      const res: boolean = await refTobaccoEditDialog.current.show();
      console.log(res);
    }
  };

  useMount(() => {
    getData();
  });

  useUnmount(() => {
    clearData();
  });

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
      <FilterPanel
        onChangeFilterValue={onChange}
        add={add}
        showAddButton={!!UserStore?.userData}
      />
      {selectedList === "Tobaccos" && (
        <TobaccosList tobaccoList={TobaccoStore.tobaccos} />
      )}
      <TobaccoEditDialog ref={refTobaccoEditDialog} />
    </div>
  );
};

export default observer(ForHookah);
