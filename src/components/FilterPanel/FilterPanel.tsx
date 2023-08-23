import Select from "react-select";
import { SelectOption } from "../../Types";
import { Button, notify } from "../../UI";
import "./FilterPanel.scss";

interface FilterPanelProps {
  showAddButton: boolean;
  options: SelectOption[];
  value: SelectOption;
  onChangeFilterValue: (option: SelectOption) => void;
  add: () => void;
}

export const FilterPanel = ({
  showAddButton,
  options,
  value,
  onChangeFilterValue,
  add,
}: FilterPanelProps): JSX.Element => {
  const changeSelectValeue = (option: SelectOption | null) => {
    if (option) {
      onChangeFilterValue(option);
    } else {
      notify("Ошибка", "error");
    }
  };

  return (
    <div className="filter-panel">
      <Select
        className="filter-panel__select"
        value={value}
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
