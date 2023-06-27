import { SingleValue } from "react-select";

export interface SelectProps {
  options: any[];
  value: any;
  onChange: (newValue: SingleValue<any>) => void;
  placeholder?: string;
  isLoading?: boolean;
  isClearable?: boolean;
  valueKey?: string;
  labelKey?: string;
}
