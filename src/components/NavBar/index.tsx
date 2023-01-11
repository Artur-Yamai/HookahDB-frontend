import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import { TfiViewListAlt } from "react-icons/tfi";
import { BiHelpCircle } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { VscSignOut } from "react-icons/vsc";
import { BiUserCircle } from "react-icons/bi";
import UserStore from "../../store/user";
import { IUser } from "../../interfaces/User";
import "./NavBar.scss";

interface INavLink {
  caption: string;
  path: string;
  getIcon: () => JSX.Element;
}

export function NavBar(): JSX.Element {
  const [activeClass, setActiveClass]: [string, Function] = useState("");
  const toggle = function (): void {
    setActiveClass(activeClass ? "" : "navbar__active navbar--active");
  };

  const userData: IUser | null = UserStore.getUserData();

  const navLinkList: INavLink[] = [
    userData !== null
      ? {
          caption: userData.login,
          path: `/myPage`,
          getIcon: () => <BiUserCircle />,
        }
      : {
          caption: "Войти",
          path: "/auth",
          getIcon: () => <GoSignIn />,
        },
    {
      caption: "Главная",
      path: ".",
      getIcon: () => <AiOutlineHome />,
    },
    {
      caption: "Список",
      path: "about",
      getIcon: () => <TfiViewListAlt />,
    },
    {
      caption: "Контакты",
      path: "contacts",
      getIcon: () => <BiHelpCircle />,
    },
    {
      caption: "Настройки",
      path: "settings",
      getIcon: () => <TbSettings />,
    },
    {
      caption: "Выйти",
      path: "contacts3",
      getIcon: () => <VscSignOut />,
    },
  ];

  return (
    <nav className={`navbar ${activeClass}`}>
      <ul>
        {navLinkList.map((linkInfo: INavLink, i: number): JSX.Element => {
          return (
            <li key={i}>
              <NavLink to={linkInfo.path}>
                <span className="navbar__icon">{linkInfo.getIcon()}</span>
                <span className="navbar__title">{linkInfo.caption}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <button className="navbar__toggle-button" onClick={toggle}></button>
    </nav>
  );
}
