import { useState } from "react";
import { ReferenceApi } from "../../../API";
import { IReference } from "../../../Types";
import { TobaccoEditorProps } from "./TobaccoEditorProps";
import { TextBox, InputTypeFIle, Picture, TextArea, Select } from "../../../UI";
import { useMount } from "../../../hooks";
import { TobaccoClass } from "../../../Classes";
import "./TobaccoEditor.scss";

type FieldName = "name" | "description";

export const TobaccoEditor = ({
  tobaccoData,
  pullNewPhoto,
  setNewTobaccosData,
}: TobaccoEditorProps) => {
  const [tobacco, setTobacco] = useState<TobaccoClass>(tobaccoData);
  const [loading, toggleLoading] = useState<boolean>(false);
  const [fabricators, setFabricators] = useState<IReference[]>([]);

  useMount(async () => {
    toggleLoading(true);
    const result: IReference[] | null = await ReferenceApi.getReference(
      "fabricator"
    );
    toggleLoading(false);
    if (result) {
      setFabricators(result);
    }
  });

  const changeValue = (newValue: string, field: FieldName): void => {
    const newTobacco: TobaccoClass = { ...tobacco } as TobaccoClass;
    newTobacco[field] = newValue;
    setTobacco(newTobacco);
    setNewTobaccosData(newTobacco);
  };

  const changeSelectValue = (newValue: IReference) => {
    const newTobacco = { ...tobacco } as TobaccoClass;
    newTobacco.fabricatorId = newValue?.id ?? "";
    setTobacco(newTobacco);
    setNewTobaccosData(newTobacco);
  };

  const renderFile = (file: File) => {
    const reader: FileReader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const img = document.querySelector(".tobacco-editor img");
      const photo = e?.target?.result;
      if (!img || !photo || typeof photo !== "string") return;
      img.setAttribute("src", photo);
    };

    reader.readAsDataURL(file);
  };

  const changeFile = (files: FileList) => {
    const file: File = files[0];

    if (!file) return;
    pullNewPhoto(file);

    renderFile(file);
  };

  return (
    <div className="tobacco-editor">
      <div className="editor-form">
        <div className="editor-form__field">
          <Select
            options={fabricators}
            value={tobacco?.fabricatorId}
            isLoading={loading}
            onChange={changeSelectValue}
            isClearable={true}
            placeholder="Выберите производителя"
            valueKey="id"
            labelKey="value"
          />
        </div>
        <div className="editor-form__field">
          <TextBox
            value={tobacco?.name ?? ""}
            placeholder="Укажите название табака"
            label="Название"
            width="100%"
            onChange={(e) => changeValue(e, "name")}
          />
        </div>
        <div className="editor-form__field">
          <TextArea
            label="Описание табака"
            placeholder="Опишите табак"
            text={tobacco?.description ?? ""}
            onChange={(e) => changeValue(e, "description")}
          />
        </div>
        <div
          className="editor-form__field tobacco-editor__photo"
          style={{ width: "300px" }}
        >
          <Picture url={tobacco?.photoUrl} />
          <InputTypeFIle onChange={changeFile} label="Сменить изображение" />
        </div>
      </div>
    </div>
  );
};
