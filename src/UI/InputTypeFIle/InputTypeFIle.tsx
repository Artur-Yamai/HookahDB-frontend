import { ChangeEvent, useId, forwardRef } from "react";
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

export const InputTypeFIle = forwardRef(
  (
    {
      label = "Выберите файл",
      width = "100%",
      accept,
      multiple = false,
      onChange,
    }: InputTypeFileProps,
    _
  ): JSX.Element => {
    const id = useId();
    const getFiles = (e: ChangeEvent<HTMLInputElement>) => {
      const files: FileList | null = e.currentTarget.files;
      if (files === null) {
        notify("Не удалось загрузить файл(ы)", "warning");
      } else {
        onChange(files);
      }
    };

    return (
      <div className="input-type-file" style={{ width }}>
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
  }
);
