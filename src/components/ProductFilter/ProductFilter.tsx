import { useState, useEffect, useRef } from "react";
import { ProductAtList, Reference } from "Types";
import { Select } from "UI";
import { ReferenceApi } from "API";
import "./ProductFilter.scss";

interface ProductFilterProps {
  prodiuctList: ProductAtList[];
  getFilteredList: (list: ProductAtList[]) => void;
}

type SortValue = "abcASC" | "abcDESC" | "ratingASC" | "ratingDESC";

interface Params {
  value: SortValue;
  label: string;
}

export const ProductFilter = ({
  prodiuctList,
  getFilteredList,
}: ProductFilterProps) => {
  const sortListParams: Params[] = [
    { label: "А-Я", value: "abcASC" },
    { label: "Я-А", value: "abcDESC" },
    { label: "По рейтингу ↓", value: "ratingASC" },
    { label: "По рейтингу ↑", value: "ratingDESC" },
  ];
  const [fabricators, setFabricators] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisibleFilter, toggleVisibleFilter] = useState<boolean>(false);

  const [sortParam, setSortParam] = useState<Params>(sortListParams[0]);
  console.log(sortParam);
  const [selectedFabricators, setSelectedFabricators] = useState<Reference[]>(
    []
  );

  const toSelectFabricators = (newSelectedFabricators: Reference[]): void => {
    const list: Reference[] = newSelectedFabricators.length
      ? newSelectedFabricators
      : fabricators;
    setSelectedFabricators(list);
  };

  useEffect(() => {
    setIsLoading(true);
    ReferenceApi.getReference("fabricator")
      .then((result: Reference[] | null) => {
        if (result && result.length) setFabricators(result);
      })
      .finally(() => setIsLoading(false));
  }, [isVisibleFilter]);

  const timerId = useRef<string | number | NodeJS.Timeout>("");
  useEffect(() => {
    clearTimeout(timerId.current);
    if (!isVisibleFilter) return;

    const res = selectedFabricators.length
      ? prodiuctList.filter((product: ProductAtList) => {
          const index: number = selectedFabricators.findIndex(
            (el) => el.id === product.fabricatorId
          );
          return index > -1;
        })
      : [...prodiuctList];

    switch (sortParam.value) {
      case "abcASC":
        res.sort((a, b) => {
          const aName: string = a.name.toLowerCase();
          const bName: string = b.name.toLowerCase();
          return aName === bName ? 0 : aName < bName ? -1 : 1;
        });
        break;
      case "abcDESC":
        res.sort((a, b) => {
          const aName: string = a.name.toLowerCase();
          const bName: string = b.name.toLowerCase();
          return aName === bName ? 0 : aName > bName ? -1 : 1;
        });
        break;
      case "ratingASC":
        res.sort((a, b) => b.rating - a.rating);
        break;
      case "ratingDESC":
        res.sort((a, b) => a.rating - b.rating);
        break;
    }

    console.log(res);

    timerId.current = setTimeout(() => getFilteredList(res), 1000);

    // eslint-disable-next-line
  }, [selectedFabricators, sortParam]);

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
      <div className="product-filter__controllers-wrapper">
        <div className="product-filter__controller">
          <Select
            label="Сортировка"
            options={sortListParams}
            placeholder="Сортировать по"
            labelKey="label"
            valueKey="value"
            value={sortParam}
            closeMenuOnSelect={true}
            onChange={(e) => setSortParam(e)}
          />
        </div>
        <div className="product-filter__controller">
          <Select
            label="Производители"
            options={fabricators}
            placeholder="Выберите производителей"
            labelKey="value"
            valueKey="id"
            isLoading={isLoading}
            value={null}
            isMulti
            closeMenuOnSelect={false}
            onChange={(e) => toSelectFabricators(e)}
          />
        </div>
      </div>
    </div>
  );
};
