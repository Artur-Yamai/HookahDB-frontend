import { useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { RegistrationForm, AuthorizationForm } from "../../components";
import { IUser } from "../../Types";
import "./Authorization.scss";
import { notify } from "../../UI/Functions";

interface IAuthResponse {
  success: boolean;
  message: string;
}

interface IRegResponse extends IAuthResponse {
  error: any;
}

function Authorization(): JSX.Element {
  const navigate = useNavigate();
  const [formBxActive, setFormBxActive] = useState<string>("");
  const [startPageActive, setStartPageActive] = useState<string>("");

  function toGoSignupPage(isActive: boolean): void {
    setFormBxActive(isActive ? "authorization__formBx--active" : "");
    setStartPageActive(isActive ? "authorization--active" : "");
  }

  // Авторизация
  async function toSignin({
    login,
    password,
  }: IUser.AuthorizationData): Promise<void> {
    const res: IAuthResponse = await UserStore.toAuthorization(login, password);

    if (res.success) {
      navigate("/");
    } else {
      notify(res.message, "error");
    }
  }

  // Регистрация
  async function toSignup({
    login,
    email,
    password,
  }: IUser.RegistrationData): Promise<boolean> {
    const res: IRegResponse = await UserStore.toRegistration(
      login,
      password,
      email
    );
    if (res.success) {
      notify(res.message, "success", 3000);
      toGoSignupPage(false);
    } else {
      notify("Не удалось зарегестрироваться", "error");
      console.error(res.message);
    }

    return res.success;
  }

  async function loginExists(login: string): Promise<boolean> {
    return await UserStore.loginExists(login);
  }

  async function emailExists(email: string): Promise<boolean> {
    return await UserStore.emailExists(email);
  }

  if (UserStore.getUserData()) {
    setTimeout(() => navigate("/"));
  }

  return (
    <div className={`authorization ${startPageActive}`}>
      <div className="authorization__container">
        <div className="blueBg">
          <div className="authorization__box authorization__signin">
            <h2>Уже зарегестрированы?</h2>
            <button className="signinBtn" onClick={() => toGoSignupPage(false)}>
              Войти
            </button>
          </div>
          <div className="authorization__box authorization__signup">
            <h2>Нет аккаунта?</h2>
            <button className="signupBtn" onClick={() => toGoSignupPage(true)}>
              Регистрация
            </button>
          </div>
        </div>
        <div className={`authorization__formBx ${formBxActive}`}>
          <div className="authorization__form authorization__signinForm">
            <AuthorizationForm onSubmit={toSignin} />
          </div>
          <div className="authorization__form authorization__signupForm">
            <RegistrationForm
              onSubmit={toSignup}
              loginExists={loginExists}
              emailExists={emailExists}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Authorization);
