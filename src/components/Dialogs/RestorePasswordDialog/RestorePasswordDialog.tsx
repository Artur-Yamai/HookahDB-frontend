import { Popup, TextBox } from "UI";
import "./RestorePasswordDialog.scss";
import { useState } from "react";

interface RestorePasswordDialogProps {
  isVisible: boolean;
  closeDialog: () => void;
  agree: (email: string) => void;
}

export const RestorePasswordDialog = ({
  isVisible,
  closeDialog,
  agree,
}: RestorePasswordDialogProps) => {
  const [email, setEmail] = useState<string>("");
  const [isDisabledAgreeButton, toggleIsDisabledAgreeButton] =
    useState<boolean>(true);

  const onChangeInputValue = (e: string) => {
    setEmail(e);
    const isValid: boolean = !(
      e.length > 6 &&
      e.includes("@") &&
      e.includes(".")
    );
    toggleIsDisabledAgreeButton(isValid);
  };

  return (
    <Popup
      visible={isVisible}
      showFooter={true}
      close={closeDialog}
      isDisabledAgreeButton={isDisabledAgreeButton}
      title="Восстановление пароля"
      height="190px"
      width="450px"
      submitButtonLabel="Отправить новый пароль"
      agree={() => agree(email)}
    >
      <form className="restorePasswordDialog">
        <TextBox
          value={email}
          name="email"
          label="Email"
          type="email"
          onChange={onChangeInputValue}
        />
      </form>
    </Popup>
  );
};
