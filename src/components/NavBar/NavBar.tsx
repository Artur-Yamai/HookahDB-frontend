import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
// import { BiHelpCircle } from "react-icons/bi";
// import { TbSettings } from "react-icons/tb";
import { VscSignOut } from "react-icons/vsc";
import { BiUserCircle } from "react-icons/bi";
import { ImDatabase } from "react-icons/im";
import UserStore from "../../store/user";
import { IUser } from "../../Types/user/User";
import { useNavigate } from "react-router";
import "./NavBar.scss";

interface INavLink {
  caption: string;
  path: string;
  getIcon: () => JSX.Element;
}

const NavBar = (): JSX.Element => {
  const navigate = useNavigate();

  const [navLinkList, setNavLinkList] = useState<INavLink[]>([
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
    // {
    //   caption: "Настройки",
    //   path: "settings",
    //   getIcon: () => <TbSettings />,
    // },
  ]);
  const [isVisibleMenu, toggleVisibleMenu] = useState<boolean>(false);

  const userData: IUser | null = UserStore.userData;

  useEffect(() => {
    const newNavLinkList: INavLink[] = [...navLinkList];

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

  const signOut = () => {
    UserStore.toSignOut();
    navigate("/");
  };

  const navbarToggle = () => toggleVisibleMenu(!isVisibleMenu);

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
          {navLinkList.map((linkInfo: INavLink, i: number): JSX.Element => {
            return (
              <li key={i} onClick={navbarToggle}>
                <NavLink to={linkInfo.path}>
                  <span className="navbar__icon">{linkInfo.getIcon()}</span>
                  <span className="navbar__title">{linkInfo.caption}</span>
                </NavLink>
              </li>
            );
          })}
          {userData && (
            <>
              <hr />
              <li
                className="navbar__elem navbar__elem--exit-button"
                onClick={signOut}
              >
                <span className="navbar__icon">
                  <VscSignOut />
                </span>
                <span className="navbar__title">Выход</span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default observer(NavBar);
