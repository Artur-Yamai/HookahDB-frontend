import "./InteractionListItem.scss";
import { MenuInteractionButton } from "../../../../Types";

interface InteractionListItemProps {
  index: number;
  itemData: MenuInteractionButton;
  isActive: boolean;
}

export const InteractionListItem = ({
  isActive,
  index,
  itemData,
}: InteractionListItemProps) => (
  <li
    onClick={itemData.method}
    className={`interaction-list-item ${
      isActive ? "interaction-list-item--active" : ""
    }`}
    style={{ animationDelay: `${0.2 * (index + 1)}s` }}
  >
    {itemData.icon}
    <span>{itemData.title}</span>
  </li>
);
