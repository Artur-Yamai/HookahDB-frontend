import { forwardRef, useImperativeHandle, useState } from "react";
import { ITobacco } from "../../../Types";
import { TextBox, InputTypeFIle, Picture, Popup, TextArea } from "../../../UI";
import TobaccoStore from "../../../store/tobacco";

import "./TobaccoEditDialog.scss";
import { TobaccoClass } from "../../../Classes";
import { observer } from "mobx-react-lite";

type FieldName = "name" | "fabricator" | "description";

let resolve: (value: boolean) => void;
const sleep = (): Promise<boolean> => new Promise((r) => (resolve = r));

const TobaccoEditDialog = forwardRef((_, ref) => {
  const [isVisible, toggleVisible] = useState<boolean>(false);
  const [tobacco, setTobacco] = useState<TobaccoClass>();
  const [newPhoto, setNewPhoto] = useState<File>();

  function cancel() {
    toggleVisible(false);
    resolve(false);
  }

  async function agree() {
    if (!tobacco) return;

    if (tobacco._id) {
      await TobaccoStore.updateTobacco(tobacco, newPhoto);
    } else if (newPhoto) {
      await TobaccoStore.createTobacco(tobacco, newPhoto);
    }

    toggleVisible(false);
    if (resolve) resolve(true);
  }

  useImperativeHandle(ref, (): { show: () => Promise<boolean> } => ({
    async show(): Promise<boolean> {
      const tobacco = new TobaccoClass(
        TobaccoStore?.tobacco ?? { name: "", fabricator: "", description: "" }
      );

      setTobacco(tobacco);
      toggleVisible(true);
      return await sleep();
    },
  }));

  function changeValue(newValue: string, field: FieldName) {
    const newTobacco: ITobacco = { ...tobacco } as ITobacco;
    newTobacco[field] = newValue;
    setTobacco(newTobacco);
  }

  function renderFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const img = document.querySelector(".tobacco-editor img");
      const photo = e?.target?.result;
      console.log(e);
      if (!img || !photo || typeof photo !== "string") return;
      img.setAttribute("src", photo);
    };

    reader.readAsDataURL(file);
  }

  function changeFile(files: FileList) {
    const file: File = files[0];
    console.log(file);

    if (!file) return;
    setNewPhoto(file);

    renderFile(file);
  }

  return (
    <Popup
      visible={isVisible}
      close={cancel}
      agree={agree}
      title="Табак"
      height="700px"
    >
      <div className="tobacco-editor">
        <div className="editor-form">
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
            <TextBox
              value={tobacco?.fabricator ?? ""}
              placeholder="Укажите название производителя"
              label="Производитель"
              width="100%"
              onChange={(e) => changeValue(e, "fabricator")}
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
    </Popup>
  );
});

export default observer(TobaccoEditDialog);
