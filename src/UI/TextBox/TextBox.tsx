import { useId, useState } from "react";
import "./TextBox.scss";

interface TextBoxProps {
  className?: string;
  type?: "text" | "email" | "password";
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  width?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const TextBox = ({
  className = "",
  type = "text",
  name,
  value,
  label,
  placeholder = "Заполните поле",
  required = false,
  width = "100%",
  disabled = false,
  onChange,
}: TextBoxProps) => {
  const style = { maxWidth: width };
  const id: string = useId();

  const [inputValue, setInputValue] = useState<string>(value);

  const change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <p style={style} className={`input-container ${className}`}>
      <input
        id={id}
        name={name}
        className="input-container__input"
        value={inputValue}
        onChange={change}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      <label htmlFor={id} className="input-container__label">
        {label}
      </label>
    </p>
  );
};
