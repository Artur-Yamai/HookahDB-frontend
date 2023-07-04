import { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ImDatabase } from "react-icons/im";
import UserStore from "../../store/user";
import { UserApi } from "../../API";
import { RegistrationForm, AuthorizationForm } from "../../components";
import { IAuthorizationUserData, IRegistrationUserData } from "../../Types";
import "./Authorization.scss";
import { notify } from "../../UI";

const Authorization = () => {
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
  }: IAuthorizationUserData): Promise<void> {
    const res: boolean = await UserStore.toAuthorization(login, password);

    if (res) {
      navigate("/");
    }
  }

  // Регистрация
  async function toSignup({
    login,
    email,
    password,
  }: IRegistrationUserData): Promise<boolean> {
    const res: boolean = await UserStore.toRegistration(login, password, email);
    if (res) {
      notify("Регистрация прошла успешно. Авторизируйтесь", "success", 3000);
      toGoSignupPage(false);
    } else {
      notify("Не удалось зарегистрироваться", "error");
    }

    return res;
  }

  async function loginExists(login: string): Promise<boolean> {
    try {
      const { data } = await UserApi.loginExists(login);
      return data.success ? data.body.isExists : false;
    } catch (_) {
      return false;
    }
  }

  async function emailExists(email: string): Promise<boolean> {
    try {
      const { data } = await UserApi.emailExists(email);
      return data.success ? data.body.isExists : false;
    } catch (_) {
      return false;
    }
  }

  if (UserStore.userData) {
    setTimeout(() => navigate("/"));
  }

  return (
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
};

export default observer(Authorization);
