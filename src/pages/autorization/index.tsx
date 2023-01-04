import { useState } from "react";
import "./autorization.scss";

export const Autorization = (): JSX.Element => {
  const [formBxActive, setFormBxActive] = useState<string>("");
  const [startPageActive, setStartPageActive] = useState<string>("");

  function toGoSignupPage(isActive: boolean): void {
    setFormBxActive(isActive ? "start-page__formBx--active" : "");
    setStartPageActive(isActive ? "start-page--active" : "");
  }

  return (
    <div className={`start-page ${startPageActive}`}>
      <div className="start-page__container">
        <div className="blueBg">
          <div className="start-page__box start-page__signin">
            <h2>Уже зарегестрированы?</h2>
            <button className="signinBtn" onClick={() => toGoSignupPage(false)}>
              Войти
            </button>
          </div>
          <div className="start-page__box start-page__signup">
            <h2>Нет аккаунта?</h2>
            <button className="signupBtn" onClick={() => toGoSignupPage(true)}>
              Регистрация
            </button>
          </div>
        </div>
        <div className={`start-page__formBx ${formBxActive}`}>
          <div className="start-page__form start-page__signinForm">
            <form>
              <input type="text" placeholder="Login" />
              <input type="password" placeholder="Password" />
              <input type="submit" value="Войти" />
              <a href="#" className="start-page__forget-password">
                Забыли пароль?
              </a>
            </form>
          </div>
          <div className="start-page__form start-page__signupForm">
            <form>
              <input type="text" placeholder="Username" />
              <input type="text" placeholder="Email address" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm password" />
              <input type="submit" value="Зарегестрироваться" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
