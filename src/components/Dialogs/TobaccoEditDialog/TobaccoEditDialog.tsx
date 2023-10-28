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
    const setNewData = async (
      newTobacco: ProductForSave,
      photoFile?: File
    ): Promise<void> => {
      if (tobacco?.id) {
        newTobacco.id = tobacco.id;
        const photo = photoFile && (await imgCompressor(photoFile));
        await TobaccoStore.updateTobacco(newTobacco, photo);
      } else if (photoFile) {
        const photo = await imgCompressor(photoFile);
        await TobaccoStore.createTobacco(newTobacco, photo);
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
        title="Табак"
        height="900px"
        width="650px"
      >
        <ProductEditor product={tobacco} onFormSubmit={setNewData} />
      </Popup>
    );
  }
);
