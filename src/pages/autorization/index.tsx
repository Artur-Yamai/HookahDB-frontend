import { useState } from "react";
import "./autorization.scss";

export const Autorization = (): JSX.Element => {
  const [formBxActive, setFormBxActive] = useState<string>("");
  const [startPageActive, setStartPageActive] = useState<string>("");

  function toGoSignupPage(isActive: boolean): void {
    setFormBxActive(isActive ? "autorization__formBx--active" : "");
    setStartPageActive(isActive ? "autorization--active" : "");
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
            <form>
              <input type="text" placeholder="Login" />
              <input type="password" placeholder="Password" />
              <input type="submit" value="Войти" />
              <a href="#" className="autorization__forget-password">
                Забыли пароль?
              </a>
            </form>
          </div>
          <div className="autorization__form autorization__signupForm">
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
