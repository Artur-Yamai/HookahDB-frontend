import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Popup, notify } from "UI";
import { Coal } from "Types";
import { CoalClass } from "Classes";
import { CoalStore } from "store";
import { ProductEditor } from "components/Editors";
import { imgCompressor } from "helpers";

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
        const photo = newPhoto && (await imgCompressor(newPhoto));
        await CoalStore.updateCoal(data, photo);
      } else if (newPhoto) {
        const photo = await imgCompressor(newPhoto);
        await CoalStore.createCoal(data, photo);
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
        title="Уголь"
        height="900px"
        width="650px"
      >
        <ProductEditor
          setNewData={setNewData}
          productData={data}
          pullNewPhoto={setNewPhoto}
        />
      </Popup>
    );
  }
);
