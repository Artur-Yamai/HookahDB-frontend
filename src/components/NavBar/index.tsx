import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { TfiViewListAlt } from "react-icons/tfi";
import { BiHelpCircle } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { VscSignOut } from "react-icons/vsc";
import "./NavBar.scss";

export function NavBar(): JSX.Element {
  const [activeClass, setActiveClass]: [string, Function] = useState("");
  const toggle = function (): void {
    setActiveClass(activeClass ? "" : "active");
  };

  return (
    <nav className={`navbar ${activeClass}`}>
      <ul>
        <li>
          <NavLink to=".">
            <span className="navbar__icon">
              <AiOutlineHome />
            </span>
            <span className="navbar__title">Главная</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="about">
            <span className="navbar__icon">
              <TfiViewListAlt />
            </span>
            <span className="navbar__title">Список</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="contacts">
            <span className="navbar__icon">
              <BiHelpCircle />
            </span>
            <span className="navbar__title">Помощь</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="contacts">
            <span className="navbar__icon">
              <TbSettings />
            </span>
            <span className="navbar__title">Настройки</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="contacts">
            <span className="navbar__icon">
              <VscSignOut />
            </span>
            <span className="navbar__title">Выйти</span>
          </NavLink>
        </li>
      </ul>
      <div className="navbar__toggle-button" onClick={toggle}></div>
    </nav>
  );
}
