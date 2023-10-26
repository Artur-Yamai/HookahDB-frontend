import { Popup, Button } from "UI";
import { AddedEntitiesTypes } from "Types";
import "./AddSelectionDialog.scss";

interface SelectionDialogProps {
  isVisible: boolean;
  closeDialog: () => void;
  agree: (dialogType: AddedEntitiesTypes) => void;
}

interface EntityDescType {
  entityName: AddedEntitiesTypes;
  label: string;
}

export const AddSelectionDialog = ({
  isVisible,
  closeDialog,
  agree,
}: SelectionDialogProps) => {
  const listOfAddedProducts: EntityDescType[] = [
    { entityName: "tobacco", label: "Табак" },
    { entityName: "coal", label: "Уголь" },
    { entityName: "fabricator", label: "Производитель" },
  ];

  return (
    <Popup
      visible={isVisible}
      showFooter={false}
      close={closeDialog}
      title="Добавить"
      width="350px"
    >
      <div className="add-selection-dialog">
        {listOfAddedProducts.map((elem: EntityDescType, i: number) => (
          <Button
            className="add-selection-dialog__button"
            key={i}
            click={() => agree(elem.entityName)}
            text={elem.label}
          />
        ))}
      </div>
    </Popup>
  );
};
