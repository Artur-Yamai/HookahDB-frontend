import { useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { RegistrationForm } from "./RegistrationForm";
import { AuthorizationForm } from "./AuthorizationForm";
import { IUserRegistrationData, IUserAuthorizationData } from "./interfaces";
import "./authorization.scss";

function Authorization(): JSX.Element {
  const navigate = useNavigate();
  const [formBxActive, setFormBxActive] = useState<string>("");
  const [startPageActive, setStartPageActive] = useState<string>("");

  function toGoSignupPage(isActive: boolean): void {
    setFormBxActive(isActive ? "authorization__formBx--active" : "");
    setStartPageActive(isActive ? "authorization--active" : "");
  }

  async function toSignin({
    login,
    password,
  }: IUserAuthorizationData): Promise<void> {
    console.log(login, password);
    // navigate("/");
  }

  async function toSignup({
    login,
    email,
    password,
  }: IUserRegistrationData): Promise<void> {
    const res = await UserStore.toRegistrationUser(login, password, email);
    if (res.success) {
      toGoSignupPage(false);
    } else {
      alert("Ошибка регистрации");
    }
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
            <RegistrationForm onSubmit={toSignup} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Authorization);
