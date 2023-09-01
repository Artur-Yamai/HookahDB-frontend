import { useId, useState, forwardRef } from "react";
import "./TextBox.scss";

interface TextBoxProps {
  className?: string;
  type?: "text" | "email" | "password";
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  isValid?: boolean;
  onChange?: (value: string) => void;
}

export const TextBox = forwardRef(
  (
    {
      className = "",
      type = "text",
      name,
      value,
      label,
      placeholder = "Заполните поле",
      width = "100%",
      disabled = false,
      isValid = true,
      onChange,
    }: TextBoxProps,
    _
  ) => {
    const style = { maxWidth: width };
    const id: string = useId();

    const [inputValue, setInputValue] = useState<string>(value);

    const change = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (onChange) onChange(newValue);
    };

    return (
      <p
        style={style}
        className={`input-container ${
          isValid ? "" : "input-container--invalid"
        } ${className}`}
      >
        <input
          id={id}
          name={name}
          value={inputValue}
          onChange={change}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
        />
        {!!label && <label htmlFor={id}>{label}</label>}
      </p>
    );
  }
);
