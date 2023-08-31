import { observer } from "mobx-react-lite";
import { Popup, notify } from "UI";
import { Coal, ProductForSave } from "Types";
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
    const setNewData = async (
      newCoal: ProductForSave,
      photoFile?: File
    ): Promise<void> => {
      if (coal?.id) {
        newCoal.id = coal.id;
        const photo = photoFile && (await imgCompressor(photoFile));
        await CoalStore.updateCoal(newCoal, photo);
      } else if (photoFile) {
        const photo = await imgCompressor(photoFile);
        await CoalStore.createCoal(newCoal, photo);
      } else {
        return notify("Заполните все поля", "warning");
      }

      closeDialog();
    };

    return (
      <Popup
        visible={isVisible}
        showFooter={false}
        close={closeDialog}
        title="Уголь"
        height="900px"
        width="650px"
      >
        <ProductEditor product={coal} onFormSubmit={setNewData} />
      </Popup>
    );
  }
);
