import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
// import { BiHelpCircle } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { VscSignOut } from "react-icons/vsc";
import { BiUserCircle } from "react-icons/bi";
import { ImDatabase } from "react-icons/im";
import { FaComputer } from "react-icons/fa6";
import UserStore from "../../store/user";
import { User } from "../../Types/user/User";
import { NavBarElem } from "./NavBarElem";
import "./NavBar.scss";
import { RoleCodes } from "helpers";

interface NavLinkProps {
  caption: string;
  path: string;
  getIcon: () => JSX.Element;
}

const NavBar = () => {
  const [navLinkList, setNavLinkList] = useState<NavLinkProps[]>([
    {
      caption: "Войти",
      path: "/auth",
      getIcon: () => <GoSignIn />,
    },
    {
      caption: "Главная",
      path: ".",
      getIcon: () => <AiOutlineHome />,
    },
    // {
    //   caption: "Контакты",
    //   path: "contacts",
    //   getIcon: () => <BiHelpCircle />,
    // },
    {
      caption: "Настройки",
      path: "settings",
      getIcon: () => <TbSettings />,
    },
  ]);

  const [isVisibleMenu, toggleVisibleMenu] = useState<boolean>(false);
  const userData: User | null = UserStore.userData;

  const signOut = () => UserStore.toSignOut();
  const navbarToggle = () => toggleVisibleMenu(!isVisibleMenu);

  useEffect(() => {
    const newNavLinkList: NavLinkProps[] = [...navLinkList];

    const login = userData?.login;

    newNavLinkList[0] =
      userData && login
        ? {
            caption: login,
            path: "/my-page",
            getIcon: () => <BiUserCircle />,
          }
        : {
            caption: "Войти",
            path: "/auth",
            getIcon: () => <GoSignIn />,
          };

    setNavLinkList(newNavLinkList);
    // eslint-disable-next-line
  }, [userData]);

  return (
    <>
      <nav className={`navbar ${isVisibleMenu ? "navbar--active" : ""}`}>
        <div className="navbar__logo">
          <button className="navbar__toggle-button" onClick={navbarToggle}>
            <span></span>
          </button>
          <NavLink to="/">
            <h1>
              HookahDB <ImDatabase />
            </h1>
          </NavLink>
        </div>
        <ul>
          {navLinkList.map((linkInfo: NavLinkProps, i: number): JSX.Element => {
            return (
              <NavBarElem
                key={i}
                path={linkInfo.path}
                onClick={navbarToggle}
                icon={linkInfo.getIcon()}
                caption={linkInfo.caption}
              />
            );
          })}
          {userData?.roleCode === RoleCodes.admin && (
            <>
              <hr />
              <li>
                <a href={window.location.origin + "/admin"}>
                  <span className="navbar__icon">
                    <FaComputer />
                  </span>
                  <span className="navbar__title">Админка</span>
                </a>
              </li>
            </>
          )}
          {userData && (
            <>
              <hr />
              <NavBarElem
                className="navbar__exit-button"
                path="/"
                onClick={signOut}
                icon={<VscSignOut />}
                caption="Выход"
              />
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default observer(NavBar);
