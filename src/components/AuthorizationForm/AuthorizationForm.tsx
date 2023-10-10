import { useState } from "react";
import { useForm } from "react-hook-form";
import { notify } from "UI";
import { AuthorizationUserData } from "Types";
import "./AuthorizationForm.scss";
import { RestorePasswordDialog } from "components/Dialogs";
import { UserApi } from "API";
export {};

interface AuthorizationFormProps {
  onSubmit: (userData: AuthorizationUserData) => void;
}

interface FormValues {
  login: string;
  password: string;
}

export const AuthorizationForm = ({
  onSubmit,
}: AuthorizationFormProps): JSX.Element => {
  const [isVisibleDialog, toggleVisibleDialog] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      login: localStorage.login ?? "",
      password: "",
    },
  });

  const formSubmit = handleSubmit(({ login, password }) => {
    onSubmit({ login, password });
  });

  const toForgot = () => toggleVisibleDialog(true);

  const sendEmail = async (email: string) => {
    const data = await UserApi.sendNewPasswordToEmail(email);
    if (data.success) {
      notify("Проверьте почту, был прислан новый пароль", "success");
      toggleVisibleDialog(false);
    }
  };

  return (
    <>
      <form onSubmit={formSubmit} className="af">
        <input
          {...register("login", { required: true })}
          type="text"
          placeholder="Login"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
        <input type="submit" value="Войти" onClick={formSubmit} />
        <input type="button" value="Забыли пароль?" onClick={toForgot} />
      </form>
      <RestorePasswordDialog
        isVisible={isVisibleDialog}
        closeDialog={() => toggleVisibleDialog(false)}
        agree={sendEmail}
      />
    </>
  );
};
