import { forwardRef, useImperativeHandle, useState } from "react";
import { observer } from "mobx-react-lite";
import { IReference, ITobacco } from "../../../Types";
import { ReferenceApi } from "../../../API";
import {
  TextBox,
  InputTypeFIle,
  Picture,
  Popup,
  TextArea,
  Select,
  notify,
} from "../../../UI";
import TobaccoStore from "../../../store/tobacco";
import "./TobaccoEditDialog.scss";
import { TobaccoClass } from "../../../Classes";

type FieldName = "name" | "fabricator" | "description";

let resolve: (value: boolean) => void;
const sleep = (): Promise<boolean> => new Promise((r) => (resolve = r));

const TobaccoEditDialog = forwardRef((_, ref) => {
  const [isVisible, toggleVisible] = useState<boolean>(false);
  const [tobacco, setTobacco] = useState<TobaccoClass>();
  const [newPhoto, setNewPhoto] = useState<File>();
  const [fabricators, setFabricators] = useState<IReference[]>([]);
  const [loading, toggleLoading] = useState<boolean>(false);

  function cancel() {
    toggleVisible(false);
    resolve(false);
  }

  async function agree(): Promise<void> {
    console.log(tobacco);
    if (!tobacco) return;

    if (tobacco.id) {
      await TobaccoStore.updateTobacco(tobacco, newPhoto);
    } else if (newPhoto) {
      await TobaccoStore.createTobacco(tobacco, newPhoto);
    } else {
      return notify("Заполните все поля", "warning");
    }

    toggleVisible(false);
    resolve(true);
  }

  useImperativeHandle(
    ref,
    (): { show: (tobacco: ITobacco | null) => Promise<boolean> } => ({
      async show(tobacco: ITobacco | null): Promise<boolean> {
        setTobacco(new TobaccoClass(tobacco));
        toggleVisible(true);

        toggleLoading(true);
        const result: IReference[] | null = await ReferenceApi.getReference(
          "fabricator"
        );
        toggleLoading(false);
        if (result) {
          setFabricators(result);
        }

        return await sleep();
      },
    })
  );

  const changeValue = (newValue: string, field: FieldName): void => {
    const newTobacco: ITobacco = { ...tobacco } as ITobacco;
    newTobacco[field] = newValue;
    setTobacco(newTobacco);
  };

  const changeSelectValue = (newValue: IReference) => {
    const newTobacco = { ...tobacco } as ITobacco;
    newTobacco.fabricator = newValue?.id ?? "";
    setTobacco(newTobacco);
  };

  function renderFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const img = document.querySelector(".tobacco-editor img");
      const photo = e?.target?.result;
      if (!img || !photo || typeof photo !== "string") return;
      img.setAttribute("src", photo);
    };

    reader.readAsDataURL(file);
  }

  function changeFile(files: FileList) {
    const file: File = files[0];

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
            <Select
              isLoading={loading}
              options={fabricators}
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
    </Popup>
  );
});

export default observer(TobaccoEditDialog);
