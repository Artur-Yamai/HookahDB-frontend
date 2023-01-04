import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";
import "./MainLayout.scss";

export function MainLayout(): JSX.Element {
  return (
    <>
      <NavBar />
      <div className="page-wrapper">
        <Outlet />
      </div>
    </>
  );
}
