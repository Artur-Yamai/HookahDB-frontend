import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Popup, notify } from "../../../UI";
import "./CoalEditDialog.scss";
import { Coal } from "../../../Types";
import { CoalClass } from "../../../Classes";
import { CoalStore } from "../../../store";

interface CoalEditDialogProps {
  isVisible: boolean;
  coal: Coal | null;
  closeDialog: () => void;
}

export const CoalEditDialog = observer(
  ({ isVisible, coal, closeDialog }: CoalEditDialogProps) => {
    const [data, setData] = useState<CoalClass | null>(null);
    const [newPhoto, setNewPhoto] = useState<File>();

    useEffect(() => {
      isVisible ? setData(new CoalClass(coal)) : setData(null);
    }, [isVisible, coal]);

    const setNewData = (coal: CoalClass): void => setData(coal);

    const agree = async (): Promise<void> => {
      if (!data) return;

      if (data.id) {
        await CoalStore.updateCoal(data, newPhoto);
      } else if (newPhoto) {
        await CoalStore.createCoal(data, newPhoto);
      } else {
        return notify("Заполните все поля", "warning");
      }

      closeDialog();
    };

    if (!data) return <></>;

    return (
      <Popup
        visible={isVisible}
        close={() => closeDialog()}
        agree={agree}
        title="Уголь"
        height="900px"
        width="650px"
      >
        <div>{coal?.name}</div>
      </Popup>
    );
  }
);
