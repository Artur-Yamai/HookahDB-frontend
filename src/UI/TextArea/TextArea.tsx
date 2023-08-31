import { useState, useEffect, useId, forwardRef } from "react";
import "./TextArea.scss";

interface TextAreaProps {
  className?: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  cols?: number;
  rows?: number;
  isValid?: boolean;
  onChange: (value: string) => void;
}

export const TextArea = forwardRef(
  (
    {
      className = "",
      value,
      label,
      isValid = true,
      onChange,
      placeholder = "",
      cols = 30,
      rows = 10,
    }: TextAreaProps,
    _
  ) => {
    const [inputValue, changeInputValue] = useState<string>(value);
    const id: string = useId();

    const change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue: string = e.target.value;
      changeInputValue(newValue);
      onChange(newValue);
    };

    useEffect(() => {
      changeInputValue(value);
    }, [value]);

    return (
      <p
        className={`textarea ${
          isValid ? "" : "textarea--invalid"
        }  ${className}`}
      >
        <textarea
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onChange={change}
          name="textarea"
          cols={cols}
          rows={rows}
        />
        {!!label && <label htmlFor={id}>{label}</label>}
      </p>
    );
  }
);
