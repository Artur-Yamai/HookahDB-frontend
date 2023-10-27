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
  const setNewData = async (email: string) => {
    const data = await UserApi.sendNewPasswordToEmail(email);
    console.log(data);
    agree(data);
  };

  return (
    <Popup
      visible={isVisible}
      showFooter={false}
      close={closeDialog}
      title="Восстановление пароля"
      width="500px"
    >
      <RestorePasswordEditor onFormSubmit={setNewData} />
    </Popup>
  );
};
