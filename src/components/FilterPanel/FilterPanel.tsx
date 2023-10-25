import Select from "react-select";
import { SelectOption } from "Types";
import { notify } from "UI";
import "./FilterPanel.scss";

interface FilterPanelProps {
  options: SelectOption[];
  value: SelectOption;
  onChangeFilterValue: (option: SelectOption) => void;
}

export const FilterPanel = ({
  options,
  value,
  onChangeFilterValue,
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
    </div>
  );
};
