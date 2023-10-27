import { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ImDatabase } from "react-icons/im";
import { Helmet } from "react-helmet";
import UserStore from "store/user";
import { UserApi } from "API";
import {
  RegistrationForm,
  AuthorizationForm,
  RestorePasswordDialog,
} from "components";
import { AuthorizationUserData, RegistrationUserData } from "Types";
import "./AuthorizationPage.scss";
import { notify } from "UI";
import { useMount } from "hooks";

export const AuthorizationPage = observer(() => {
  const { refCode } = useParams<{ refCode: string | undefined }>();
  const navigate = useNavigate();
  const [isActive, toggleIsActive] = useState<boolean>(false);
  const [formBxActive, setFormBxActive] = useState<string>("");
  const [startPageActive, setStartPageActive] = useState<string>("");
  const [isVisibleDialog, toggleVisibleDialog] = useState<boolean>(false);

  const toGoSignupPage = (isActive: boolean): void => {
    toggleIsActive(isActive);
    setFormBxActive(isActive ? "authorization__formBx--active" : "");
    setStartPageActive(isActive ? "authorization--active" : "");
  };

  useMount(() => toGoSignupPage(!!refCode));

  // Авторизация
  const toSignin = async ({
    login,
    password,
  }: AuthorizationUserData): Promise<void> => {
    const res: boolean = await UserStore.toAuthorization(login, password);

    if (res) {
      navigate("/");
    }
  };

  // Регистрация
  const toSignup = async (regData: RegistrationUserData): Promise<boolean> => {
    const res: boolean = await UserStore.toRegistration(regData);
    if (res) {
      notify("Регистрация прошла успешно. Авторизируйтесь", "success", 3000);
      toGoSignupPage(false);
    } else {
      notify("Не удалось зарегистрироваться", "error");
    }

    return res;
  };

  const loginExists = async (login: string): Promise<boolean> => {
    try {
      const { data } = await UserApi.loginExists(login);
      return data.success ? data.body.isExists : false;
    } catch (_) {
      return false;
    }
  };

  const emailExists = async (email: string): Promise<boolean> => {
    try {
      const { data } = await UserApi.emailExists(email);
      return data.success ? data.body.isExists : false;
    } catch (_) {
      return false;
    }
  };

  const refCodeExist = async (refCode: string): Promise<boolean> => {
    try {
      const { data } = await UserApi.refCodeExists(refCode);
      return data.success ? data.body.isExists : false;
    } catch (_) {
      return false;
    }
  };

  const agree = (isSuccess: boolean) => {
    if (isSuccess) {
      notify("Проверьте почту, был прислан новый пароль", "success");
      toggleVisibleDialog(false);
    }
  };

  if (UserStore.userData) {
    setTimeout(() => navigate("/"));
  }

  return (
    <>
      <Helmet>
        <title>{isActive ? "Регистрация" : "Вход"}</title>
      </Helmet>
      <div className={`authorization ${startPageActive}`}>
        <div className="authorization__container">
          <NavLink to="/">
            <h1 className="authorization__sitename">
              HookahDB <ImDatabase />
            </h1>
          </NavLink>
          <div className="blueBg">
            <div className="authorization__box authorization__signin">
              <h2>Уже зарегистрированы?</h2>
              <button
                className="signinBtn"
                onClick={() => toGoSignupPage(false)}
              >
                Войти
              </button>
            </div>
            <div className="authorization__box authorization__signup">
              <h2>Нет аккаунта?</h2>
              <button
                className="signupBtn"
                onClick={() => toGoSignupPage(true)}
              >
                Регистрация
              </button>
            </div>
          </div>
          <div className={`authorization__formBx ${formBxActive}`}>
            <div className="authorization__form authorization__signinForm">
              <AuthorizationForm
                onSubmit={toSignin}
                showForgotDialog={() => toggleVisibleDialog(true)}
              />
            </div>
            <div className="authorization__form authorization__signupForm">
              <RegistrationForm
                refCodeProp={refCode}
                onSubmit={toSignup}
                loginExists={loginExists}
                emailExists={emailExists}
                refCodeExist={refCodeExist}
              />
            </div>
          </div>
        </div>
      </div>

      <RestorePasswordDialog
        isVisible={isVisibleDialog}
        closeDialog={() => toggleVisibleDialog(false)}
        agree={agree}
      />
    </>
  );
});
