import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import NavBar from "../NavBar/NavBar";
import CommonStore from "../../store/common";
import "./MainLayout.scss";

function MainLayout(): JSX.Element {
  return (
    <>
      <NavBar />
      <div
        className={
          "page-wrapper" + (CommonStore.loading ? " page-wrapper--loading" : "")
        }
      >
        <Outlet />
      </div>
    </>
  );
}

export default observer(MainLayout);
