import { useState } from "react";
import {
  AddSelectionDialog,
  TobaccoEditDialog,
  CoalEditDialog,
  FabricatorEditDialog,
} from "components";
import { AddedEntitiesTypes } from "Types";

interface EntitySelectionAndCreationProps {
  visible: boolean;
  close: () => void;
}

export const EntitySelectionAndCreation = ({
  visible = false,
  close,
}: EntitySelectionAndCreationProps) => {
  const [entityDialogType, setEntityDialogType] =
    useState<AddedEntitiesTypes>();
  const [isVisibleDialog, toggleVisibleDialog] = useState<boolean>(false);

  const openEntityDialog = (entity: AddedEntitiesTypes) => {
    close();
    setEntityDialogType(entity);
    toggleVisibleDialog(true);
  };

  return (
    <>
      <AddSelectionDialog
        isVisible={visible}
        closeDialog={() => close()}
        agree={(entity: AddedEntitiesTypes) => openEntityDialog(entity)}
      />

      {(entityDialogType === "tobacco" && (
        <TobaccoEditDialog
          tobacco={null}
          isVisible={isVisibleDialog}
          closeDialog={() => toggleVisibleDialog(false)}
        />
      )) ||
        (entityDialogType === "coal" && (
          <CoalEditDialog
            coal={null}
            isVisible={isVisibleDialog}
            closeDialog={() => toggleVisibleDialog(false)}
          />
        )) ||
        (entityDialogType === "fabricator" && (
          <FabricatorEditDialog
            fabricator={null}
            isVisible={isVisibleDialog}
            closeDialog={() => toggleVisibleDialog(false)}
          />
        ))}
    </>
  );
};
