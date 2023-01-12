import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { IUser } from "../../interfaces/User";
import { Image, Button } from "../../UI";
import "./Userpage.scss";

function Userpage(): JSX.Element {
  const user: IUser | null = UserStore.getUserData();

  function changeAvatar() {
    console.log("changeAvatar");
  }

  if (user === null) {
    return <h1>Страница недоступна</h1>;
  }

  return (
    <>
      <div className="user-page">
        <div className="user-page__avatar">
          <Image />
          <h2>{user.login}</h2>
          <p>{user.email}</p>
          <Button click={changeAvatar} text="Изменить аватар" />
        </div>
        <div className="user-page__info"></div>
      </div>
    </>
  );
}

export default observer(Userpage);
