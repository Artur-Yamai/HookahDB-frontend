import { useForm } from "react-hook-form";
import { AuthorizationUserData } from "Types";
import "./AuthorizationForm.scss";

interface AuthorizationFormProps {
  onSubmit: (userData: AuthorizationUserData) => void;
  showForgotDialog: () => void;
}

interface FormValues {
  login: string;
  password: string;
}

export const AuthorizationForm = ({
  onSubmit,
  showForgotDialog,
}: AuthorizationFormProps): JSX.Element => {
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

  return (
    <>
      <form onSubmit={formSubmit} className="af">
        <input
          {...register("login", { required: true })}
          type="text"
          placeholder="Логин"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Пароль"
        />
        <input type="submit" value="Войти" onClick={formSubmit} />
        <input
          type="button"
          value="Забыли пароль?"
          onClick={showForgotDialog}
        />
      </form>
    </>
  );
};
