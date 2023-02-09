import { useState } from "react";
import "./TextArea.scss";

interface ITextArea {
  text: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export function TextArea({
  text,
  label,
  onChange,
  placeholder = "",
  required = true,
}: ITextArea): JSX.Element {
  const [value, changeValue] = useState<string>(text);

  function change(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue: string = e.target.value;
    changeValue(newValue);
    onChange(newValue);
  }

  return (
    <div className="textarea">
      <textarea
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={change}
        name="textarea"
        cols={30}
        rows={10}
      />
      <label className="textarea__label">{label}</label>
    </div>
  );
}
