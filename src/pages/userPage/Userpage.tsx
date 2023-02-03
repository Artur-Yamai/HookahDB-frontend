import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { IUser } from "../../Types/user/User";
import { Image, Input, InputTypeFIle } from "../../UI";
import "./Userpage.scss";

function Userpage(): JSX.Element {
  const user: IUser | null = UserStore.getUserData;
  const comments = false;

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
        <div className="user-page__user-info">
          <div className="user-page__avatar">
            <h1 className="user-page__login">{user.login}</h1>
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
          <form className="user-page__data">
            <Input label="email" value={user.email} disabled />
            <Input label="Дата регистрацияя" value={date} disabled />
          </form>
        </div>
        {/* TODO: вынести в отдельный коспонент когда появятся комментарии */}
        <div className="comment-block">
          <h2 className="comment-block__title">Оставленные комментарии</h2>
          {comments ? (
            <ul></ul>
          ) : (
            <h4 className="comment-block__no-comments-text">
              Ваших комментариев нет. Займитесь этим, чтоли ¯\_(ツ)_/¯
            </h4>
          )}
        </div>
      </div>
    </>
  );
}

export default observer(Userpage);
