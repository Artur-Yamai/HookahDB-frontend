import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import "moment/locale/ru";
import { Helmet } from "react-helmet";
import UserStore from "store/user";
import { User } from "Types";
import { Picture, TextBox, InputTypeFIle } from "UI";
import "./Userpage.scss";
import { CoalList, TobaccosList } from "components";
import { useUnmount } from "hooks";
import { imgCompressor } from "helpers";

export const Userpage = observer(() => {
  const user: User | null = UserStore.userData;

  useEffect(() => {
    if (user?.id) {
      UserStore.getFavoriteTobaccoByUserId(user.id);
      UserStore.getFavoriteCoalByUserId(user.id);
    }
  }, [user?.id]);

  useUnmount(() => {
    UserStore.clearFavoriteTobaccoList();
    UserStore.clearFavoriteCoalList();
  });

  if (user === null) return <h1>Страница недоступна</h1>;

  const onChange = async (files: FileList) => {
    const photo = await imgCompressor(files[0]);
    UserStore.saveNewAvatar(photo);
  };

  const datetime = moment(user.createdAt).format("Do MMMM YYYY, HH:mm");

  return (
    <>
      <Helmet>
        <title>{user.login}</title>
      </Helmet>
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
            <TextBox name="email" label="email" value={user.email} disabled />
            <TextBox
              name="regDate"
              label="Дата регистрации"
              value={datetime}
              disabled
            />
          </form>
        </div>
      </div>
      {UserStore.favoriteTobacco.length && (
        <>
          <h1>Угли</h1>
          <TobaccosList tobaccos={UserStore.favoriteTobacco} />
        </>
      )}
      {UserStore.favoriteCoal && (
        <>
          <h1>Угли</h1>
          <CoalList coals={UserStore.favoriteCoal} />
        </>
      )}
    </>
  );
});
