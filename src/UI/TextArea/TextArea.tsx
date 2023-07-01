import { useState, useEffect, useId } from "react";
import "./TextArea.scss";

interface ITextArea {
  className?: string;
  text: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  cols?: number;
  rows?: number;
  onChange: (value: string) => void;
}

export const TextArea = ({
  className = "",
  text,
  label,
  onChange,
  placeholder = "",
  required = true,
  cols = 30,
  rows = 10,
}: ITextArea) => {
  const [value, changeValue] = useState<string>(text);
  const id: string = useId();

  const change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue: string = e.target.value;
    changeValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    changeValue(text);
  }, [text]);

  return (
    <p className={`textarea ${className}`}>
      <textarea
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={change}
        name="textarea"
        cols={cols}
        rows={rows}
      />
      <label htmlFor={id} className="textarea__label">
        {label}
      </label>
    </p>
  );
};
