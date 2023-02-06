import { useState } from "react";
import "./Input.scss";

interface IInput {
  type?: "text" | "email" | "password";
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  width?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function Input({
  type = "text",
  value,
  label,
  placeholder = "Заполните поле",
  required = true,
  width = "300px",
  disabled = false,
  onChange,
}: IInput): JSX.Element {
  const id = label + "-" + Math.round(Math.random() * 100000);
  const style = {
    maxWidth: width,
  };
  const [inputValue, setInputValue] = useState<string>(value);

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) onChange(newValue);
  }

  return (
    <div style={style} className="input-container">
      <input
        className="input-container__input"
        value={inputValue}
        onChange={(e) => change(e)}
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      <label className="input-container__label">{label}</label>
    </div>
  );
}
