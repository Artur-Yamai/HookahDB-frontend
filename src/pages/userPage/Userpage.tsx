import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import "moment/locale/ru";
import UserStore from "../../store/user";
import { IUser } from "../../Types";
import { Picture, TextBox, InputTypeFIle } from "../../UI";
import "./Userpage.scss";

function Userpage(): JSX.Element {
  const user: IUser | null = UserStore.userData;

  useEffect(() => {
    if (user?.id) {
      UserStore.getFavoriteTobaccoByUserId(user.id);
    }
  }, []);

  if (user === null) return <h1>Страница недоступна</h1>;

  function onChange(files: FileList) {
    UserStore.saveNewAvatar(files[0]);
  }

  const datetime = moment(user.createdAt).format("Do MMMM YYYY, HH:mm");

  return (
    <>
      <div className="user-page">
        <div className="user-page__user-info">
          <div className="user-page__avatar">
            <h1 className="user-page__login">{user.login}</h1>
            <Picture url={user.avatarUrl} />
            <InputTypeFIle
              onChange={onChange}
              label="Изменить аватар"
              accept={["image/png", "image/jpg", "image/jpeg"]}
            />
            <p className="user-page__avatat-format-list">
              Форматы .png, .jpg, .jpeg
            </p>
          </div>
          <form className="user-page__data">
            <TextBox label="email" value={user.email} disabled />
            <TextBox label="Дата регистрацияя" value={datetime} disabled />
          </form>
        </div>
      </div>
      {/* {UserStore.favoriteTobacco && <TobaccosList/>} */}
    </>
  );
}

export default observer(Userpage);
