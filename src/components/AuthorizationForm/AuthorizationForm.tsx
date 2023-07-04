import { useForm } from "react-hook-form";
import { AuthorizationUserData } from "../../Types";
import "./AuthorizationForm.scss";
import { notify } from "../../UI";

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

  const toForgot = () => {
    notify("Возможность восстановить пароль еще не работает", "warning", 4000);
  };

  return (
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
  );
};
