import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { RiFilter3Fill } from "react-icons/ri";
import { useMount, useUnmount } from "hooks";
import TobaccoStore from "store/tobacco";
import CoalStore from "store/coal";
import { TobaccosList, CoalList, EntitySelectionAndCreation } from "components";
import { TabPanel } from "UI";
import { Product, ProductListName, SelectOption } from "Types";
import { RoleCodes, rightsCheck } from "helpers";
import "./ForHookah.scss";

export const ForHookah: React.FC = observer(() => {
  const options: SelectOption[] = [
    { value: "tobaccos", label: "Табаки" },
    { value: "coals", label: "Угли" },
  ];
  const [searchParams, setSearchParams] = useSearchParams();

  const [productList, setProductList] = useState<Product[]>([]);

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

  const getData = async (productName: ProductListName): Promise<void> => {
    clearData();

    switch (productName) {
      case "tobaccos":
        await TobaccoStore.getAllTobaccos();
        setProductList(TobaccoStore.tobaccos);
        break;
      case "coals":
        await CoalStore.getAllCoals();
        setProductList(CoalStore.coals);
        break;
    }
  };

  const clearData = (): void => {
    setProductList([]);
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
        >
          <>
            <button
              className="for-hookah__button  for-hookah__button--filter"
              onClick={() => console.log("show filter")}
            >
              <RiFilter3Fill />
            </button>
            {(selectedOption.value === "tobaccos" && (
              <TobaccosList tobaccos={productList} />
            )) ||
              (selectedOption.value === "coals" && (
                <CoalList coals={productList} />
              ))}
            {rightsCheck(RoleCodes.moderator) && (
              <>
                <button
                  className="for-hookah__button for-hookah__button--add"
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
          </>
        </TabPanel>
      </div>
    </>
  );
});
