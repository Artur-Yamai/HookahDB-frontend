import { useState, useEffect } from "react";
import Select from "react-select";
import { ISelectOption } from "../../Types";
import { notify } from "../../UI";
import "./FilterPanel.scss";

interface IFilterPanel {
  onChange: (option: ISelectOption) => void;
}

const options: ISelectOption[] = [
  {
    value: "Tobacco",
    label: "Табаки",
  },
  { value: "Другое", label: "other" },
];

export function FilterPanel({ onChange }: IFilterPanel): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(
    options[0]
  );

  function changeSelectValeue(option: ISelectOption | null) {
    if (option) {
      setSelectedOption(option);
      onChange(option);
    } else {
      notify("Ошибка", "error");
    }
  }

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  return (
    <div className="filter-panel">
      <Select
        value={selectedOption}
        onChange={changeSelectValeue}
        options={options}
      />
    </div>
  );
}
