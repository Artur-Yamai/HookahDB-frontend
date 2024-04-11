import {
  InputHTMLAttributes,
  ChangeEvent,
  useId,
  useState,
  useEffect,
} from "react";
import "./CheckBox.scss";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  whenChanged?: (value: { checked: boolean; label: string | number }) => void;
}

export const CheckBox = ({
  whenChanged = () => {},
  label,
  className,
  name,
  checked = false,
}: CheckBoxProps) => {
  const id: string = useId();
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => setIsChecked(checked), [checked]);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement> | undefined
  ): void => {
    const checked: boolean | undefined = e?.target?.checked;
    if (checked !== undefined) {
      setIsChecked(checked);
      whenChanged({ checked, label });
    }
  };

  return (
    <div className={`check-box ${className}`}>
      <input
        type="checkbox"
        checked={isChecked}
        name={name}
        id={id}
        onChange={onInputChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
