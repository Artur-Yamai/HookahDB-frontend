import { useState, forwardRef, useImperativeHandle } from "react";
import { InteractionButton } from "./InteractionButton";
import { InteractionList } from "./InteractionList";
import { MenuInteractionButton } from "../../Types";
import "./MenuInteraction.scss";

interface MenuInteractionProps {
  buttonList: MenuInteractionButton[];
}

export const MenuInteraction = forwardRef(
  ({ buttonList }: MenuInteractionProps, ref) => {
    const [isActive, toggleActiveStatus] = useState<boolean>(false);

    const hideList = () => toggleActiveStatus(false);

    useImperativeHandle(ref, () => ({ hideList }));

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
  }
);
