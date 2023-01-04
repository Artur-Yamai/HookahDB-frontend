import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";

export function MainLayout(): JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
