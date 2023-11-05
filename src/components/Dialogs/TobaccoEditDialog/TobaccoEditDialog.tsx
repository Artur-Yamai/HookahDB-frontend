import { useState } from "react";
import { observer } from "mobx-react-lite";
import { ProductForSave, Product } from "Types";
import { Popup, notify } from "UI";
import { ProductEditor } from "components/Editors";
import TobaccoStore from "store/tobacco";
import { imgCompressor } from "helpers";

interface TobaccoEditDialogProps {
  isVisible: boolean;
  tobacco: Product | null;
  closeDialog: () => void;
}

export const TobaccoEditDialog = observer(
  ({ isVisible, tobacco, closeDialog }: TobaccoEditDialogProps) => {
    const [isLoading, toggleLoading] = useState<boolean>(false);
    const setNewData = async (
      newTobacco: ProductForSave,
      photoFile?: File
    ): Promise<void> => {
      toggleLoading(true);
      let result: boolean = false;
      if (tobacco?.id) {
        newTobacco.id = tobacco.id;
        const photo = photoFile && (await imgCompressor(photoFile));
        result = await TobaccoStore.updateTobacco(newTobacco, photo);
      } else if (photoFile) {
        const photo = await imgCompressor(photoFile);
        result = await TobaccoStore.createTobacco(newTobacco, photo);
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
        title="Табак"
        height="900px"
        width="650px"
      >
        <ProductEditor product={tobacco} onFormSubmit={setNewData} />
      </Popup>
    );
  }
);
