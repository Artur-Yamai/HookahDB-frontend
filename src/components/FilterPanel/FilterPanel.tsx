import { useState } from "react";
import Select from "react-select";
import { SelectOption } from "../../Types";
import { Button, notify } from "../../UI";
import "./FilterPanel.scss";

interface FilterPanelProps {
  showAddButton: boolean;
  onChangeFilterValue: (option: SelectOption) => void;
  add: () => void;
}

const options: SelectOption[] = [
  { value: "tobaccos", label: "Табаки" },
  { value: "coals", label: "Угли" },
];

export const FilterPanel = ({
  showAddButton,
  onChangeFilterValue,
  add,
}: FilterPanelProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    options[0]
  );

  const changeSelectValeue = (option: SelectOption | null) => {
    if (option) {
      setSelectedOption(option);
      onChangeFilterValue(option);
    } else {
      notify("Ошибка", "error");
    }
  };

  return (
    <div className="filter-panel">
      <Select
        className="filter-panel__select"
        value={selectedOption}
        onChange={changeSelectValeue}
        options={options}
      />
      {showAddButton && (
        <Button
          className="filter-panel__add-button"
          click={add}
          text="Добавить"
        />
      )}
    </div>
  );
};
