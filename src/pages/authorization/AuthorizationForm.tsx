import { useForm } from "react-hook-form";
import { IUserAuthorizationData } from "./interfaces";
import "./AuthorizationForm.scss";

interface IAuthorizationForm {
  onSubmit: (userData: IUserAuthorizationData) => void;
}

interface FormValues {
  login: string;
  password: string;
}

export function AuthorizationForm({
  onSubmit,
}: IAuthorizationForm): JSX.Element {
  const { register, handleSubmit, resetField } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const formSubmit = handleSubmit(({ login, password }) => {
    onSubmit({ login, password });
  });

  const toForgot = () => {
    console.log("toForgot");
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
}
