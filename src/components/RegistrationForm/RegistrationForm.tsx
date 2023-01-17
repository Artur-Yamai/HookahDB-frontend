import { useForm } from "react-hook-form";
import { IUser } from "../../Types";
import "./RegistrationForm.scss";

interface IRegistrationForm {
  onSubmit: (userData: IUser.RegistrationData) => Promise<boolean>;
}

interface FormValues {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegistrationForm({ onSubmit }: IRegistrationForm): JSX.Element {
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
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formSubmit = handleSubmit(async ({ login, email, password }) => {
    const userData: IUser.RegistrationData = { login, email, password };
    const res: boolean = await onSubmit(userData);
    if (res) {
      resetField("login");
      resetField("email");
      resetField("password");
      resetField("confirmPassword");
    }
  });

  return (
    <form onSubmit={formSubmit} className="rf">
      <p
        className={`rf__input-wrapper ${
          errors?.login ? "rf__input-wrapper--error" : ""
        }`}
      >
        <input
          {...register("login", {
            required: "Обязательное поле",
            minLength: {
              value: 4,
              message: "Минимум 4 символа",
            },
            maxLength: {
              value: 30,
              message: "Максимум 30 символов",
            },
          })}
          type="text"
          placeholder="Login"
        />
        {errors?.login && (
          <span className="rf__error-text">{errors.login.message}</span>
        )}
      </p>

      <p
        className={`rf__input-wrapper ${
          errors?.email ? "rf__input-wrapper--error" : ""
        }`}
      >
        <input
          {...register("email", {
            required: "Поле Email обязательно для заполнения",
          })}
          type="email"
          placeholder="Email address"
        />
        {errors?.email && (
          <span className="rf__error-text">{errors.email.message}</span>
        )}
      </p>

      <p
        className={`rf__input-wrapper ${
          errors?.password ? "rf__input-wrapper--error" : ""
        }`}
      >
        <input
          {...register("password", {
            required: "Обязательное поле для заполнения",
            minLength: {
              value: 8,
              message: "Пароль должен содержать не менее 8 символов",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors?.password && (
          <span className="rf__error-text">{errors.password.message}</span>
        )}
      </p>

      <p
        className={`rf__input-wrapper ${
          errors?.confirmPassword ? "rf__input-wrapper--error" : ""
        }`}
      >
        <input
          {...register("confirmPassword", {
            required: "Обязательное поле для заполнения",
            validate: (value: string) => {
              if (watch("password") !== value) {
                return "Пароли не совпадают";
              }
            },
          })}
          type="password"
          placeholder="Confirm password"
        />
        {errors?.confirmPassword && (
          <span className="rf__error-text">
            {errors.confirmPassword.message}
          </span>
        )}
      </p>

      <input type="submit" value="Зарегестрироваться" />
    </form>
  );
}
