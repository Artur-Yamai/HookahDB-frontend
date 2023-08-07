import { InteractionListItem } from "./InteractionListItem";
import { MenuInteractionButton } from "../../../Types";
import "./InteractionList.scss";

interface InteractionListProps {
  isActive: boolean;
  buttonList: MenuInteractionButton[];
}

export const InteractionList = ({
  isActive,
  buttonList,
}: InteractionListProps) => (
  <ul
    className={`interaction-list ${isActive ? "interaction-list--active" : ""}`}
    style={{ height: `${buttonList.length * 40 + 10}px` }}
  >
    {buttonList.map((data: MenuInteractionButton, i) => (
      <InteractionListItem
        isActive={isActive}
        key={i}
        index={i}
        itemData={data}
      />
    ))}
  </ul>
);
