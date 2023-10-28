import { useState, cloneElement } from "react";
import { RatingProps } from "./RatingProps";
import { EmptyStar, HalfStar, FullStar } from "./Stars";
import "./RatingStars.scss";

export const RatingStars = ({
  className = "",
  count,
  ratingInNumber,
  ratingInStar,
  color = "#ffd700",
  hoverColor = "#ffb000",
  activeColor = "#ffd107",
  size = 30,
  ratingsQuantity = null,
  edit = true,
  isHalf = true,
  showDetails = false,
  onChange,
  emptyIcon = <EmptyStar />,
  halfIcon = <HalfStar />,
  fullIcon = <FullStar />,
}: RatingProps): JSX.Element => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const handleMouseMove = (index: number) => {
    edit && setHoverValue(index);
  };

  const handleMouseLeave = () => {
    edit && setHoverValue(undefined);
  };

  const handleClick = (index: number) => {
    edit && onChange && onChange(index + 1);
  };

  const getColor = (index: number) => {
    if (hoverValue !== undefined && index <= hoverValue) {
      return hoverColor;
    }

    return ratingInNumber > index ? activeColor : color;
  };

  const getIcon = (i: number) => {
    if (hoverValue !== undefined) {
      if (i <= hoverValue) {
        return fullIcon;
      }
    }

    if (isHalf && ratingInStar - i > 0 && ratingInStar - i < 1) {
      return halfIcon;
    } else if (i < ratingInStar) {
      return fullIcon;
    } else {
      return emptyIcon;
    }
  };

  return (
    <div style={{ fontSize: size }} className={`rating-stars ${className}`}>
      <ul
        className="rating-stars__wrapper"
        data-ratings-quantity={`Оценок: ${ratingsQuantity}`}
      >
        {Array(count)
          .fill(null)
          .map((_, i) => {
            return (
              <li
                className="rating-stars__star"
                key={i}
                onMouseMove={() => handleMouseMove(i)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(i)}
              >
                {cloneElement(getIcon(i), { size, color: getColor(i) })}
              </li>
            );
          })}
      </ul>
      {showDetails && (
        <>
          <div
            className="rating-stars__value"
            style={{ backgroundColor: activeColor }}
            data-background-color={activeColor}
          >
            {ratingInNumber ?? 0}
          </div>
        </>
      )}
    </div>
  );
};
