import { ControllerRenderProps } from "react-hook-form";
import { SingleValue } from "react-select";

export interface SelectProps {
  className?: string;
  options: any[];
  value: any;
  label?: string;
  isValid?: boolean;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
  onChange: (newValue: SingleValue<any>) => void;
  placeholder?: string;
  isLoading?: boolean;
  isClearable?: boolean;
  valueKey?: string;
  labelKey?: string;
  field?: ControllerRenderProps<any, string>;
}
