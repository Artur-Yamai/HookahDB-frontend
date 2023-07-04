import "./StartingSpinner.scss";

interface StartingSpinnerProps {
  loading: boolean;
}

export const StartingSpinner = ({ loading }: StartingSpinnerProps) => {
  return <div className={`spinner ${!loading ? "spinner--hidden" : ""}`} />;
};
