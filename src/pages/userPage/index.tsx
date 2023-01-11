import { observer } from "mobx-react-lite";
import UserStore from "../../store/user";
import { IUser } from "../../interfaces/User";

function UserPage(): JSX.Element {
  const user: IUser | null = UserStore.getUserData();

  if (user === null) {
    return <h1>СТраница недоступна</h1>;
  }

  return (
    <>
      <h1>UserPage - {user.login}</h1>
    </>
  );
}

export default observer(UserPage);
