import { useState } from "react";
import { InteractionButton } from "./InteractionButton";
import { InteractionList } from "./InteractionList";
import { MenuInteractionButton } from "../../Types";
import "./MenuInteraction.scss";

interface MenuInteractionProps {
  buttonList: MenuInteractionButton[];
}

export const MenuInteraction = ({ buttonList }: MenuInteractionProps) => {
  const [isActive, toggleActiveStatus] = useState<boolean>(false);

  return (
    <div
      className={`menu-interaction ${
        isActive ? "menu-interaction--active" : ""
      }`}
    >
      <InteractionButton
        isActive={isActive}
        onClick={() => toggleActiveStatus(!isActive)}
      />
      <InteractionList isActive={isActive} buttonList={buttonList} />
    </div>
  );
};
