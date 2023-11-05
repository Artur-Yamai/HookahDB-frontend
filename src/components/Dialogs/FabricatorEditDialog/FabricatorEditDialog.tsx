import { useState } from "react";
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
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const setNewData = async (NewReference: NewReference): Promise<void> => {
    toggleLoading(true);
    const res: boolean = await ReferenceApi.saveReferenceValue(
      "fabricator",
      NewReference
    );

    toggleLoading(false);

    res && closeDialog();
  };

  return (
    <Popup
      visible={isVisible}
      showFooter={false}
      close={closeDialog}
      showSpinner={isLoading}
      title="Производитель"
      width="550px"
    >
      <FabricatorEditor fabricator={fabricator} onFormSubmit={setNewData} />
    </Popup>
  );
};
