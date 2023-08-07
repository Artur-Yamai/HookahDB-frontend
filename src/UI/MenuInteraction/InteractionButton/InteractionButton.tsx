import { BiDotsVerticalRounded } from "react-icons/bi";
import "./InteractionButton.scss";

interface InteractionButtonProps {
  onClick: () => void;
  isActive: boolean;
}

export const InteractionButton = ({
  onClick,
  isActive,
}: InteractionButtonProps) => (
  <button
    className={`interaction-button ${
      isActive ? "interaction-button--active" : ""
    }`}
    onClick={onClick}
    aria-label="Menu Button"
  >
    <BiDotsVerticalRounded />
    {/* <div className="interaction-button__icon-wrapper">
      <div className="interaction-button__icon-line w50 first"></div>
      <div className="interaction-button__icon-line w100"></div>
      <div className="interaction-button__icon-line w50 last"></div>
    </div> */}
  </button>
);
