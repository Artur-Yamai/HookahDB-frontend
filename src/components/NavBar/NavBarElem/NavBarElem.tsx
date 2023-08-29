import { NavLink } from "react-router-dom";
import "./NavBarElem.scss";

interface NavBarElemProps {
  className?: string;
  path: string;
  onClick: () => void;
  icon: JSX.Element;
  caption: string;
}

export const NavBarElem = ({
  className = "",
  path,
  onClick,
  icon,
  caption,
}: NavBarElemProps) => {
  return (
    <li className={className} onClick={onClick}>
      <NavLink to={path}>
        <span className="navbar__icon">{icon}</span>
        <span className="navbar__title">{caption}</span>
      </NavLink>
    </li>
  );
};
