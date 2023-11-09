import { useState, useEffect } from "react";
import { ProductAtList, Reference } from "Types";
import { Button, Select, CheckBox } from "UI";
import { ReferenceApi } from "API";
import "./ProductFilter.scss";

interface ProductFilterProps {
  prodiuctList: ProductAtList[];
  getFilteredList: (list: ProductAtList[]) => void;
}

type SortValue = "abcASC" | "abcDESC" | "ratingASC" | "ratingDESC";

type DictionaryOfBoolean = { [key: string]: boolean };

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
  const [selectedFabricators, setSelectedFabricators] = useState<Reference[]>(
    []
  );
  const [ratingList, setRatingList] = useState<DictionaryOfBoolean>({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
    0: false,
  });
  const selectedRating = ({
    checked,
    label,
  }: {
    checked: boolean;
    label: number | string;
  }) => {
    setRatingList({ ...ratingList, [label]: checked });
  };

  const toSelectFabricators = (newList: Reference[]): void => {
    const list: Reference[] = newList.length ? newList : fabricators;
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

  const toFilter = (): void => {
    // фильтр по производителям
    let res = selectedFabricators.length
      ? prodiuctList.filter((product) => {
          const index: number = selectedFabricators.findIndex(
            (el) => el.id === product.fabricatorId
          );
          return index > -1;
        })
      : [...prodiuctList];

    // фильтр по оценкам
    const ratings: number[] = Object.keys(ratingList).reduce(
      (accum: number[], key: string) =>
        ratingList[key] ? [+key, ...accum] : accum,
      []
    );

    if (ratings.length) {
      res = res.filter(
        (product) =>
          ratings.findIndex((r) => r === Math.floor(product.rating)) > -1
      );
    }

    // сортировка
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

    getFilteredList(res);
    toggleVisibleFilter(false);
  };

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
            value={sortListParams[0]}
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

        <div className="product-filter__controller">
          <p className="product-filter__controllers-title">Выбарите оценки</p>
          <div className="product-filter__ratings-checkboxes">
            <CheckBox label="5" whenChanged={selectedRating} />
            <CheckBox label="4" whenChanged={selectedRating} />
            <CheckBox label="3" whenChanged={selectedRating} />
            <CheckBox label="2" whenChanged={selectedRating} />
            <CheckBox label="1" whenChanged={selectedRating} />
            <CheckBox label="0" whenChanged={selectedRating} />
          </div>
        </div>
        <Button
          text="Применить"
          className="product-filter__agree"
          click={() => toFilter()}
        />
      </div>
    </div>
  );
};
