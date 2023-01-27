import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { IUser } from "../../Types/user/User";
import { Image, Input, InputTypeFIle } from "../../UI";
import "./Userpage.scss";

function Userpage(): JSX.Element {
  const user: IUser | null = UserStore.getUserData();

  function onChange(files: FileList) {
    UserStore.saveNewAvatar(files[0]);
  }

  if (user === null) {
    return <h1>Страница недоступна</h1>;
  }

  const date = new Date(user.createdAt).toLocaleString();

  return (
    <>
      <div className="user-page">
        <div className="user-page__avatar">
          <Image url={user.avatarUrl} />
          <InputTypeFIle
            onChange={onChange}
            label="Изменить аватар"
            accept={["image/png", "image/jpg", "image/jpeg"]}
          />
          <p className="user-page__avatat-format-list">
            Форматы .png, .jpg, .jpeg
          </p>
        </div>
        <div className="user-page__info">
          <form>
            <h1>{user.login}</h1>
            <Input label="email" value={user.email} disabled />
            <Input label="Дата регистрацияя" value={date} disabled />
          </form>
          <hr />
          <h3>Ваши комментарии</h3>
        </div>
      </div>
    </>
  );
}

export default observer(Userpage);
