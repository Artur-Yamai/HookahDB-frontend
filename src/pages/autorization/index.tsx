import { useState } from "react";
import { useNavigate } from "react-router";
import "./autorization.scss";

export function Autorization(): JSX.Element {
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

  async function toSignup(e: React.SyntheticEvent<EventTarget>): Promise<void> {
    e.preventDefault();
    await alert("Вы зарегестрированы");
    toGoSignupPage(false);
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
            <form onSubmit={toSignup}>
              <input type="text" placeholder="Username" />
              <input type="text" placeholder="Email address" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm password" />
              <input
                type="submit"
                value="Зарегестрироваться"
                onClick={toSignup}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
