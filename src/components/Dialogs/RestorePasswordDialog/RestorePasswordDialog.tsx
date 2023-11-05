import { useState } from "react";
import { RestorePasswordEditor } from "components/Editors";
import { Popup } from "UI";
import { UserApi } from "API";

interface RestorePasswordDialogProps {
  isVisible: boolean;
  closeDialog: () => void;
  agree: (isSuccess: boolean) => void;
}

export const RestorePasswordDialog = ({
  isVisible,
  closeDialog,
  agree,
}: RestorePasswordDialogProps) => {
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const setNewData = async (email: string) => {
    toggleLoading(true);
    const data = await UserApi.sendNewPasswordToEmail(email);
    console.log(data);
    toggleLoading(false);
    data.succrss && agree(data);
  };

  return (
    <Popup
      visible={isVisible}
      showFooter={false}
      close={closeDialog}
      showSpinner={isLoading}
      title="Восстановление пароля"
      width="500px"
    >
      <RestorePasswordEditor onFormSubmit={setNewData} />
    </Popup>
  );
};
