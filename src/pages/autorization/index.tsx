import { useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { RegistrationForm } from "./RegistrationForm";
import { IUserRegistrationData } from "./interfaces";
import "./autorization.scss";

function Autorization(): JSX.Element {
  const navigate = useNavigate();
  const [formBxActive, setFormBxActive] = useState<string>("");
  const [startPageActive, setStartPageActive] = useState<string>("");

  function toGoSignupPage(isActive: boolean): void {
    setFormBxActive(isActive ? "autorization__formBx--active" : "");
    setStartPageActive(isActive ? "autorization--active" : "");
  }

  async function toSignin(e: React.SyntheticEvent<EventTarget>): Promise<void> {
    e.preventDefault();
    await alert("Вы авторизированы");
    navigate("/");
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
            <form onSubmit={toSignin}>
              <input type="text" placeholder="Login" />
              <input type="password" placeholder="Password" />
              <input type="submit" value="Войти" onClick={toSignin} />
              <button className="autorization__forget-password">
                Забыли пароль?
              </button>
            </form>
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
