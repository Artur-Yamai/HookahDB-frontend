import ReactSelect, { SingleValue } from "react-select";
import { SelectProps } from "./SelectProps";
import "./Select.scss";

export const Select = ({
  options,
  onChange,
  isLoading = false,
  isClearable = false,
  placeholder,
  valueKey = "value",
  labelKey = "label",
}: SelectProps) => {
  const toChange = (newValue: SingleValue<any>) => {
    onChange(newValue);
  };

  return (
    <ReactSelect
      classNamePrefix="custom-select"
      isLoading={isLoading}
      options={options}
      onChange={toChange}
      isClearable={isClearable}
      placeholder={placeholder}
      getOptionValue={(e) => e[valueKey]}
      getOptionLabel={(e) => e[labelKey]}
    />
  );
};
