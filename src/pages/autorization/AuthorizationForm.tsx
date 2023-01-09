import { useForm } from "react-hook-form";
import { IUserAutorizationData } from "./interfaces";

interface IAuthorizationForm {
  onSubmit: (userData: IUserAutorizationData) => void;
}

interface FormValues {
  login: string;
  password: string;
}

export function AuthorizationForm({
  onSubmit,
}: IAuthorizationForm): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const formSubmit = handleSubmit(({ login, password }) => {});

  return (
    <form onSubmit={formSubmit}>
      <input type="text" placeholder="Login" />
      <input type="password" placeholder="Password" />
      <input type="submit" value="Войти" onClick={formSubmit} />
      <button className="authorization__forget-password">Забыли пароль?</button>
    </form>
  );
}
