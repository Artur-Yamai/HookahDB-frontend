import { ChangeEvent } from "react";
import { notify } from "../Functions";
import "./InputTypeFIle.scss";

interface IInputTypeFIle {
  label?: string;
  width?: string;
  multiple?: boolean;
  accept?: string[]; // Прописать допустимые файлы
  onChange: (files: FileList) => void;
}

export function InputTypeFIle({
  label = "Выберите файл",
  width,
  accept,
  multiple = false,
  onChange,
}: IInputTypeFIle): JSX.Element {
  function getFiles(e: ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = e.currentTarget.files;
    if (files === null) {
      notify("Не удалось загрузить фотографию", "warning");
    } else {
      onChange(files);
    }
  }

  const style = {
    width,
  };

  const id = label + Math.floor(Math.random() * 1000);

  return (
    <div className="input-type-file" style={style}>
      <input
        className="input-type-file__input"
        type="file"
        id={id}
        accept={accept?.join(", ")}
        multiple={multiple}
        onChange={getFiles}
      />
      <label className="input-type-file__label" htmlFor={id}>
        <span className="input-type-file__text">{label}</span>
      </label>
    </div>
  );
}
