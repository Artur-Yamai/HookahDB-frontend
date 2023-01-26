import { useState } from "react";
import { useForm } from "react-hook-form";
import { IUser } from "../../Types";

import "./RegistrationForm.scss";

interface IRegistrationForm {
  onSubmit: (userData: IUser.RegistrationData) => Promise<boolean>;
  loginExists: (login: string) => Promise<boolean>;
  emailExists: (email: string) => Promise<boolean>;
}

interface FormValues {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type FormFiled = "login" | "email" | "password" | "confirmPassword";

let resolve: any;
const sleep = () => new Promise((r) => (resolve = r));

export function RegistrationForm({
  onSubmit,
  loginExists,
  emailExists,
}: IRegistrationForm): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
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
      reset({ login: "", email: "", password: "", confirmPassword: "" });
    }
  });

  const [timerId, setTimerId] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);

  let isLoginExist = false;
  let isEmailExist = false;

  const [isLoginCheck, toggleIsLoginCheck] = useState<boolean>(false);
  const [isEmailCheck, toggleIsEmailCheck] = useState<boolean>(false);

  function isExistLogin(login: string): void {
    if (!login || login.length < 4) return;
    clearTimeout(timerId);
    setTimerId(
      setTimeout(async () => {
        toggleIsLoginCheck(true);
        try {
          const res: boolean = await loginExists(login);
          isLoginExist = res;
        } catch (_) {
          isLoginExist = false;
        } finally {
          setTimeout(() => {
            toggleIsLoginCheck(false);
            resolve();
          }, 200);
        }
      }, 500)
    );
  }

  function isExistEmail(email: string): void {
    clearTimeout(timerId);
    setTimerId(
      setTimeout(async () => {
        toggleIsEmailCheck(true);
        try {
          const res: boolean = await emailExists(email);
          console.log(email, res);
          isEmailExist = res;
        } catch (_) {
          isEmailExist = false;
        } finally {
          setTimeout(() => {
            toggleIsEmailCheck(false);
            resolve();
          }, 200);
        }
      }, 500)
    );
  }

  function getClassName(field: FormFiled): string {
    if (watch(field)) {
      return errors?.[field]
        ? "rf__input-wrapper--error"
        : "rf__input-wrapper--success";
    } else {
      return errors?.[field] ? "rf__input-wrapper--error" : "";
    }
  }

  return (
    <form onSubmit={formSubmit} className="rf">
      <p
        className={`rf__input-wrapper ${getClassName("login")} ${
          isLoginCheck ? "rf__spinner" : ""
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
            pattern: {
              value: /^[A-Za-z0-9]/,
              message: "Логин должен содержать латинские буквы и цифры",
            },
            validate: {
              positive: async (login: string) => {
                isExistLogin(login);
                await sleep();
                return !isLoginExist ? true : "Логин занят";
              },
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
        className={`rf__input-wrapper ${getClassName("email")} ${
          isEmailCheck ? "rf__spinner" : ""
        }`}
      >
        <input
          {...register("email", {
            required: "Поле Email обязательно для заполнения",
            pattern: {
              value:
                // eslint-disable-next-line
                /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
              message: "Некорректный email",
            },
            validate: {
              positive: async (email: string) => {
                isExistEmail(email);
                await sleep();
                console.log(isEmailExist);
                return !isEmailExist ? true : "Такой email уже зарегестрирован";
              },
            },
          })}
          type="email"
          placeholder="Email address"
        />
        {errors?.email && (
          <span className="rf__error-text">{errors.email.message}</span>
        )}
      </p>

      <p className={`rf__input-wrapper ${getClassName("password")}`}>
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

      <p className={`rf__input-wrapper ${getClassName("confirmPassword")}`}>
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
