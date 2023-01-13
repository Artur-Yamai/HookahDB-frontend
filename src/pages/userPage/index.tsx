import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { IUser } from "../../interfaces/User";
import { Image, Button, Input } from "../../UI";
import "./Userpage.scss";

function Userpage(): JSX.Element {
  const user: IUser | null = UserStore.getUserData();

  function changeAvatar() {
    console.log("changeAvatar");
  }

  if (user === null) {
    return <h1>Страница недоступна</h1>;
  }

  const date = new Date(user.createdAt).toLocaleString();

  return (
    <>
      <div className="user-page">
        <div className="user-page__avatar">
          <Image />
          <Button click={changeAvatar} text="Изменить аватар" />
        </div>
        <div className="user-page__info">
          <form>
            <h1>{user.login}</h1>
            <Input label="email" value={user.email} disabled />
            <Input label="Дата регистрацияя" value={date} disabled />
          </form>
          <hr />
          <h3>Тут будет список комментариев</h3>
        </div>
      </div>
    </>
  );
}

export default observer(Userpage);
