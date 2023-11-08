import { useState, useEffect, useRef } from "react";
import { ProductAtList, Reference } from "Types";
import { Select } from "UI";
import { ReferenceApi } from "API";
import "./ProductFilter.scss";

interface ProductFilterProps {
  prodiuctList: ProductAtList[];
  getFilteredList: (list: ProductAtList[]) => void;
}

export const ProductFilter = ({
  prodiuctList,
  getFilteredList,
}: ProductFilterProps) => {
  const [fabricators, setFabricators] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisibleFilter, toggleVisibleFilter] = useState<boolean>(false);

  const [selectedFabricators, setSelectedFabricators] = useState<Reference[]>(
    []
  );

  useEffect(() => {
    load();
  }, [isVisibleFilter]);

  const load = async () => {
    setIsLoading(true);
    const result: Reference[] | null = await ReferenceApi.getReference(
      "fabricator"
    );

    if (result && result.length) {
      setFabricators(result);
    }
    setIsLoading(false);
  };

  const toSelectFabricators = (newSelectedFabricators: Reference[]): void => {
    const list: Reference[] = newSelectedFabricators.length
      ? newSelectedFabricators
      : fabricators;
    setSelectedFabricators(list);
  };

  let timerId: string | number | NodeJS.Timeout;
  useEffect(() => {
    clearTimeout(timerId);
    const res = prodiuctList.filter((product: Product) => {
      const index: number = selectedFabricators.findIndex(
        (el) => el.id === product.fabricatorId
      );
      return index > -1;
    });

    console.log(res);

    timerId = setTimeout(() => {
      getFilteredList(res);
    }, 1000);
  }, [selectedFabricators]);

  return (
    <div
      className={`product-filter${
        isVisibleFilter ? " product-filter--open" : ""
      }`}
    >
      <button
        className="product-filter__button"
        onClick={() => toggleVisibleFilter(!isVisibleFilter)}
      >
        <span />
      </button>
      <div style={{ padding: "52px 8px 8px 8px" }}>
        <Select
          options={fabricators}
          placeholder="Выберите производителей"
          labelKey="value"
          valueKey="id"
          isLoading={isLoading}
          value={null}
          isMulti
          closeMenuOnSelect={false}
          onChange={(e) => {
            toSelectFabricators(e);
          }}
        />
      </div>
    </div>
  );
};
