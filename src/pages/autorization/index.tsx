import { useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { RegistrationForm } from "./RegistrationForm";
import { AuthorizationForm } from "./AuthorizationForm";
import { IUserRegistrationData, IUserAutorizationData } from "./interfaces";
import "./autorization.scss";

function Autorization(): JSX.Element {
  const navigate = useNavigate();
  const [formBxActive, setFormBxActive] = useState<string>("");
  const [startPageActive, setStartPageActive] = useState<string>("");

  function toGoSignupPage(isActive: boolean): void {
    setFormBxActive(isActive ? "autorization__formBx--active" : "");
    setStartPageActive(isActive ? "autorization--active" : "");
  }

  async function toSignin({
    login,
    password,
  }: IUserAutorizationData): Promise<void> {
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
    <div className={`autorization ${startPageActive}`}>
      <div className="autorization__container">
        <div className="blueBg">
          <div className="autorization__box autorization__signin">
            <h2>Уже зарегестрированы?</h2>
            <button className="signinBtn" onClick={() => toGoSignupPage(false)}>
              Войти
            </button>
          </div>
          <div className="autorization__box autorization__signup">
            <h2>Нет аккаунта?</h2>
            <button className="signupBtn" onClick={() => toGoSignupPage(true)}>
              Регистрация
            </button>
          </div>
        </div>
        <div className={`autorization__formBx ${formBxActive}`}>
          <div className="autorization__form autorization__signinForm">
            <AuthorizationForm onSubmit={toSignin} />
          </div>
          <div className="autorization__form autorization__signupForm">
            <RegistrationForm onSubmit={toSignup} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Autorization);
