import { forwardRef, useImperativeHandle, useState } from "react";
import { observer } from "mobx-react-lite";
import { Tobacco } from "../../../Types";
import { Popup, notify } from "../../../UI";
import TobaccoStore from "../../../store/tobacco";
import { TobaccoClass } from "../../../Classes";
import { TobaccoEditor } from "../../Editors";

let resolve: (value: boolean) => void;
const sleep = (): Promise<boolean> => new Promise((r) => (resolve = r));

const TobaccoEditDialog = forwardRef((_, ref) => {
  const [isVisible, toggleVisible] = useState<boolean>(false);
  const [tobacco, setTobacco] = useState<TobaccoClass>(new TobaccoClass());
  const [newPhoto, setNewPhoto] = useState<File>();

  const cancel = () => {
    toggleVisible(false);
    resolve(false);
  };

  const setNewTobaccosData = (tobacco: TobaccoClass): void =>
    setTobacco(tobacco);

  const agree = async (): Promise<void> => {
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
  };

  useImperativeHandle(
    ref,
    (): { show: (tobacco: Tobacco | null) => Promise<boolean> } => ({
      async show(tobacco: Tobacco | null): Promise<boolean> {
        const tbcClass = tobacco
          ? new TobaccoClass(tobacco)
          : new TobaccoClass();
        setTobacco(tbcClass);
        toggleVisible(true);

        return await sleep();
      },
    })
  );

  return (
    <Popup
      visible={isVisible}
      close={cancel}
      agree={agree}
      title="Табак"
      height="900px"
      width="650px"
    >
      <TobaccoEditor
        setNewTobaccosData={setNewTobaccosData}
        tobaccoData={tobacco}
        pullNewPhoto={setNewPhoto}
      />
    </Popup>
  );
});

export default observer(TobaccoEditDialog);
