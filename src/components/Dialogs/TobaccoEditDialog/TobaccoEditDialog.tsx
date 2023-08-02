import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tobacco } from "../../../Types";
import { Popup, notify } from "../../../UI";
import { TobaccoEditor } from "../../Editors";
import { TobaccoClass } from "../../../Classes";
import TobaccoStore from "../../../store/tobacco";

interface TobaccoEditDialogProps {
  isVisible: boolean;
  tobacco: Tobacco | null;
  closeDialog: () => void;
}

export const TobaccoEditDialog = observer(
  ({ isVisible, tobacco, closeDialog }: TobaccoEditDialogProps) => {
    const [data, setData] = useState<TobaccoClass | null>(null);
    const [newPhoto, setNewPhoto] = useState<File>();

    useEffect(() => {
      isVisible ? setData(new TobaccoClass(tobacco)) : setData(null);
    }, [isVisible, tobacco]);

    const setNewData = (tobacco: TobaccoClass): void => setData(tobacco);

    const agree = async (): Promise<void> => {
      if (!data) return;

      if (data.id) {
        await TobaccoStore.updateTobacco(data, newPhoto);
      } else if (newPhoto) {
        await TobaccoStore.createTobacco(data, newPhoto);
      } else {
        return notify("Заполните все поля", "warning");
      }

      closeDialog();
    };

    if (!data) return <></>;

    return (
      <Popup
        visible={isVisible}
        close={closeDialog}
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
