import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IRegistrationUserData } from "../../Types";

import "./RegistrationForm.scss";

interface IRegistrationForm {
  onSubmit: (userData: IRegistrationUserData) => Promise<boolean>;
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
  const [passDontConfirmText, setPassDontConfirmText] = useState<string>("");
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
    const userData: IRegistrationUserData = { login, email, password };
    const res: boolean = await onSubmit(userData);
    if (res) {
      reset({ login: "", email: "", password: "", confirmPassword: "" });
    }
  });

  const [timerId, setTimerId] = useState<string | number | NodeJS.Timeout>(-1);

  let isLoginExist = false;
  let isEmailExist = false;

  const [isLoginCheck, toggleIsLoginCheck] = useState<boolean>(false);
  const [isEmailCheck, toggleIsEmailCheck] = useState<boolean>(false);

  const isExistLogin = (login: string): void => {
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
  };

  const isExistEmail = (email: string): void => {
    clearTimeout(timerId);
    setTimerId(
      setTimeout(async () => {
        toggleIsEmailCheck(true);
        try {
          const res: boolean = await emailExists(email);
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
  };

  const getClassName = (field: FormFiled): string => {
    if (watch(field)) {
      return errors?.[field]
        ? "rf__input-wrapper--error"
        : "rf__input-wrapper--success";
    } else {
      return errors?.[field] ? "rf__input-wrapper--error" : "";
    }
  };

  const loginValidator = register("login", {
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
  });

  const emailValidator = register("email", {
    required: "Поле Email обязательно для заполнения",
    pattern: {
      value:
        /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
      message: "Некорректный email",
    },
    validate: {
      positive: async (email: string) => {
        isExistEmail(email);
        await sleep();
        return !isEmailExist ? true : "Такой email уже зарегистрирован";
      },
    },
  });

  const passwodValidator = register("password", {
    required: "Обязательное поле для заполнения",
    minLength: {
      value: 8,
      message: "Пароль должен содержать не менее 8 символов",
    },
  });

  const confirmPasswordValidator = register("confirmPassword", {
    required: "Обязательное поле для заполнения",
    validate: (value: string) => {
      if (watch("password") !== value) {
        return "Пароли не совпадают";
      }
    },
  });

  const getErrorText = (text: string | undefined) => {
    return <span className="rf__error-text">{text}</span>;
  };

  useEffect(() => {
    if (
      watch("confirmPassword").length &&
      watch("confirmPassword") !== watch("password")
    ) {
      setPassDontConfirmText("Пароли не совпадают");
    } else {
      setPassDontConfirmText("");
    }
    // eslint-disable-next-line
  }, [watch("confirmPassword"), watch("password")]);

  return (
    <form onSubmit={formSubmit} className="rf">
      <p
        className={`rf__input-wrapper ${getClassName("login")} ${
          isLoginCheck ? "rf__spinner" : ""
        }`}
      >
        <input {...loginValidator} type="text" placeholder="Login" />
        {errors?.login && getErrorText(errors.login.message)}
      </p>

      <p
        className={`rf__input-wrapper ${getClassName("email")} ${
          isEmailCheck ? "rf__spinner" : ""
        }`}
      >
        <input {...emailValidator} type="email" placeholder="Email address" />
        {errors?.email && getErrorText(errors.email.message)}
      </p>

      <p className={`rf__input-wrapper ${getClassName("password")}`}>
        <input {...passwodValidator} type="password" placeholder="Password" />
        {errors?.password && getErrorText(errors.password.message)}
      </p>

      <p
        className={`rf__input-wrapper ${
          passDontConfirmText ? "rf__input-wrapper--error" : ""
        } ${getClassName("confirmPassword")}`}
      >
        <input
          {...confirmPasswordValidator}
          type="password"
          placeholder="Confirm password"
        />
        {passDontConfirmText
          ? getErrorText(passDontConfirmText)
          : errors?.confirmPassword &&
            getErrorText(errors.confirmPassword.message)}
      </p>

      <input type="submit" value="Зарегистрироваться" />
    </form>
  );
}
