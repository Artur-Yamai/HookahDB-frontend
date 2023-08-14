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

export const ForHookah: React.FC = observer(() => {
  const [isVisibleDialog, toggleVisibleDialog] = useState<boolean>(false);
  const [productName, setProductName] = useState<ProductListName>("tobaccos");

  const onChange = (option: SelectOption): void => {
    setProductName(option.value);
    getData(option.value);
  };

  useMount(() => {
    getData(productName);
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
          add={() => toggleVisibleDialog(true)}
          showAddButton={rightsCheck(RoleCodes.moderator)}
        />
        {(productName === "tobaccos" && (
          <>
            <TobaccoEditDialog
              tobacco={TobaccoStore.tobacco}
              isVisible={isVisibleDialog}
              closeDialog={() => toggleVisibleDialog(false)}
            />
            <TobaccosList tobaccos={TobaccoStore.tobaccos} />
          </>
        )) ||
          (productName === "coals" && (
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
