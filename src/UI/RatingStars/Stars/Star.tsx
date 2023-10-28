export interface StarProps {
  size?: number;
  color?: string;
  d?: string;
}

export const Star = ({ size = 24, color = "#000000", d }: StarProps) => {
  return (
    <svg style={{ color: color }} height={size} viewBox="0 0 24 24">
      <path d={d} fill="currentColor" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};
