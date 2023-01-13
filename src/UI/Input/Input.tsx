import "./Input.scss";

interface IInput {
  type?: "text" | "email" | "password";
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  width?: string;
  disabled?: boolean;
}

export function Input({
  type = "text",
  value,
  label,
  placeholder = "Заполните поле",
  required = true,
  width = "300px",
  disabled = false,
}: IInput): JSX.Element {
  const id = label + "-" + Math.round(Math.random() * 100000);
  const style = {
    maxWidth: width,
  };

  return (
    <div style={style} className="input-container">
      <input
        className="input-container__input"
        value={value}
        onChange={() => {}}
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
