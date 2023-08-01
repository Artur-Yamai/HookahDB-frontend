import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tobacco } from "../../../Types";
import { Popup } from "../../../UI";
import { TobaccoEditor } from "../../Editors";
import { TobaccoClass } from "../../../Classes";

interface TobaccoEditDialogProps {
  isVisible: boolean;
  tobacco: Tobacco | null;
  closeDislog: () => void;
  saveData: (tobacco: TobaccoClass, file?: File) => void;
}

export const TobaccoEditDialog = observer(
  ({ isVisible, tobacco, closeDislog, saveData }: TobaccoEditDialogProps) => {
    const [data, setData] = useState<TobaccoClass | null>(null);
    const [newPhoto, setNewPhoto] = useState<File>();

    useEffect(() => {
      isVisible ? setData(new TobaccoClass(tobacco)) : setData(null);
    }, [isVisible]);

    const setNewData = (tobacco: TobaccoClass): void => setData(tobacco);

    const agree = async (): Promise<void> => {
      if (!data) return;

      saveData(data, newPhoto);
    };

    if (!data) return <></>;

    return (
      <Popup
        visible={isVisible}
        close={() => closeDislog()}
        agree={agree}
        title="Табак"
        height="900px"
        width="650px"
      >
        <TobaccoEditor
          setNewData={setNewData}
          productData={data}
          pullNewPhoto={setNewPhoto}
        />
      </Popup>
    );
  }
);
