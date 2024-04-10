import { observer } from "mobx-react-lite";

import UserStore from "store/user";
import { RestorePasswordForm } from "./RestorePasswordForm";
import "./SafetysSettings.scss";

export const SafetysSettings = observer(() => {
  if (!UserStore.userData) return <></>;

  return (
    <div className="safetys-settings">
      <RestorePasswordForm onSubmit={UserStore.updatePassword} />
    </div>
  );
});
