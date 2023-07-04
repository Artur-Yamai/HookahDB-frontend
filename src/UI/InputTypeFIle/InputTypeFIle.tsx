import { ChangeEvent } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { notify } from "../../UI";
import "./InputTypeFIle.scss";

interface InputTypeFileProps {
  label?: string;
  width?: string;
  multiple?: boolean;
  accept?: string[]; // Прописать допустимые файлы
  onChange: (files: FileList) => void;
}

export const InputTypeFIle = ({
  label = "Выберите файл",
  width,
  accept,
  multiple = false,
  onChange,
}: InputTypeFileProps): JSX.Element => {
  const getFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.currentTarget.files;
    if (files === null) {
      notify("Не удалось загрузить файл(ы)", "warning");
    } else {
      onChange(files);
    }
  };

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
        <span className="input-type-file__icon">
          <AiOutlineUpload />
        </span>
      </label>
    </div>
  );
};
