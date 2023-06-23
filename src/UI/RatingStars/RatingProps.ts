export interface RatingProps {
  className?: string;
  count: number;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  size?: number;
  ratingsQuantity?: number | null;
  edit?: boolean;
  isHalf?: boolean;
  showDetails?: boolean;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  halfIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}
