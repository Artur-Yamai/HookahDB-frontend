import { Reference, NewReference } from "Types";
import { Popup } from "UI";
import { FabricatorEditor } from "components";
import { ReferenceApi } from "API";

interface FabricatorEditDialogProps {
  isVisible: boolean;
  fabricator: Reference | null;
  closeDialog: () => void;
}

export const FabricatorEditDialog = ({
  isVisible,
  fabricator,
  closeDialog,
}: FabricatorEditDialogProps) => {
  const setNewData = async (NewReference: NewReference): Promise<void> => {
    const res: boolean = await ReferenceApi.saveReferenceValue(
      "fabricator",
      NewReference
    );

    res && closeDialog();
  };

  return (
    <Popup
      visible={isVisible}
      showFooter={false}
      close={closeDialog}
      title="Производитель"
      width="550px"
    >
      <FabricatorEditor fabricator={fabricator} onFormSubmit={setNewData} />
    </Popup>
  );
};
