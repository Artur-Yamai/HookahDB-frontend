import { useState, cloneElement } from "react";
import { RatingProps } from "./RatingProps";
import { EmptyStar, HalfStar, FullStar } from "./Stars";
import "./RatingStars.scss";

export function RatingStars({
  className,
  count,
  value,
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
}: RatingProps): JSX.Element {
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

    return value > index ? activeColor : color;
  };

  const getIcon = (i: number) => {
    if (hoverValue !== undefined) {
      if (i <= hoverValue) {
        return fullIcon;
      }
    }

    if (isHalf && value - i > 0 && value - i < 1) {
      return halfIcon;
    } else if (i < value) {
      return fullIcon;
    } else {
      return emptyIcon;
    }
  };

  return (
    <div className={`rating-stars ${className}`}>
      {Array(count)
        .fill(null)
        .map((_, i) => {
          return (
            <div
              key={i}
              style={{ cursor: "pointer" }}
              onMouseMove={() => handleMouseMove(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(i)}
            >
              {cloneElement(getIcon(i), { size, color: getColor(i) })}
            </div>
          );
        })}
      {showDetails && (
        <>
          <div
            className="rating-stars__value"
            style={{ fontSize: size * 0.9, backgroundColor: activeColor }}
            data-background-color={activeColor}
          >
            {value ?? 0}
          </div>
          {ratingsQuantity !== null && (
            <div
              className="rating-stars__count"
              style={{ fontSize: size * 0.75 }}
            >{`${ratingsQuantity}`}</div>
          )}
        </>
      )}
    </div>
  );
}
