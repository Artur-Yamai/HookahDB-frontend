import { Reference } from "Types";
import { Popup } from "UI";
import { FabricatorEditor } from "components";
import { ReferenceApi } from "API";

interface FabricatorEditDialogProps {
  isVisible: boolean;
  fabricator: Reference | null;
  closeDialog: () => void;
}

interface NewFabricator extends Pick<Reference, "value"> {}

export const FabricatorEditDialog = ({
  isVisible,
  fabricator,
  closeDialog,
}: FabricatorEditDialogProps) => {
  const setNewData = async (newFabricator: NewFabricator): Promise<void> => {
    const res = await ReferenceApi.saveReferenceValue(
      "fabricator",
      newFabricator
    );
    console.log(res);
    closeDialog();
  };

  return (
    <Popup
      visible={isVisible}
      showFooter={false}
      close={closeDialog}
      title="Производитель"
      width="650px"
    >
      <FabricatorEditor fabricator={fabricator} onFormSubmit={setNewData} />
    </Popup>
  );
};
