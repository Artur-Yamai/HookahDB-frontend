import { useState } from "react";
import Select from "react-select";
import { ISelectOption } from "../../Types";
import { Button, notify } from "../../UI";
import "./FilterPanel.scss";

interface IFilterPanel {
  onChangeFilterValue: (option: ISelectOption) => void;
  add: () => void;
}

const options: ISelectOption[] = [
  { value: "Tobaccos", label: "Табаки" },
  { value: "Other", label: "Другое" },
];

export function FilterPanel({
  onChangeFilterValue,
  add,
}: IFilterPanel): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(
    options[0]
  );

  function changeSelectValeue(option: ISelectOption | null) {
    if (option) {
      setSelectedOption(option);
      onChangeFilterValue(option);
    } else {
      notify("Ошибка", "error");
    }
  }

  return (
    <div className="filter-panel">
      <Select
        className="filter-panel__select"
        value={selectedOption}
        onChange={changeSelectValeue}
        options={options}
      />
      <Button
        className="filter-panel__add-button"
        click={add}
        text="Добавить"
      />
    </div>
  );
}
