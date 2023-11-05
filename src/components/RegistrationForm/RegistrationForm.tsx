import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { RegistrationUserData } from "Types";
import { UserApi } from "API";

import "./RegistrationForm.scss";

interface RegistrationFormProps {
  refCodeProp: string | undefined;
  onSubmit: (userData: RegistrationUserData) => Promise<boolean>;
}

interface FormValues {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  refCode: string;
}

type FormFiled = "login" | "email" | "password" | "confirmPassword" | "refCode";

let resolve: any;
const sleep = () => new Promise((r) => (resolve = r));

export const RegistrationForm = ({
  refCodeProp,
  onSubmit,
}: RegistrationFormProps): JSX.Element => {
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
      refCode: refCodeProp ?? "",
    },
  });

  const passDontConfirmText = useMemo(
    () =>
      watch("confirmPassword").length &&
      watch("confirmPassword") !== watch("password")
        ? "Пароли не совпадают"
        : "",
    // eslint-disable-next-line
    [watch, watch("confirmPassword"), watch("password")]
  );

  const formSubmit = handleSubmit(
    async (regData: RegistrationUserData): Promise<void> => {
      const res: boolean = await onSubmit(regData);
      if (res) {
        reset({ login: "", email: "", password: "", confirmPassword: "" });
      }
    }
  );

  const [timerId, setTimerId] = useState<string | number | NodeJS.Timeout>(-1);

  let isLoginExist = false;
  let isEmailExist = false;
  let isRefCodeExist = false;

  const [isLoginCheck, toggleIsLoginCheck] = useState<boolean>(false);
  const [isEmailCheck, toggleIsEmailCheck] = useState<boolean>(false);
  const [isRefCodeCheck, toggleIsRefCodeCheck] = useState<boolean>(false);

  async function toExistCheck<T>(
    data: T,
    checkFunc: (data: T) => Promise<any>
  ): Promise<boolean> {
    try {
      const resp = await checkFunc(data);
      return "success" in resp.data ? resp.data.body.isExists : false;
    } catch (_) {
      return false;
    }
  }

  const isExistLogin = (login: string): void => {
    if (!login || login.length < 4) return;
    clearTimeout(timerId);
    setTimerId(
      setTimeout(async () => {
        toggleIsLoginCheck(true);
        try {
          const res: boolean = await toExistCheck(login, UserApi.loginExists);
          isLoginExist = res;
        } catch (_) {
          isLoginExist = false;
        } finally {
          toggleIsLoginCheck(false);
          resolve();
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
          const res: boolean = await toExistCheck(email, UserApi.emailExists);
          isEmailExist = res;
        } catch (_) {
          isEmailExist = false;
        } finally {
          toggleIsEmailCheck(false);
          resolve();
        }
      }, 500)
    );
  };

  const isExistRefCode = (refCode: string): void => {
    clearTimeout(timerId);
    setTimerId(
      setTimeout(async () => {
        toggleIsRefCodeCheck(true);
        try {
          const res: boolean = await toExistCheck(
            refCode,
            UserApi.refCodeExists
          );
          isRefCodeExist = res;
        } catch (_) {
          isRefCodeExist = false;
        } finally {
          toggleIsRefCodeCheck(false);
          resolve();
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
    minLength: { value: 4, message: "Минимум 4 символа" },
    maxLength: { value: 30, message: "Максимум 30 символов" },
    pattern: {
      value: /^[A-Za-z0-9]+$/,
      message: "Логин должен содержать только латинские буквы и цифры",
    },
    validate: {
      positive: async (login: string) => {
        if (parseInt(login[0])) {
          return "Логин должен начинаться с латинской буквы";
        }
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
        /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
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

  const refCodeValidator = register("refCode", {
    required: "Обязательное поле",
    validate: {
      positive: async (refCode: string): Promise<boolean | string> => {
        isExistRefCode(refCode);
        await sleep();
        return isRefCodeExist ? true : "Такого кода нет";
      },
    },
  });

  const getErrorText = (text: string | undefined) => {
    return <span className="rf__error-text">{text}</span>;
  };

  return (
    <form onSubmit={formSubmit} className="rf">
      <p
        className={`rf__input-wrapper ${getClassName("login")} ${
          isLoginCheck ? "rf__spinner" : ""
        }`}
      >
        <input {...loginValidator} type="text" placeholder="Логин" />
        {errors?.login && getErrorText(errors.login.message)}
      </p>

      <p
        className={`rf__input-wrapper ${getClassName("email")} ${
          isEmailCheck ? "rf__spinner" : ""
        }`}
      >
        <input {...emailValidator} type="email" placeholder="Email" />
        {errors?.email && getErrorText(errors.email.message)}
      </p>

      <p className={`rf__input-wrapper ${getClassName("password")}`}>
        <input {...passwodValidator} type="password" placeholder="Пароль" />
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
          placeholder="Повторите пароль"
        />
        {passDontConfirmText
          ? getErrorText(passDontConfirmText)
          : errors?.confirmPassword &&
            getErrorText(errors.confirmPassword.message)}
      </p>

      <p
        className={`rf__input-wrapper ${getClassName("refCode")} ${
          isRefCodeCheck ? "rf__spinner" : ""
        }`}
      >
        <input
          {...refCodeValidator}
          type="text"
          placeholder="Реферальный код"
        />
        {errors?.refCode && getErrorText(errors.refCode.message)}
      </p>

      <input type="submit" value="Зарегистрироваться" />
    </form>
  );
};
