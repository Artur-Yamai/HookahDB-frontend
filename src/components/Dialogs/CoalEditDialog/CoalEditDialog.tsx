import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Popup, notify } from "UI";
import { Product, ProductForSave } from "Types";
import { CoalStore } from "store";
import { ProductEditor } from "components/Editors";
import { imgCompressor } from "helpers";

interface CoalEditDialogProps {
  isVisible: boolean;
  coal: Product | null;
  closeDialog: () => void;
}

export const CoalEditDialog = observer(
  ({ isVisible, coal, closeDialog }: CoalEditDialogProps) => {
    const [isLoading, toggleLoading] = useState<boolean>(false);
    const setNewData = async (
      newCoal: ProductForSave,
      photoFile?: File
    ): Promise<void> => {
      toggleLoading(true);
      let result: boolean = false;
      if (coal?.id) {
        newCoal.id = coal.id;
        const photo = photoFile && (await imgCompressor(photoFile));
        result = await CoalStore.updateCoal(newCoal, photo);
      } else if (photoFile) {
        const photo = await imgCompressor(photoFile);
        result = await CoalStore.createCoal(newCoal, photo);
      } else {
        notify("Заполните все поля", "warning");
      }

      toggleLoading(false);

      if (result) closeDialog();
    };

    return (
      <Popup
        visible={isVisible}
        showFooter={false}
        close={closeDialog}
        showSpinner={isLoading}
        title="Уголь"
        height="900px"
        width="650px"
      >
        <ProductEditor product={coal} onFormSubmit={setNewData} />
      </Popup>
    );
  }
);
