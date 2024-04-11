import { useState, useEffect, useId, forwardRef } from "react";
import ReactSelect, { SingleValue } from "react-select";
import { SelectProps } from "./SelectProps";
import "./Select.scss";

export const Select = forwardRef(
  (
    {
      className = "",
      options,
      value,
      label,
      onChange,
      isLoading = false,
      isClearable = false,
      placeholder,
      valueKey = "value",
      labelKey = "label",
      isValid = true,
      isMulti = false,
      closeMenuOnSelect = false,
      ...field
    }: SelectProps,
    _
  ) => {
    const [intermediateValue, setIntermediateValue] =
      useState<SingleValue<any>>(value);

    const id: string = useId();

    const toChange = (newValue: SingleValue<any>) => {
      onChange(newValue);
      setIntermediateValue(newValue);
    };

    useEffect(() => {
      const res = options.find((option) => option[valueKey] === value);
      if (res) setIntermediateValue(res);
    }, [options, valueKey, value]);

    return (
      <div
        className={`select-wrapper ${isValid ? "" : "select-wrapper--invalid"}`}
      >
        <ReactSelect
          inputId={id}
          aria-label={label}
          className={className}
          value={intermediateValue}
          classNamePrefix="custom-select"
          isLoading={isLoading}
          options={options}
          onChange={toChange}
          isClearable={isClearable}
          placeholder={placeholder}
          isMulti={isMulti}
          closeMenuOnSelect={closeMenuOnSelect}
          getOptionValue={(e) => e[valueKey]}
          getOptionLabel={(e) => e[labelKey]}
          {...field}
        />
        {!!label && <label htmlFor={id}>{label}</label>}
      </div>
    );
  }
);
